import React from 'react';
import { Route, Switch } from 'react-router';
import routes from './routes'
import { MainHero } from './cmps/MainHero';
import { sessionService } from './services/session.service';
import { AppHeader } from './cmps/AppHeader';
import { NavBar } from './cmps/NavBar';
import { StationDetails } from './pages/StationDetails';
import { GenrePage } from './pages/GenrePage'
import { MediaPlayer } from './cmps/MediaPlayer';
import { UserMsg } from './cmps/UserMsg';
import { socketService } from './services/socket.service';

export class App extends React.Component {

  state = {
    initialEntry: sessionService.load('initial'),
  }

  componentDidMount() {
    socketService.setup()
  }

  componentWillUnmount() {
    socketService.terminate()
  }

  onInitialEntry = () => {
    window.scrollTo(0, 0);
    this.setState({ initialEntry: 'notInitial' })
  }

  render() {
    const { initialEntry } = this.state
    return (
      <div className="app main-layout" >
        {initialEntry && initialEntry !== `notInitial` && <MainHero onInitialEntry={this.onInitialEntry} />}
        <AppHeader />
        <NavBar />
        <main className="main-app">
          <Switch>
            {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)}
            <Route path="/genre/:id" component={GenrePage} />
            <Route path="/station/:stationId" component={(props) => <StationDetails {...props} key={window.location.pathname} />} />
          </Switch>
        </main>
        <MediaPlayer />
        <UserMsg />
      </div>
    );
  }
}


