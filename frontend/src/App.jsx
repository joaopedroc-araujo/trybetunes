import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Profile from './pages/Profile';
import Favorites from './pages/Favorites';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import Header from './Components/Header';

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
              render={ () => (
                <Login />
              ) }
            />
            <Route
              exact
              path="/search"
              render={ () => (
                <>
                  <Header />
                  <Search />
                </>
              ) }
            />
            <Route
              exact
              path="/album/:id"
              render={ () => (
                <>
                  <Header />
                  <Album />
                </>
              ) }
            />
            <Route
              exact
              path="/favorites"
              render={ () => (
                <>
                  <Header />
                  <Favorites />
                </>
              ) }
            />
            <Route
              exact
              path="/profile"
              render={ () => (
                <>
                  <Header />
                  <Profile />
                </>
              ) }
            />
            <Route
              exact
              path="/profile/edit"
              render={ () => (
                <>
                  <Header />
                  <ProfileEdit />
                </>
              ) }
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
