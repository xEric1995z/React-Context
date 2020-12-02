import React, { useState, useContext } from 'react';
import { store } from './Store';
import { sha256 } from 'js-sha256'
import axios from 'axios';

function App() {
  const globalState = useContext(store);
  const { state, dispatch } = globalState;
  const [login, setLogin] = useState({
    username: '',
    password: ''
  })

  const handleChange = (e) => {
    const {name, value} = e.target;
    setLogin(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const onClickLogin = async () => {
    const url = "http://192.168.1.182:5000/user/login";
    const response = await axios({
      method: 'post',
      url: url,
      data: {
        userh: sha256(login.username),
        password: sha256(login.password)
      }
    })
    localStorage.setItem('accessToken', response.data.access_token);
    dispatch({
      type: 'LOGIN',
      name: response.data.environment.name,
      accessToken: response.data.accessToken
    })
  }

  return (
    <div className="App">
      <input placeholder="username"
        name="username"
        onChange={handleChange} />
      <input placeholder="password"
        name="password"
        onChange={handleChange} />
      <button onClick={onClickLogin}>login</button>
      {
        state.user ? <p>{state.user}</p> : undefined
      }
    </div>
  );
}

export default App;

