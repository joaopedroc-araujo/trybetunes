import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends React.Component {
  state = {
    name: '',
    loading: true,
  };

  componentDidMount() {
    getUser()
      .then((user) => {
        this.setState({ name: user.name, loading: false });
      });
  }

  render() {
    const { name, loading } = this.state;
    return (
      <header data-testid="header-component">
        {loading ? (
          <p><Loading /></p>
        ) : (
          <p data-testid="header-user-name">{name}</p>
        )}
      </header>
    );
  }
}

export default Header;
