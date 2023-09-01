import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  state = {
    name: '',
    password: '',
    loading: false,
  };

  handleNameChange = (event) => {
    const { target } = event;
    this.setState({
      name: target.value,
    });
  };

  handlePasswordChange = (event) => {
    const { target } = event;
    this.setState({
      password: target.value,
    });
  };

  handleClickButton = async () => {
    const { history } = this.props;
    const { name, password } = this.state;
    this.setState({ loading: true });
    await createUser({ name, password });
    history.push('/search');
    this.setState({ loading: false });
  };

  render() {
    const minNumber = 5;
    const { name, loading, password } = this.state;
    return (
      <div data-testid="page-login">
        <form>
          <label>
            <input
              onChange={ this.handleNameChange }
              value={ name }
              type="text"
              data-testid="login-name-input"
              placeholder="Digite seu usuário"
            />
          </label>
          <label>
            <input
              onChange={ this.handlePasswordChange }
              type="password"
              data-testid="login-password-input"
              placeholder="Digite sua senha"
            />
          </label>
          <button
            onClick={ this.handleClickButton }
            type="submit"
            data-testid="login-submit-button"
            disabled={ (name.length && password.length) < minNumber || loading }
          >
            Entrar
          </button>
        </form>
        <div>
          {loading && <Loading /> }
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

export default withRouter(Login);
