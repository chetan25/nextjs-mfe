import React, { useEffect, useState } from 'react';
import { Segment, Grid, Header, Icon,Button } from 'semantic-ui-react';


declare const window: any;
export interface UserState {
    name?: string;
    id?: string;
}

const User = () => {
    const [user, setUser] = useState<UserState>();
    const [loading, setLoading] = useState(false);

    const updateUser = () => {
        setLoading(true);
        let newUser: UserState  = {
            id: 'host',
            name: 'Host'
        }
        if (user?.name === 'Host') {
            newUser = {
                id: 'teken',
                name: 'Teken'
            }
        }

        window.updateUser(newUser);
        setLoading(false);
    };

    useEffect(() => {
        // create a local variable to the subscription so that we can unsubscribe later
        const stateSubscription = window.userStateSubscriber.subscribe({
            next: (val: {name: string, id: string}) => setUser(val)
        });

        return () => stateSubscription.unsubscribe();
    }, []);

    return (
        <Segment placeholder>
            <Grid columns={1} stackable textAlign='center'>
            <Grid.Column>
                <Header icon>
                    <Icon name='user' />
                    Welcome User, {user?.name}
                    { user?.name ? <Button content={`Switch To ${user.name === 'Host' ? 'Teken' : 'Host'}`} primary onClick={updateUser} loading={loading}/> : null }
                </Header>
            </Grid.Column>
            </Grid>
        </Segment>
    );
}

export default User;