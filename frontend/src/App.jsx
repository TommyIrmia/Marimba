import React from 'react';
import { Route, Switch } from 'react-router';

import routes from './routes'


import { AppHeader } from './cmps/AppHeader';

export class App extends React.Component {



  render() {
    return (
      <div className="app">
        <AppHeader />
        <main className="main-app">
          {/* <NavBar /> */}
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


