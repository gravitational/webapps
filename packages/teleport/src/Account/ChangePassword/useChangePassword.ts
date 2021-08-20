import authService from 'teleport/services/auth';
import cfg from 'teleport/config';

export default function useChangePassword() {
  function changePassword(oldPass: string, newPass: string, otpToken: string) {
    return authService.changePassword(oldPass, newPass, otpToken);
  }

  function changePasswordWithU2f(oldPass: string, newPass: string) {
    return authService.changePasswordWithU2f(oldPass, newPass);
  }

  function changePasswordWithWebauthn(oldPass: string, newPass: string) {
    return authService.changePasswordWithWebauthn(oldPass, newPass);
  }
  return {
    changePassword,
    changePasswordWithU2f,
    changePasswordWithWebauthn,
    preferredMfaType: cfg.getPreferredMfaType(),
    auth2faType: cfg.getAuth2faType(),
  };
}

export type State = ReturnType<typeof useChangePassword>;
