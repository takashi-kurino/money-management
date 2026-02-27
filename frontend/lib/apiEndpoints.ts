

// Function-style endpoint definitions.
// Returns path fragments relative to the API base used by the frontend axios client.

export const auth = {
  user: () => "auth/user/",
  login: () => "auth/login/",
  logout: () => "auth/logout/",
  refresh: () => "auth/token/refresh/",
  registration: () => "auth/registration/",
  registrationVerify: () => "auth/registration/verify-email/",
  registrationResend: () => "auth/registration/resend-email/",
  passwordReset: () => "auth/password/reset/",
  passwordResetConfirm: () => "auth/password/reset/confirm/",
  passwordChange: () => "auth/password/change/",
};

export const todos = {
  list: () => "todos/",
  detail: (id: string) => `todos/${id}/`,
};

export const user = {
  deleteAccount: () => "users/delete/",
};

export default { auth, todos, user };
