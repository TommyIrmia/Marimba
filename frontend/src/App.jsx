import React from 'react';
import { Route, Switch } from 'react-router';

import routes from './routes'


import { AppHeader } from './cmps/AppHeader';
import { NavBar } from './cmps/NavBar';

export class App extends React.Component {



  render() {
    return (
      <div className="app main-layout">
        <AppHeader />
        <NavBar />
        <main className="main-app">
          <Switch>
            {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)}
          </Switch>
          {/* <MediaPlayer /> */}
        </main>
        {/* <AppFooter /> */}
      </div>

    );

  }
}


