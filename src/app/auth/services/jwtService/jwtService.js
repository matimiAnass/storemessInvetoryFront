import FuseUtils from '@fuse/utils/FuseUtils';
import axios from 'axios';
import moment from 'moment';
import jwtServiceConfig from './jwtServiceConfig';

/* eslint-disable camelcase */

class JwtService extends FuseUtils.EventEmitter {
  init() {
    this.setInterceptors();
    this.handleAuthentication();
    axios.defaults.withCredentials = true;
    axios.defaults.baseURL = 'https://dashboard.storemess.com';
  }

  setInterceptors = () => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        return new Promise((resolve, reject) => {
          // if (err.response?.status === 401) {
            try {
              this.signInWithToken().then(() => {
                return 0;
              });
            } catch (e) {
              this.emit('onAutoLogout', 'access_token expired');
            }
          // }
          // if (err.response?.status === 401 && err.config && !err.config.__isRetryRequest) {
            // if you ever get an unauthorized response, logout the users
            // this.emit('onAutoLogout', 'Invalid access_token');
            // this.setSession(null);
            // await this.signInWithToken();
          // }
          throw err;
        });
      }
    );
  };

  // TODO: must be active after the test
  handleAuthentication = () => {
    const access_token = this.getAccessToken()?.token;

    if (!access_token) {
      this.emit('onNoAccessToken');

      return;
    }
    // this.emit('onAutoLogin', true);
    if (this.isAuthTokenValid(this.getAccessToken())) {
      this.setSession(this.getAccessToken());
      this.emit('onAutoLogin', true);
    } else {
      // this.setSession(null);
      this.emit('onAutoLogout', 'access_token expired');
    }
  };

  createUser = (data) => {
    return new Promise((resolve, reject) => {
      axios.post(jwtServiceConfig.signUp, data).then((response) => {
        if (response.data.user) {
          resolve(response.data.user);
          this.emit('onLogin', response.data.user);
        } else {
          reject(response.data.error);
        }
      });
    });
  };

  // signInWithEmailAndPassword = (email, password) => {
  //   return new Promise((resolve, reject) => {
  //     axios
  //       .post(jwtServiceConfig.signIn, { email, password }, { withCredentials: true })
  //       .then((response) => {
  //         const data = response.data;
  //
  //         if (data.access_token?.redirect_url) {
  //           // store token if you need for API calls later
  //           localStorage.setItem('token', data.access_token.token);
  //
  //           // redirect to Laravel dashboard
  //           window.location.href = data.access_token.redirect_url;
  //           resolve(data.user);
  //         } else {
  //           reject(data.error);
  //         }
  //       })
  //       .catch((error) => reject(error.response?.data || error));
  //   });
  // };

  signInWithEmailAndPassword = async (email, password) => {
    try {
      // 1️⃣ Get CSRF cookie first — must be same domain as baseURL
      await axios.get("/sanctum/csrf-cookie");

      // 2️⃣ Then login
      const response = await axios.post("/login", { email, password });

      // 3️⃣ Redirect if success
      if (response.data?.redirect_url) {
        window.location.href = response.data?.redirect_url;
      } else {
        console.log("✅ Login success:", response.data);
        window.location.href = "https://dashboard.storemess.com/dashboard/admin"
      }
    } catch (error) {
      console.error("❌ Login failed:", error.response?.data || error);
    }
  };
  signInWithToken = () => {
    return 0;
    return new Promise((resolve, reject) => {
      axios
        .get(jwtServiceConfig.accessToken, {
          headers: {
            Authorization: `Bearer ${this.getAccessToken()?.token}`,
          },
        })
        .then((response) => {
          console.log(response.redirect_url);
          if (response.data.redirect_url) {
            window.location.href = response.data.redirect_url;
            resolve(response.data.user);
          } else {
            // this.logout();
            reject(new Error('Failed to login with token.'));
          }
        })
        // .catch((error) => {
        //   //  this.logout();
        //   reject(new Error(error.message));
        // });
    });
  };

  // eslint-disable-next-line class-methods-use-this
  updateUserData = (user) => {
    return axios.post(jwtServiceConfig.updateUser, {
      user,
    });
  };

  // eslint-disable-next-line class-methods-use-this
  setSession = (access_token) => {
    if (access_token) {
      localStorage.setItem('jwt_access_token', JSON.stringify(access_token));
      axios.defaults.headers.common.Authorization = `Bearer ${access_token.token}`;
    } else {
      localStorage.removeItem('jwt_access_token');
      delete axios.defaults.headers.common.Authorization;
    }
  };

  // eslint-disable-next-line class-methods-use-this
  setRefreshSession = (access_token) => {
    if (access_token) {
      localStorage.setItem('jwt_refresh_token', JSON.stringify(access_token));
      // axios.defaults.headers.common.Authorization = `Bearer ${access_token.token}`;
    } else {
      // console.log(access_token);
      localStorage.removeItem('jwt_refresh_token');
      // delete axios.defaults.headers.common.Authorization;
    }
  };

  logout = () => {
    this.setSession(null);
    this.setUserData(null);
    this.setRefreshSession(null);
    this.emit('onLogout', 'Logged out');
  };

  // eslint-disable-next-line class-methods-use-this
  isAuthTokenValid = (access_token) => {
    if (!access_token) {
      return false;
    }

    if (moment(access_token.expireAt) < moment()) {
      console.warn('access token expired');
      return false;
    }

    return true;
  };

  // eslint-disable-next-line class-methods-use-this
  getAccessToken = () => {
    return JSON.parse(window.localStorage.getItem('jwt_access_token'));
  };

  // eslint-disable-next-line class-methods-use-this
  getRefreshToken = () => {
    return JSON.parse(window.localStorage.getItem('jwt_refresh_token'));
  };

  // eslint-disable-next-line class-methods-use-this
  setUserData(user) {
    if (user) {
      localStorage.setItem('user_data', JSON.stringify(user));
    } else localStorage.removeItem('user_data');
  }
}

const instance = new JwtService();

export default instance;
