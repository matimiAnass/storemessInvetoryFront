import FuseUtils from '@fuse/utils/FuseUtils';
import axios from 'axios';
import jwtServiceConfig from './jwtServiceConfig';
import moment from 'moment';

/* eslint-disable camelcase */

class JwtService extends FuseUtils.EventEmitter {
  init() {

    this.setInterceptors();
    this.handleAuthentication();
  }

  setInterceptors = () => {

    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        return new Promise(async (resolve, reject) => {

          if (err.response.status == 401) {
            try {
              await this.signInWithToken();

            } catch (e) {
              this.emit('onAutoLogout', 'access_token expired');
            }
          }
          if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
            // if you ever get an unauthorized response, logout the users
            // this.emit('onAutoLogout', 'Invalid access_token');
            // this.setSession(null);
            //await this.signInWithToken();
          }
          throw err;
        });
      }
    );
  };


  //TODO: must be active after the test
  handleAuthentication = () => {
    const access_token = this.getAccessToken()?.token;

    if (!access_token) {
      this.emit('onNoAccessToken');

      return;
    }
    //this.emit('onAutoLogin', true);
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

  signInWithEmailAndPassword = (email, password) => {
    return new Promise((resolve, reject) => {
      axios
        .post(jwtServiceConfig.signIn, {
            email,
            password,
        })
        .then((response) => {
          if (response.data.user) {
            this.setSession(response.data.access_token);
            this.setRefreshSession(response.data.refresh_token);
            this.setUserData(response.data.user);
            this.emit('onLogin', response.data.user);
          } else {
            reject(response.data.error);
          }
        });
    });
  };

  signInWithToken = () => {

    return new Promise((resolve, reject) => {
      axios
        .get(jwtServiceConfig.accessToken, {
          headers: {
            Authorization: `Bearer ${this.getRefreshToken().token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.user) {
            this.setSession(response.data.access_token);
            resolve(response.data.user);
          } else {
            // this.logout();
            reject(new Error('Failed to login with token.'));
          }
        })
        .catch((error) => {

          //  this.logout();
          reject(new Error('Failed to login with token.'));
        });
    });
  };

  updateUserData = (user) => {
    return axios.post(jwtServiceConfig.updateUser, {
      user,
    });
  };

  setSession = (access_token) => {

    if (access_token) {
      localStorage.setItem('jwt_access_token', JSON.stringify(access_token));
      axios.defaults.headers.common.Authorization = `Bearer ${access_token.token}`;
    } else {
      localStorage.removeItem('jwt_access_token');
      delete axios.defaults.headers.common.Authorization;

    }
  };

  setRefreshSession = (access_token) => {

    if (access_token) {
      localStorage.setItem('jwt_refresh_token', JSON.stringify(access_token));
      // axios.defaults.headers.common.Authorization = `Bearer ${access_token.token}`;
    } else {
      //console.log(access_token);
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

  getAccessToken = () => {
    return JSON.parse(window.localStorage.getItem('jwt_access_token'));
  };

  getRefreshToken = () => {
    return JSON.parse(window.localStorage.getItem('jwt_refresh_token'));
  };

  setUserData(user) {
    if (user) {
      localStorage.setItem('user_data', JSON.stringify(user));
    } else localStorage.removeItem('user_data');
  }
}

const instance = new JwtService();

export default instance;
