import { useContext, useEffect, useState } from 'react';
import { storeContext } from '../store';
import { RoomTokenJSON } from '../types';
import { post } from '../utils/request';

const useChatroom = (roomTokenJSON?: RoomTokenJSON | null) => {

  const { state } = useContext(storeContext);
  const [groupId, setGroupId] = useState();

  useEffect(() => {
    const im = state.im;
    if (roomTokenJSON && im) {
      post('/v1/mock/group', {
        group_id: roomTokenJSON.roomName
      }).then(response => {
        setGroupId(response.data.im_group_id);
        return response.data.im_group_id
      }).then(groupId => {
        im.chatroomManage.join(groupId)
      });
    }
    return () => {
      if (roomTokenJSON && im) {
        // im.chatroomManage.leave(6683356385697);
      }
    };
  }, [roomTokenJSON, state.im]);

  return {
    group_id: groupId
  };
};

export default useChatroom;