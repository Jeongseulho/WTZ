import { baseUrl } from "../baseUrl";

export default {
  signUp: () => `${baseUrl}/users/join`,
  sendEmailVerificationCodeWhenSignup: () => `${baseUrl}/users/email/confirm`,
  sendEmailVerificationCodeWhenResetPw: () => `${baseUrl}/users/email`,
  login: () => `${baseUrl}/users/login`,
  logout: () => `${baseUrl}/users/logout`,
  resetPw: () => `${baseUrl}/users/reset-password`,
  changePw: () => `${baseUrl}/users/change-password`,
  delUser: () => `${baseUrl}/users/`,
  getMyInfo: () => `${baseUrl}/users/me`,
  getRefreshToken: () => `${baseUrl}/users/refresh-token`,
};
