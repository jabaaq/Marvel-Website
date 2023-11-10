import './charList.scss';
import {Spinner} from '../spinner/Spinner';
import {ErrorMessage} from '../errorMessage/ErrorMessage';
import {Component} from 'react/cjs/react.production.min';
import {MarvelService} from '../../services/MarvelService';

class CharList extends Component {
  state = {
    charList: [],
    error: false,
    loading: true,
    newItemLoading: false,
    offset: 210,
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.updateCharList();
  }

  onCharListLoading = () => {
    this.setState({newItemLoading: true});
  };

  onRequest = (offset) => {
    this.onCharListLoading();
    this.marvelService
      .getAllCharacters(offset)
      .then(this.onCharListLoaded)
      .catch(this.onError);
  };

  updateCharList = () => {
    this.marvelService
      .getAllCharacters()
      .then(this.onCharListLoaded)
      .catch(this.onError);
  };

  onCharListLoaded = (newCharList) => {
    this.setState(({offset, charList}) => ({
      //this is the charList that was in the current state at the beginning, it is an empty array, then nine elements and so on
      charList: [...charList, ...newCharList], //in this case charList is the old array and newCharlist is the new one
      loading: false,
      newItemLoading: false,
      offset: offset + 9,
    }));
  };

  onError = () => {
    this.setState({loading: false, error: true});
  };

  renderItems(arr) {
    const items = arr.map((item) => {
      const checkThumbnail =
        item.thumbnail ===
        'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
      let imgStyle = {objectFit: 'cover'};

      checkThumbnail
        ? (imgStyle = {objectFit: 'unset'})
        : (imgStyle = {objectFit: 'cover'});

      return (
        <li
          className="char__item"
          key={item.id}
          onClick={() => {
            this.props.onCharSelected(item.id); //This ID will be passed to the App component
          }}>
          <img src={item.thumbnail} alt={item.name} style={imgStyle} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });

    return <ul className="char__grid">{items}</ul>;
  }

  render() {
    const {charList, loading, error, offset, newItemLoading} = this.state;
    const eachItem = this.renderItems(charList);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? eachItem : null;

    return (
      <div className="char__list">
        <ul className="char__grid">
          {errorMessage}
          {spinner}
          {content}
        </ul>
        <button
          className="button button__main button__long"
          disabled={newItemLoading}
          onClick={() => this.onRequest(offset)}>
          <div className="inner">Load More</div>
        </button>
      </div>
    );
  }
}

export default CharList;
