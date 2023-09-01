import React from 'react';
import { Link } from 'react-router-dom';
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
        <nav>
          <ul>
            <li>
              <Link
                to="/search"
                data-testid="link-to-search"
              >
                Pesquisa
              </Link>
            </li>
            <li>
              <Link
                to="/favorites"
                data-testid="link-to-favorites"
              >
                Músicas favoritas
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                data-testid="link-to-profile"
              >
                Perfil
              </Link>
            </li>
          </ul>
          {loading ? (
            <p><Loading /></p>
          ) : (
            <p data-testid="header-user-name">{name}</p>
          )}
        </nav>
      </header>
    );
  }
}

export default Header;
