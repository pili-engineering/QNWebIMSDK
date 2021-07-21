import * as QNIM from 'qnweb-im';
import { useContext, useEffect, useRef, useState } from 'react';
import { storeContext } from '../store';

/**
 * 初始化 IM
 */
const useInitIM = () => {
  const { state, dispatch } = useContext(storeContext);
  const IM = useRef<any>();
  const [isWatchIM, setIsWatchIM] = useState(false);
  const timer = useRef<NodeJS.Timer>();
  useEffect(() => {
    if (!state.im) {
      console.log('init');
      const initIM = QNIM.init({
        appid: 'dxdjbunzmxiu',
      });
      setIsWatchIM(true);
      IM.current = initIM;
    }
  }, [state.im, dispatch]);

  useEffect(() => {
    if (isWatchIM) {
      timer.current = setInterval(() => {
        const im = IM.current;
        if (im && im.isReady && im.isReady()) {
          dispatch({
            type: 'updateIM',
            payload: im
          });
        }
      }, 1000);
    }
    return () => {
      if (isWatchIM) {
        timer.current && clearInterval(timer.current);
      }
    };
  }, [isWatchIM]);
};

export default useInitIM;