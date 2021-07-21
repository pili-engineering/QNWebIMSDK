import React, { useEffect, useReducer } from 'react';

interface StoreProps {

}

interface State {
  im: any;
}

interface Action {
  type: 'updateIM';
  payload: any;
}

interface StoreContext {
  state: State;
  dispatch: (action: Action) => void;
}

const defaultState = {
  im: null
};

export const storeContext = React.createContext({} as StoreContext);

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'updateIM':
      return {
        ...state,
        im: action.payload
      };
  }
  return state;
}

const Store: React.FC<StoreProps> = props => {

  const { children } = props;

  const [state, dispatch] = useReducer(reducer, defaultState);

  return <storeContext.Provider value={{ state, dispatch }}>
    {children}
  </storeContext.Provider>;
};

export default Store;