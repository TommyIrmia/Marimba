import React from 'react';
import { Route, Switch } from 'react-router';

import routes from './routes'

import { AppHeader } from './cmps/AppHeader';
import { NavBar } from './cmps/NavBar';
import { StationDetails } from './pages/StationDetails';
import { MediaPlayer } from './cmps/MediaPlayer';

export class App extends React.Component {



  render() {
    return (
      <div className="app main-layout">
        <AppHeader />
        <NavBar />
        <main className="main-app">
          <Switch>
            {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)}
            <Route path="/station/:stationId" component={StationDetails} />
          </Switch>
        </main>
        <MediaPlayer />
        {/* <AppFooter /> */}
      </div>

    );

  }
}


