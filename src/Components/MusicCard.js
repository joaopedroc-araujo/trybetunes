import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  state = {
    loading: false,
    favorited: false,
  };

  async componentDidMount() {
    const favoritedSongs = await getFavoriteSongs();
    const { music } = this.props;
    const favoritedSong = favoritedSongs
      .filter((favorite) => favorite.trackId === music.trackId).length > 0;
    this.setState({ favorited: favoritedSong });
  }

  handleCheckboxClick = async () => {
    const { music } = this.props;
    const { favorited } = this.state;
    this.setState({ loading: true });
    if (favorited) {
      await removeSong(music);
      this.setState({ favorited: false });
    } else {
      await addSong(music);
      this.setState({ favorited: true });
    }

    this.setState({ loading: false });
  };

  render() {
    const { music } = this.props;
    const { trackName, previewUrl, trackId } = music;
    const { loading, favorited } = this.state;
    return (
      <div>
        <h4>{trackName}</h4>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label>
          Favorite:
          <input
            onChange={ this.handleCheckboxClick }
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            disabled={ loading }
            checked={ favorited }
          />
        </label>
        {loading && <Loading />}
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.string.isRequired,
  }).isRequired,
};

export default MusicCard;
