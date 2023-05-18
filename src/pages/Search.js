import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  state = {
    name: '',
    loading: false,
    albums: [],
    savedName: '',
  };

  handleClickButton = async (event) => {
    event.preventDefault();
    // console.log('clicou');
    this.setState({ loading: true });
    const { name } = this.state;
    const albums = await searchAlbumsAPI(name);
    this.setState({
      albums: [...albums],
      loading: false,
      name: '',
      savedName: name,
      noAlbum: albums.length === 0,
    });
  };

  handleChange = (event) => {
    this.setState({ name: event.target.value });
  };

  handleAlbums = () => {
    const { albums, savedName } = this.state;

    return (
      <div>
        {albums.length > 0
        && (<h2>{`Resultado de álbuns de: ${savedName}`}</h2>
        )}
        {albums.map((album) => (
          <div key={ album.collectionId }>
            <img src={ album.artworkUrl100 } alt={ album.collectionName } />
            <p>{album.artistName}</p>
            <p>{album.collectionName}</p>
            <p>{album.releaseDate}</p>
            <Link
              to={ `/album/${album.collectionId}` }
              data-testid={ `link-to-album-${album.collectionId}` }
            >
              Ver álbum
            </Link>
          </div>
        ))}
      </div>
    );
  };

  render() {
    const { name, loading, noAlbum } = this.state;
    const disabledBtn = name.length < 2;

    return (
      <div data-testid="page-search">
        {loading ? (
          <Loading />
        ) : (
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
              onClick={ this.handleClickButton }
            >
              Pesquisar
            </button>
          </form>
        )}
        {noAlbum
        && <p>Nenhum álbum foi encontrado</p>}
        { this.handleAlbums()}
      </div>
    );
  }
}

export default Search;
