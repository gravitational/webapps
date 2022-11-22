export default {
  // UserEvent types
  bannerClickEvent: 'tp.ui.banner.click',
  onboard: {
    addFirstResourceClickEvent: 'tp.ui.onboard.addFirstResource.click',
    addFirstResourceLaterClickEvent:
      'tp.ui.onboard.addFirstResourceLater.click',
  },

  // PreUserEvent types
  //   these events are unauthenticated,
  //   and require username in the request
  preUser: {
    onboard: {
      getStartedClickEvent: 'tp.ui.onboard.getStarted.click',
      setCredentialSubmitEvent: 'tp.ui.onboard.setCredential.submit',
      registerChallengeSubmitEvent: 'tp.ui.onboard.registerChallenge.submit',
      recoveryCodesContinueClickEvent:
        'tp.ui.onboard.recoveryCodesContinue.click',
    },
  },
};
