import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from '../Components/MusicCard';

class Album extends React.Component {
  state = {
    name: '',
    albumName: '',
    requestedAlbum: [],
    loading: true,
  };

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    this.fetchAlbum(id);
  }

  async fetchAlbum(id) {
    const albumFetch = await getMusics(id);
    // console.log(getMusics('785232473'));
    const albumInfo = albumFetch[0];
    const { artistName, collectionName } = albumInfo;
    const albumMusics = albumFetch.slice(1);

    this.setState({
      name: artistName,
      albumName: collectionName,
      requestedAlbum: [...albumMusics],
      loading: false,
    });
  }

  render() {
    const { name, albumName, requestedAlbum, loading } = this.state;

    return (
      <div data-testid="page-album">
        {loading ? (<Loading />)
          : (
            <>
              <h2 data-testid="artist-name">{name}</h2>
              <h3 data-testid="album-name">{albumName}</h3>
              {requestedAlbum.map((music) => (
                <MusicCard key={ music.trackId } music={ music } />
              ))}
            </>
          ) }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default withRouter(Album);
