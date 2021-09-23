import React from 'react';
import { Route, Switch } from 'react-router';

import routes from './routes'


import { Logo } from './cmps/Logo.jsx';

export class App extends React.Component {



  render() {
    return (
      <div className="App">
        <Logo />
        <Switch>
          {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)}
        </Switch>
      </div>

    );

  }
}


