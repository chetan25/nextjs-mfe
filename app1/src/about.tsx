import React, { useEffect, useState } from 'react';
import { Segment, Grid, Header, Icon, } from 'semantic-ui-react';

// const TestComp = lazy(() => import('host/StateManager'));
// import  stateSubscriber from 'host/StateManager';

declare const window: any;
export interface UserState {
    name?: string;
    id?: string;
}

const  About = () => {
    const [user, setUser] = useState<UserState>();

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
                    <Icon name='child' />
                    Welcome {user?.name} to About
                </Header>
            </Grid.Column>
            </Grid>
        </Segment>
    );
}

export default About;