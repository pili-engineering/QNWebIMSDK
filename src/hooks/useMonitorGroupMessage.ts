import { useContext, useEffect, useState } from 'react';
import { storeContext } from '../store';

const useMonitorGroupMessage = (group_id?: number) => {
  const [messages, setMessages] = useState([]);
  const { state } = useContext(storeContext);
  const [updateMessagesCount, setUpdateMessagesCount] = useState(1);

  /**
   * 监听群消息
   */
  useEffect(() => {
    const im = state.im;

    /**
     * 处理监听到的消息变化的事件
     * @param message
     */
    function handleGroupMessage(message: any) {
      console.log('onGroupMessage', message);
      setUpdateMessagesCount(updateMessagesCount + 1);
    }

    if (im && group_id) {
      im.on('onGroupMessage', handleGroupMessage);
    }
    return () => {
      if (im && group_id) {
        im.off('onGroupMessage', handleGroupMessage);
      }
    };
  }, [state, group_id]);

  /**
   * 获取群消息
   */
  useEffect(() => {
    const im = state.im;
    if (im && group_id) {
      const messages = im.groupManage.getGruopMessage(group_id);
      console.log('getGruopMessage messages', messages);
      setMessages(messages);
    }
  }, [state.im, group_id, updateMessagesCount]);

  return {
    messages
  };
};

export default useMonitorGroupMessage;