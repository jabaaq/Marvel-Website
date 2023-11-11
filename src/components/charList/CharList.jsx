import './charList.scss';
import {Spinner} from '../spinner/Spinner';
import {ErrorMessage} from '../errorMessage/ErrorMessage';
import {Component} from 'react/cjs/react.production.min';
import {MarvelService} from '../../services/MarvelService';
import PropTypes from 'prop-types';

class CharList extends Component {
  state = {
    charList: [],
    error: false,
    loading: true,
    newItemLoading: false,
    offset: 9, //Every time a request to the server is successfully completed, we must increase this number by 9 in our case
    charEnded: false,
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
    this.marvelService.getAllCharacters(offset).then(this.onCharListLoaded).catch(this.onError);
  };

  updateCharList = () => {
    this.marvelService.getAllCharacters().then(this.onCharListLoaded).catch(this.onError);
  };

  onCharListLoaded = (newCharList) => {
    let ended = false; //here I check charList for an empty array or for the fact that it contains less than 9 elements.
    if (newCharList.length < 9) {
      ended = true;
    }
    this.setState(({offset, charList}) => ({
      //this is the charList that was in the current state at the beginning, it is an empty array, then nine elements and so on
      charList: [...charList, ...newCharList], //in this case charList is the old array and newCharList is the new one
      loading: false,
      newItemLoading: false,
      offset: offset + 9,
      charEnded: ended, //calculate it and then put it in state
    }));
  };

  onError = () => {
    this.setState({loading: false, error: true});
  };

  renderItems(arr) {
    const items = arr.map((item) => {
      const checkThumbnail = item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
      let imgStyle = {objectFit: 'cover'};

      checkThumbnail ? (imgStyle = {objectFit: 'unset'}) : (imgStyle = {objectFit: 'cover'});

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
    const {charList, loading, error, offset, newItemLoading, charEnded} = this.state;
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
          style={{display: charEnded ? 'none' : 'block'}}
          onClick={() => this.onRequest(offset)}>
          <div className="inner">Load More</div>
        </button>
      </div>
    );
  }
}

CharList.propTypes = {
  onCharSelected: PropTypes.func,
};

export default CharList;
