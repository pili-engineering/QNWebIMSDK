import React from 'react';
import ReactDOM from 'react-dom';
import IRouter from './IRouter';
import Store from './store';
import './sdk/qnweb-im.umd';
import './commonCss/iconfont.scss'
import 'antd/dist/antd.css';

ReactDOM.render(
  <Store>
    <IRouter />
  </Store>,
  document.getElementById('root')
);
