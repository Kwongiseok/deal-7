import AuthAPI from '../apis/authAPI.js';
import { getValueOnLocalStorage, removeValueOnLocalStorage } from './localStorageUtils.js';

const INITIAL_USER_STATUS = {
  isLoggedIn: false,
  message: 'EMPTY_TOKEN',
  accessToken: null,
};

const removeRefreshToken = () => removeValueOnLocalStorage('refreshToken');

/**
 * 유저가 가지고 있는 토큰을 확인합니다.
 * Error는 다음 세 가지입니다.
 * - EMPTY_TOKEN : 사용자의 localStorage에 토큰이 없을 경우
 * - RECEIVE_INVALID_TOKEN : 위변조된 토큰을 받았을 경우
 * - RECEIVE_EXPIRED_TOKEN : 만기된 토큰을 받았을 경우
 * 아래의 두 가지 에러일 경우, 가지고 있던 refresh token을 제거한다.
 * TODO: RECEIVE_INVALID_TOKEN 에러일 경우, 서버에 알람이 가게 변경한다.
 */
export const checkUserLoginStatus = new Promise((resolve, reject) => {
  const token = getValueOnLocalStorage('refreshToken');
  if (!token) return resolve({ ...INITIAL_USER_STATUS });

  try {
    AuthAPI.getAccessToken(token).then((res) => {
      if (res.status === 'success') {
        return resolve({ isLoggedIn: true, message: 'SUCCESS', res });
      }

      removeRefreshToken();
      return resolve({ ...INITIAL_USER_STATUS, message: res.message });
    });
  } catch (error) {
    reject(error);
  }
});
