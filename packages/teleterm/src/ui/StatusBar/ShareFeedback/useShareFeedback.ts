import { useState } from 'react';
import { useAppContext } from 'teleterm/ui/appContextProvider';
import { makeEmptyAttempt, useAsync } from 'shared/hooks/useAsync';
import { ShareFeedbackFormValues } from './types';

export const FEEDBACK_TOO_LONG_ERROR = 'FEEDBACK_TOO_LONG_ERROR';

export function useShareFeedback() {
  const ctx = useAppContext();
  ctx.workspacesService.useState();
  ctx.clustersService.useState();

  const feedbackUrl = ctx.mainProcessClient.getRuntimeSettings().dev
    ? 'https://kcwm2is93l.execute-api.us-west-2.amazonaws.com/prod'
    : 'https://usage.teleport.dev';

  const [isShareFeedbackOpened, setIsShareFeedbackOpened] = useState(false);
  const [formValues, setFormValues] = useState<ShareFeedbackFormValues>({
    feedback: '',
    company: '',
    email: getEmailFromUserName() || '',
    newsletterEnabled: false,
    salesContactEnabled: false,
  });

  const [submitFeedbackAttempt, submitFeedback, setSubmitFeedbackAttempt] =
    useAsync(makeSubmitFeedbackRequest);

  async function makeSubmitFeedbackRequest(): Promise<Response> {
    preValidateForm();

    const formData = new FormData();
    formData.set('OS', ctx.mainProcessClient.getRuntimeSettings().platform);
    formData.set('email', formValues.email);
    formData.set('company', formValues.company);
    formData.set('use-case', formValues.feedback);
    formData.set('newsletter-opt-in', formValues.newsletterEnabled ? 'y' : 'n');
    formData.set('sales-opt-in', formValues.salesContactEnabled ? 'y' : 'n');

    const headers = new Headers();
    headers.set('content-type', 'multipart/form-data');

    const response = await fetch(feedbackUrl, {
      method: 'POST',
      body: formData,
      headers,
    });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(text);
    }
    return response;
  }

  function preValidateForm(): void {
    if (formValues.feedback.length > 200) {
      throw new Error(FEEDBACK_TOO_LONG_ERROR);
    }
  }

  function getEmailFromUserName(): string {
    const cluster = ctx.clustersService.findCluster(
      ctx.workspacesService.getRootClusterUri()
    );
    const userName = cluster?.loggedInUser?.name;
    if (/^\S+@\S+$/.test(userName)) {
      return userName;
    }
  }

  const hasBeenShareFeedbackOpened =
    ctx.statePersistenceService.getShareFeedbackState().hasBeenOpened;

  function openShareFeedback(): void {
    ctx.statePersistenceService.saveShareFeedbackState({ hasBeenOpened: true });
    setIsShareFeedbackOpened(true);
  }

  function closeShareFeedback(): void {
    setIsShareFeedbackOpened(false);
    clearSubmissionStatusIfSuccessful();
  }

  function clearSubmissionStatusIfSuccessful(): void {
    if (submitFeedbackAttempt.status === 'success') {
      setSubmitFeedbackAttempt(makeEmptyAttempt());
    }
  }

  return {
    formValues,
    submitFeedbackAttempt,
    isShareFeedbackOpened,
    hasBeenShareFeedbackOpened,
    setFormValues,
    submitFeedback,
    openShareFeedback,
    closeShareFeedback,
  };
}
