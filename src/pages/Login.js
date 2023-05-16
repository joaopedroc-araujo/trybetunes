import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  state = {
    name: '',
    loading: false,
  };

  handleChange = (event) => {
    this.setState({ name: event.target.value });
  };

  handleClickButton = async () => {
    const { name } = this.state;
    const { history } = this.props;
    this.setState({ loading: true });
    await createUser({ name });
    history.push('/search');
    this.setState({ loading: false });
  };

  render() {
    const minNumber = 3;
    const { name, loading } = this.state;
    return (
      <div data-testid="page-login">
        <form>
          <label>
            <input
              onChange={ this.handleChange }
              value={ name }
              type="text"
              data-testid="login-name-input"
              placeholder="Digite seu usuário"
            />
          </label>
          <button
            onClick={ this.handleClickButton }
            type="submit"
            data-testid="login-submit-button"
            disabled={ name.length < minNumber || loading }
          >
            Entrar
          </button>
        </form>
        <div>
          {loading ? <Loading /> : ''}
          {' '}
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
