import React from 'react';

class Search extends React.Component {
  state = {
    name: '',
  };

  handleChange = (event) => {
    this.setState({ name: event.target.value });
  };

  render() {
    const { name } = this.state;
    const disabledBtn = name.length < 2;
    return (
      <div data-testid="page-search">
        <form>
          <label>
            <input
              onChange={ this.handleChange }
              value={ name }
              type="text"
              data-testid="search-artist-input"
              placeholder="Digite aqui o nome da banda ou artista"
            />
          </label>
          <button
            data-testid="search-artist-button"
            disabled={ disabledBtn }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
