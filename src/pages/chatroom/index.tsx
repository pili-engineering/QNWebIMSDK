import { Button, Input } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import useChatroom from '../../hooks/useChatroom';
import useMonitorGroupMessage from '../../hooks/useMonitorGroupMessage';
import { storeContext } from '../../store';
import { RoomTokenJSON } from '../../types';
import { parseRoomToken } from '../../utils/token';
import _ from 'lodash';
import css from './index.module.scss';

const Chatroom = () => {

  const { state } = useContext(storeContext);
  const [roomTokenJSON, setRoomTokenJSON] = useState<RoomTokenJSON | null>(null);
  const [text, setText] = useState('');
  const { group_id } = useChatroom(roomTokenJSON);
  const { messages } = useMonitorGroupMessage(group_id);
  const messageContainer = useRef<HTMLDivElement>(null);

  /**
   * 消息更新后自动滚动到底部
   */
  useEffect(() => {
    const scrollEle = messageContainer.current;
    if (scrollEle) {
      scrollEle.scrollTop = scrollEle.scrollHeight;
    }
  }, [messages]);

  /**
   * 解析 roomToken
   */
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const roomToken = query.get('roomToken');
    const roomTokenJSON = parseRoomToken(roomToken);
    setRoomTokenJSON(roomTokenJSON);
  }, []);

  /**
   * 点击发送消息
   */
  const onSendMessage = () => {
    const im = state.im;
    if (im && group_id) {
      const cuid = im.userManage.getUid() + '';
      const message = {
        content: JSON.stringify({
          content: {
            action: 'pubChatText',
            msgStr: {
              senderId: cuid,
              senderName: '',
              msgContent: text
            }
          }
        }),
        gid: group_id
      };
      im.sysManage.sendGroupMessage(message);
      setText('');
    }
  };

  /**
   * 防止 parse 失败
   * @param str
   */
  function safeParse(str: string) {
    let result;
    try {
      result = JSON.parse(str);
    } catch (e) {
      result = str;
    } finally {
      return result;
    }
  }

  return <div className={css.chatroom}>
    <div ref={messageContainer} className={css.messageArea}>
      {
        messages.map((message: any) => {
          const messageContent = _.get(message, 'content') || '{}';
          const contentObject = safeParse(messageContent);
          const senderId = _.get(contentObject, 'content.msgStr.senderId') || '';
          const msgContent = _.get(contentObject, 'content.msgStr.msgContent') || '';
          return <div className={css.messageCtx} key={message.id}>
            <div className={css.username}>用户_{senderId}：</div>
            <div className={css.userMessage}>{msgContent}</div>
          </div>;
        })
      }
    </div>
    <div className={css.inputArea}>
      <Input value={text} onChange={event => setText(event.target.value)} />
      <Button type='primary' onClick={onSendMessage}>发送</Button>
    </div>
  </div>;
};

export default Chatroom;