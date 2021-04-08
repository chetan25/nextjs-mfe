import React, { Suspense } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { InitialHostState, HostState, UserState } from '../store/reducer';
import styles from './home.module.css';
import { changeUser } from '../store/action';

const HomePage = () => {
  const dispatch = useDispatch();
  const host:HostState = useSelector(
    (state: InitialHostState) => state.host);
  
  const user:UserState = useSelector(
    (state: InitialHostState) => state.user);  

  const switchUser = () => {
    let newUser = {
      name: 'Teken',
      id: 'teken'
    };
    if (user.name !== 'Host') {
      newUser = {
        name: 'Host',
        id: 'host'
      };
    }
    dispatch(changeUser(newUser));
  };

  return (
    <Suspense  fallback="Loading Todo">
       <div className={styles.home}>
        <h1>Hello from {host.name} 👋</h1>
        <div>
          <p>You are logged in as default user <strong>{user.name}</strong>, which is set as default in Host App</p>
          <h4>You can switch to user {user.name === 'Host' ? 'Teken' : 'Host'}, in Host App</h4>
          <button onClick={switchUser}>Switch To {user.name === 'Host' ? 'Teken' : 'Host'}</button>
        </div>
       </div>
    </Suspense>
  );
};

export default HomePage