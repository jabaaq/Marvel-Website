import {useState, useEffect, useRef} from 'react';
import './charList.scss';
import {Spinner} from '../spinner/Spinner';
import {ErrorMessage} from '../errorMessage/ErrorMessage';
import {useMarvelService} from '../../services/MarvelService';
import PropTypes from 'prop-types';

const CharList = (props) => {
  const [charList, setCharList] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffSet] = useState(210);
  const [charEnded, setCharEnded] = useState(false);

  const {loading, error, getAllCharacters} = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllCharacters(offset).then(onCharListLoaded);
  };

  const onCharListLoaded = (newCharList) => {
    let ended = false; //here I check charList for an empty array or for the fact that it contains less than 9 elements.
    if (newCharList && newCharList.length < 9) {
      ended = true;
    }

    setCharList((charList) => [...charList, ...newCharList]);
    setNewItemLoading((newItemLoading) => false);
    setOffSet((offset) => offset + 9);
    setCharEnded((charEnded) => ended);
  };

  console.log('Render!');

  const charsRefs = useRef([]);

  const selectedChar = (id) => {
    charsRefs.current.forEach((char) => char.classList.remove('char__item_selected'));
    charsRefs.current[id].classList.add('char__item_selected');
    charsRefs.current[id].focus();
  };

  function renderItems(arr) {
    const items = arr.map((item, i) => {
      const checkThumbnail = item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
      let imgStyle = {objectFit: 'cover'};

      checkThumbnail ? (imgStyle = {objectFit: 'unset'}) : (imgStyle = {objectFit: 'cover'});

      return (
        <li
          className="char__item"
          key={item.id}
          ref={(el) => (charsRefs.current[i] = el)}
          onClick={() => {
            props.onCharSelected(item.id); //This ID will be passed to the App component
            selectedChar(i);
          }}>
          <img src={item.thumbnail} alt={item.name} style={imgStyle} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });

    return <ul className="char__grid">{items}</ul>;
  }

  const eachItem = renderItems(charList);

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading && !newItemLoading ? <Spinner /> : null; //in simple words it sounds like I have a download, but at the same time this is NOT a download of new components
  return (
    <div className="char__list">
      <ul className="char__grid">
        {errorMessage}
        {spinner}
        {eachItem}
      </ul>
      <button
        className="button button__main button__long"
        disabled={newItemLoading}
        style={{display: charEnded ? 'none' : 'block'}}
        onClick={() => onRequest(offset)}>
        <div className="inner">Load More</div>
      </button>
    </div>
  );
};

CharList.propTypes = {
  onCharSelected: PropTypes.func,
};

export default CharList;
