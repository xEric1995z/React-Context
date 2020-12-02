import React, { createContext, useReducer } from 'react';

const initialState = {
    accessToken: localStorage.getItem('accessToken'),
    user: ''
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'LOGIN':
               return {
                   ...state,
                   accessToken: action.accessToken,
                   user: action.name
               }
            default:
                throw new Error();
        };
    }, initialState);

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }