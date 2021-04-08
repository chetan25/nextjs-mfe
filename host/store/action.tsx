import { UserState } from './reducer';

export const CHANGE_USER = 'CHANGE_USER';

export const changeUser = (user: UserState) => {
    return {
        type: CHANGE_USER,
        payload: user
    }
}