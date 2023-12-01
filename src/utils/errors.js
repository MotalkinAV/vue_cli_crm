import router from "@/router/router";
import { toastPlugin } from "@/plugins/toast.plugin";

class AppError extends Error {
  constructor(error) {
    super(error);
    this.message = error.message;
    this.name = "AppError";
    this.code = error.code;
    this.resErrorCode = error.response
      ? error.response.data.error.code
      : error.resErrorCode
      ? error.resErrorCode
      : null;
    this.resErrorMessage = error.response
      ? error.response.data.error.message
      : error.resErrorMessage
      ? error.resErrorMessage
      : null;
    this.resStatus = error.response
      ? error.response.status
      : error.resStatus
      ? error.resStatus
      : null;
    this.resStatusMessage = error.response
      ? error.response.statusText
      : error.resStatusMessage
      ? error.resStatusMessage
      : null;
  }
}

const errorsMessages = {
  'INVALID_LOGIN_CREDENTIALS': 'incorrect_registration_data',
  'ERR_NETWORK': 'network_error',
  'TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.': 'multiple_entries',
  'EMAIL_EXISTS': 'email_exists',
}

function errors(error) {
  if (error.resStatusMessage === 'Unauthorized' && error.resStatus === 401) {
    router.push("/login?warning=session_time_ended");
  }
  if (error.resErrorMessage && error.resErrorCode === 400) {
    toastPlugin({error: errorsMessages[error.resErrorMessage]})
    console.log("ERRORS", errorsMessages[error.resErrorMessage])
  }
  console.dir(error);
}

export { AppError, errors };
