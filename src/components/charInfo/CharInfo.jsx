import {Component} from 'react/cjs/react.production.min';
import './charInfo.scss';
import {Spinner} from '../spinner/Spinner';
import {ErrorMessage} from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import {MarvelService} from '../../services/MarvelService';
import PropTypes from 'prop-types';

class CharInfo extends Component {
  state = {
    char: null,
    loading: false,
    error: false,
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.updateChar();
  }

  componentDidUpdate(prevProps) {
    if (this.props.charId !== prevProps.charId) {
      this.updateChar();
    }
  }

  updateChar = () => {
    const {charId} = this.props;

    if (!charId) {
      return;
    }

    this.onCharLoading(); //so that before the request we will show a spinner
    this.marvelService //and if there is already an ID, then I make a request to the server
      .getCharacter(charId)
      .then(this.onCharLoaded) //when a response arrives from the service in the format of one object with a character, it will be taken as a char argument and written to state
      .catch(this.onError);
  };

  onCharLoaded = (char) => {
    this.setState({char, loading: false});
  };

  onCharLoading = () => {
    this.setState({loading: true});
  };

  onError = () => {
    this.setState({loading: false, error: true});
  };

  render() {
    const {char, loading, error} = this.state;

    const skeleton = char || loading || error ? null : <Skeleton />; //If any of this exists, then we don’t render anything.
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null; //It says here that it is not loading, not an error, and there is already a character. so I wrote: !char

    return (
      <div className="char__info">
        {skeleton}
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  }
}

const View = ({char}) => {
  //for the convenience of working with this large component from the rendering method, it was divided into two different components, one of them will deal only with the interface, the other with logic and state
  const {name, description, thumbnail, homepage, wiki, comics} = char;
  let imgStyle = {objectFit: 'cover'};
  if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
    imgStyle = {objectFit: 'contain'};
  }

  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} style={imgStyle} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length > 0 ? null : 'There is no comics with this character ('}
        {comics.slice(0, 10).map((item, i) => {
          return (
            <li key={i} className="char__comics-item">
              {item.name}
            </li>
          );
        })}
      </ul>
    </>
  );
};

CharInfo.propTypes = {
  charId: PropTypes.number,
};

export default CharInfo;
