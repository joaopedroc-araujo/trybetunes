import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Profile from './pages/Profile';
import Favorites from './pages/Favorites';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <>
        <p>TrybeTunes</p>
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              component={ Login }
            />
            <Route
              exact
              path="/search"
              component={ Search }
            />
            <Route
              exact
              path="/album/:id"
              component={ Album }
            />
            <Route
              exact
              path="/favorites"
              component={ Favorites }
            />
            <Route
              exact
              path="/profile"
              component={ Profile }
            />
            <Route
              exact
              path="/profile/edit"
              component={ ProfileEdit }
            />
            <Route
              exact
              path="*"
              component={ NotFound }
            />
          </Switch>
        </Router>

      </>
    );
  }
}

export default App;