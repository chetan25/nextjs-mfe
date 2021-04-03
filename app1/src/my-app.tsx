import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import ErrorBoundary from './error-boundary';
import 'semantic-ui-css/semantic.min.css';
import Navigation from './navigation';
import { Segment, Grid, Header, Icon, } from 'semantic-ui-react';

const MyApp = () => {
    return (
        <ErrorBoundary>
            <Router basename='/about'>
               <Navigation />
                {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
                <Switch>
                    {/* <Route
                        exact
                        path="/"
                        render={(location) => {
                            console.log(location, 'home')
                            // Do whatever you want with the match...
                            return  <About />;
                        }}
                    /> */}
                    <Route exact path="/">
                        <About />
                    </Route>
                    <Route exact path="/user">
                        <Users />
                    </Route>
                    <Route exact path="/admin">
                        <Admin />
                    </Route>
                </Switch>
            </Router>
        </ErrorBoundary>
    )
}


function Admin() {
    return (
        <Segment placeholder>
            <Grid columns={1} stackable textAlign='center'>
              <Grid.Column>
                <Header icon>
                    <Icon name='user plus' />
                    Welcome Admin
                </Header>
              </Grid.Column>
            </Grid>
        </Segment>
    );
}
  
function About() {
    return (
        <Segment placeholder>
            <Grid columns={1} stackable textAlign='center'>
            <Grid.Column>
                <Header icon>
                    <Icon name='child' />
                    Welcome About
                </Header>
            </Grid.Column>
            </Grid>
        </Segment>
    );
}

function Users() {
    return (
        <Segment placeholder>
            <Grid columns={1} stackable textAlign='center'>
            <Grid.Column>
                <Header icon>
                    <Icon name='user' />
                    Welcome User
                </Header>
            </Grid.Column>
            </Grid>
        </Segment>
    );
}

export default MyApp;