import React, { useContext, useState } from 'react';
import { Button, Input, message, Modal } from 'antd';
import useMonitorLogin from '../../hooks/useMonitorLogin';
import { storeContext } from '../../store';
import * as QNIM from 'qnweb-im';
import { LoginInfo } from '../../types';
import css from './index.module.scss';

const Login: React.FC<{}> = props => {

  const { state } = useContext(storeContext);
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    username: '',
    password: ''
  });
  const [status, setStatus] = useState(0); // 0-登录、1-注册
  useMonitorLogin();

  /**
   * 点击登录按钮
   */
  const onSubmitBtn = () => {
    const { im } = state;
    const { username, password } = loginInfo;
    if (status === 0) { // 登录
      im.login({
        name: username,
        password
      });
    }
    if (status === 1) { // 注册
      im.rosterManage.asyncRegester({
        username,
        password
      }).then((response: any) => {
        if (response.code == 200) {
          message.success('注册成功');
        }
      }).catch((error: any) => {
        Modal.error({
          title: '提示',
          content: JSON.stringify(error)
        });
      });
    }
  };

  /**
   * 修改 input 值
   * @param type
   * @param value
   */
  const onChangeInputValue = (type: keyof LoginInfo, value: string) => {
    setLoginInfo({
      ...loginInfo,
      [type]: value
    });
  };

  /**
   * 登录/注册切换
   */
  const onToggleStatus = () => {
    const nextStatus = status === 0 ? 1 : 0;
    if (status === 0) { // 只有切换到注册面板的时候需要清空
      setLoginInfo({
        username: '',
        password: ''
      });
    }
    setStatus(nextStatus);
  };

  return <div className={css.login}>
    <div className={css.card}>
      <h1>七牛 IM demo 体验</h1>
      <Input
        onChange={event => onChangeInputValue('username', event.target.value)}
        value={loginInfo.username}
        placeholder='用户名'
        style={{ marginBottom: 10 }}
      />
      <Input
        onChange={event => onChangeInputValue('password', event.target.value)}
        value={loginInfo.password}
        placeholder='密码'
        style={{ marginBottom: 10 }}
      />
      <Button
        type='primary'
        block
        style={{ marginBottom: 10 }}
        onClick={onSubmitBtn}
      >{status === 0 ? '登录' : '注册'}</Button>
      <div style={{ textAlign: 'center' }}>
        <Button type='link' onClick={onToggleStatus}>{status === 0 ? '点击去注册' : '已有账号，去登录'}</Button>
      </div>
      <div className={css.version}>Demo version: 1.0.0-beta</div>
      <div className={css.version}>SDK version: {QNIM.version}</div>
    </div>
  </div>;
};

export default Login;