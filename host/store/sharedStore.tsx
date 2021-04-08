import { useStore } from 'react-redux';
import { BehaviorSubject } from 'rxjs';
import { UserState } from './reducer';
import { CHANGE_USER } from './action';

const initialUser: any = {
    id: 'host',
    name: 'Host'
};

export const userStateSubscriber = new BehaviorSubject(initialUser);



export const updateUser = (user: UserState) => {
    const store = useStore();
    
    return store.dispatch({
        type: CHANGE_USER,
        payload: user
    });
}

declare const window: any;

if (typeof window !== 'undefined') {
 
    window!.userStateSubscriber = userStateSubscriber;
    window!.updateUser = updateUser;
}
