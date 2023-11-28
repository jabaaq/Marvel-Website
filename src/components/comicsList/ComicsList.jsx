import './comicsList.scss';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';
import {useState, useEffect, useRef} from 'react';
import {useMarvelService} from '../../services/MarvelService';
import {ErrorMessage} from '../errorMessage/ErrorMessage';
import {Spinner} from '../spinner/Spinner';

const ComicsList = () => {
  const [comicsList, setComicsList] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffSet] = useState(210);
  const [comicsEnded, setComicsEnded] = useState(false);

  const {loading, error, getAllComics} = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllComics(offset).then(onComicsListLoaded);
  };

  const onComicsListLoaded = (newComicsList) => {
    let ended = false; //here I check charList for an empty array or for the fact that it contains less than 9 elements.
    if (newComicsList && newComicsList.length < 9) {
      ended = true;
    }

    setComicsList((comicsList) => [...comicsList, ...newComicsList]);
    setNewItemLoading((newItemLoading) => false);
    setOffSet((offset) => offset + 8);
    setComicsEnded((comicsEnded) => ended);
  };

  const comicsRefs = useRef([]);

  const selectedChar = (id) => {
    comicsRefs.current.forEach((comics) => comics.classList.remove('char__item_selected'));
    comicsRefs.current[id].classList.add('char__item_selected');
    comicsRefs.current[id].focus();
  };

  function renderItems(arr) {
    const items = arr.map((item, i) => {
      return (
        <li className="comics__item" key={item.id} ref={(el) => (comicsRefs.current[i] = el)}>
          <img src={item.thumbnail} alt={item.title} className="comics__item-img" />
          <div className="comics__item-name">{item.title}</div>
          <div className="comics__item-price">{item.prices}</div>
        </li>
      );
    });

    return <ul className="comics__grid">{items}</ul>;
  }

  const eachItem = renderItems(comicsList);
  const errorMessage = error ? <error /> : null;
  const spinner = loading ? <Spinner /> : null;

  return (
    <div className="comics__list">
      {eachItem}
      {errorMessage}
      {spinner}

      <button onClick={() => onRequest(offset)} className="button button__main button__long">
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
