const jwtServiceConfig = {
  signIn: 'http://192.168.1.17:8000/api/auth/login',
  signUp: 'api/auth/sign-up',
  accessToken: 'api/auth/access-token',
  // accessToken: 'http://192.168.1.17:8000/api/auth/get-token',
  updateUser: 'api/auth/users/update',
};

export default jwtServiceConfig;
