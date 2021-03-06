import {createStore, AnyAction, applyMiddleware} from 'redux';
import {MakeStore, createWrapper, Context, HYDRATE} from 'next-redux-wrapper';
import thunkMiddleware from 'redux-thunk';
import { CHANGE_USER } from './action';
import { BehaviorSubject } from 'rxjs';

export interface UserState {
    name?: string;
    id?: string;
}

export interface HostState {
   id: string;
   name: string;
}

export interface InitialHostState {
   user: UserState,
   host: HostState
}

export const initialUser: UserState = {
   id: 'host',
   name: 'Host'
};
const initialHostState: HostState = {
    id: 'host',
    name: 'Host App'
};

const initialState: InitialHostState = {
   user: initialUser,
   host: initialHostState
}

const bindMiddleware = (middleware: any[]) => {
   if (process.env.NODE_ENV !== 'production') {
     const { composeWithDevTools } = require('redux-devtools-extension')
     return composeWithDevTools(applyMiddleware(...middleware))
   }
   return applyMiddleware(...middleware)
 }


const userStateSubscriber = new BehaviorSubject(initialUser);

/**
 * 
 * Each time when pages that have getStaticProps or getServerSideProps are opened by user the HYDRATE action
 * will be dispatched
 */
export const hostReducer = (state = initialState, action: AnyAction) => {
   console.log(action, 'action');
   switch(action.type) {
       case HYDRATE:
         const nextState: InitialHostState = {
            ...state, // use previous state
            ...action.payload, // apply delta from hydration
          }
          // preserve any state value on client side navigation
         return nextState;
       case CHANGE_USER:
         console.log('fired');
         // once state is updated we need to update all subscribers
         userStateSubscriber.next(action.payload);
           return {
              ...state,
              user: action.payload
           };
        default:
            return state;   
   }
}


const store =  createStore(hostReducer, bindMiddleware([thunkMiddleware]));
// create a makeStore function
export const makeStore: MakeStore<InitialHostState> = (context: Context) => store;

// export an assembled wrapper
export const wrapper = createWrapper<InitialHostState>(makeStore, {debug: true});

export const updateUser = (user: UserState) => {
   console.log(user, 'passed-user');
   return store.dispatch({
       type: CHANGE_USER,
       payload: user
   });
}

declare const window: any;

if (typeof window !== 'undefined') {
    window!.updateUser = updateUser;
    window!.userStateSubscriber = userStateSubscriber;
}
