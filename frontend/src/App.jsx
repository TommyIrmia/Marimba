import React from 'react';
import { Route, Switch } from 'react-router';

import routes from './routes'

import { AppHeader } from './cmps/AppHeader';
import { NavBar } from './cmps/NavBar';
import { StationDetails } from './pages/StationDetails';
import {GenrePage} from './pages/GenrePage'
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
            <Route path="/genre/:id"  component={GenrePage}/>
            <Route path="/station/:stationId" component={(props) => <StationDetails {...props} key={window.location.pathname}/>} />
          </Switch>
        </main>
        <MediaPlayer />
      </div>

    );

  }
}


