import './comicsList.scss';
import {useState, useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';
import {useMarvelService} from '../../services/MarvelService';
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

  function renderItems(arr) {
    const items = arr.map((item, i) => {
      return (
        <li className="comics__item" key={i}>
          <Link to={`/comics/${item.id}`}>
            {/*Next you need to specify which comic will open*/}
            <img src={item.thumbnail} alt={item.title} className="comics__item-img" />
            <div className="comics__item-name">{item.title}</div>
            <div className="comics__item-price">{item.prices}</div>
          </Link>
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
