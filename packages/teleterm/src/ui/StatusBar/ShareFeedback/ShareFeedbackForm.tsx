import React from 'react';
import { ButtonIcon, ButtonPrimary, Flex, Link, Text } from 'design';
import Validation from 'shared/components/Validation';
import { Close } from 'design/Icon';
import { ShareFeedbackFormFields } from './ShareFeedbackFormFields';
import { Attempt } from 'shared/hooks/useAsync';
import * as Alerts from 'design/Alert';
import { FEEDBACK_TOO_LONG_ERROR } from './useShareFeedback';
import { ShareFeedbackFormValues } from './types';

interface ShareFeedbackProps {
  submitFeedbackAttempt: Attempt<string>;
  formValues: ShareFeedbackFormValues;

  onClose(): void;

  setFormValues(values: ShareFeedbackFormValues): void;

  submitFeedback(): Promise<[string, Error]>;
}

export function ShareFeedbackForm(props: ShareFeedbackProps) {
  const isSubmitInProgress =
    props.submitFeedbackAttempt.status === 'processing';

  return (
    <Flex bg="primary.main" p={3} borderRadius={3} maxWidth="370px">
      <Validation>
        {({ validator }) => (
          <Flex
            flexDirection="column"
            as="form"
            onSubmit={e => {
              e.preventDefault();
              if (validator.validate()) {
                props.submitFeedback();
              }
            }}
          >
            <Flex justifyContent="space-between" mb={2}>
              <Text typography="h4" bold color="text.primary">
                Provide your feedback
              </Text>
              <ButtonIcon
                type="button"
                onClick={props.onClose}
                title="Close"
                color="text.secondary"
              >
                <Close fontSize={5} />
              </ButtonIcon>
            </Flex>
            <Link
              href="https://github.com/gravitational/teleport/issues/new?assignees=&labels=bug&template=bug_report.md"
              target="_blank"
            >
              Submit a Bug
            </Link>
            <Link href="https://goteleport.com/signup/" target="_blank">
              Try Teleport Cloud
            </Link>
            {props.submitFeedbackAttempt.status === 'error' && (
              <SubmissionError
                submitFeedbackAttempt={props.submitFeedbackAttempt}
              />
            )}
            {props.submitFeedbackAttempt.status === 'success' ? (
              <Alerts.Success mt={3} mb={0}>
                {props.submitFeedbackAttempt.data}
              </Alerts.Success>
            ) : (
              <>
                <ShareFeedbackFormFields
                  disabled={isSubmitInProgress}
                  formValues={props.formValues}
                  setFormValues={props.setFormValues}
                />
                <ButtonPrimary
                  disabled={isSubmitInProgress}
                  block
                  type="submit"
                  mt={4}
                >
                  Submit
                </ButtonPrimary>
              </>
            )}
          </Flex>
        )}
      </Validation>
    </Flex>
  );
}

function SubmissionError(props: { submitFeedbackAttempt: Attempt<string> }) {
  function getErrorText() {
    if (props.submitFeedbackAttempt.statusText === FEEDBACK_TOO_LONG_ERROR) {
      return (
        <span>
          That's a very long suggestion. Please let us know more in{' '}
          <Link
            href="https://github.com/gravitational/teleport/discussions"
            target="_blank"
          >
            our community
          </Link>
          .
        </span>
      );
    }

    return (
      <span>
        Unable to submit your feedback: {props.submitFeedbackAttempt.statusText}
      </span>
    );
  }

  return (
    <Alerts.Danger mt={3} mb={0}>
      {getErrorText()}
    </Alerts.Danger>
  );
}
