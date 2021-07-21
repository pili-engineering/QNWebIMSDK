import { Button, Input, Modal } from 'antd';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import css from './index.module.scss';

const Home = () => {
  const [roomToken, setRoomToken] = useState<string>();
  const history = useHistory();
  const [roomTokens] = useState([
    'QxZugR8TAhI38AiJ_cptTl3RbzLyca3t-AAiH-Hh:bPnzujqVtlZwIvHEHMTwapyk2b0=:eyJhcHBJZCI6ImZsZXFmcTZ5YyIsImV4cGlyZUF0IjoxNzIwODU0MTMzLCJwZXJtaXNzaW9uIjoidXNlciIsInJvb21OYW1lIjoianNlcjEiLCJ1c2VySWQiOiJqdXNlcjEifQ==',
    'QxZugR8TAhI38AiJ_cptTl3RbzLyca3t-AAiH-Hh:Ujga8UkLkmizpwTEq0bc95tMYIA=:eyJhcHBJZCI6ImZsZXFmcTZ5YyIsImV4cGlyZUF0IjoxNzIwODU0MTMzLCJwZXJtaXNzaW9uIjoidXNlciIsInJvb21OYW1lIjoianNlcjIiLCJ1c2VySWQiOiJqdXNlcjIifQ==',
    'QxZugR8TAhI38AiJ_cptTl3RbzLyca3t-AAiH-Hh:MDxnzjjeBwpj92nCtsjfMXVRwtk=:eyJhcHBJZCI6ImZsZXFmcTZ5YyIsImV4cGlyZUF0IjoxNzIwODU0MTMzLCJwZXJtaXNzaW9uIjoidXNlciIsInJvb21OYW1lIjoianNlcjMiLCJ1c2VySWQiOiJqdXNlcjMifQ=='
  ]);
  /**
   * 随机生成 roomToken
   */
  const onGenerateRoomToken = () => {
    const index = Math.floor(Math.random() * 3);
    const roomToken = roomTokens[index];
    setRoomToken(roomToken);
  };

  /**
   * 点击进入房间
   */
  const onJoinRoomBtn = () => {
    if (!roomToken) {
      return Modal.warning({
        title: '提示',
        content: '请输入roomToken'
      });
    }
    history.push(`/chatroom?roomToken=${roomToken}`);
  };
  return <div className={css.home}>
    <div className={css.card}>
      <Input
        value={roomToken}
        onChange={event => setRoomToken(event.target.value)}
        placeholder='请输入roomToken'
        style={{ marginBottom: 10 }}
      />
      <Button
        type='primary'
        block
        style={{ marginBottom: 10 }}
        onClick={onJoinRoomBtn}
      >点击进入房间</Button>
      <Button
        type='primary'
        block
        onClick={onGenerateRoomToken}
      >点击随机生成roomToken</Button>
    </div>
  </div>;
};

export default Home;