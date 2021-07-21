import { Modal } from 'antd';
import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { storeContext } from '../store';

/**
 * 监听登录状态
 */
const useMonitorLogin = () => {
  const history = useHistory();
  const { state } = useContext(storeContext);

  useEffect(() => {
    if (!state.im) return;
    state.im.on({
      /**
       * 登录成功
       * @param response
       */
      loginSuccess(response: any) {
        console.log('loginSuccess response', response);
        history.push('/home');
      },
      /**
       * 登录失败
       * @param error
       */
      loginFail(error: any) {
        Modal.error({
          title: 'loginFail',
          content: JSON.stringify(error)
        });
      },
      /**
       * 可监听登录信息或进度：
       * @param message
       */
      loginMessage(message: any) {
        console.log('loginMessage', message);
      }
    });
  }, [state.im]);
};

export default useMonitorLogin;