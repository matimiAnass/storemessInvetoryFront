const jwtServiceConfig = {
  signIn: `${process.env.REACT_APP_BACKEND_URL_API}/login`,
  signUp: 'api/auth/sign-up',
  accessToken: `${process.env.REACT_APP_BACKEND_URL_API}auth/get-token`,
  // accessToken: 'api/auth/access-token',
  updateUser: 'api/auth/users/update',
};

export default jwtServiceConfig;
