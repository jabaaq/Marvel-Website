import './singleComicPage.scss';
import {Spinner} from '../spinner/Spinner';
import {ErrorMessage} from '../errorMessage/ErrorMessage';
import {useMarvelService} from '../../services/MarvelService';
import {useEffect, useState} from 'react';
import {AppBanner} from '../appBanner/AppBanner';

import {useParams, Link} from 'react-router-dom';

const SingleComicPage = () => {
  const comicId = useParams();
  const comicIdToNum = +Object.values(comicId).join('');
  const [comic, setComic] = useState(null); //there will be an object with all the data about this comic
  const {error, loading, getComics, clearError} = useMarvelService();

  useEffect(() => {
    updateComic();
  }, [comicIdToNum]); //Why exactly this logic? The fact is that when the user is on our this page, he can manually change the unique identifier in the URL. and in general, it will go to some other comic and so that we have this component redrawn correctly, we will actually use useEffect And build on this [comicId] parameter, which comes to us from the URL

  const updateComic = () => {
    clearError();
    getComics(comicIdToNum).then(onComicLoaded);
  };

  const onComicLoaded = (comic) => {
    setComic(comic);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !comic) ? <View comic={comic} /> : null;

  return (
    <>
      <AppBanner />
      {errorMessage}
      {spinner}
      {content}
    </>
  );
};

const View = ({comic}) => {
  //I do this so that in the same way, using the ternary operator, I can place here (into SingleComicPage return()) either a spinner or an error component or content that interests us
  const {title, description, pageCount, thumbnail, language, prices} = comic; //here I will need to pull out the data that will be in the comic and which will be used

  return (
    <div className="single-comic">
      <img src={thumbnail} alt={title} className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{title}</h2>
        <p className="single-comic__descr">{description}</p>
        <p className="single-comic__descr">{pageCount}</p>
        <p className="single-comic__descr">Language: {language}</p>
        <div className="single-comic__price">{prices}</div>
      </div>
      <Link to="/comics" className="single-comic__back">
        Back to all
      </Link>
    </div>
  );
};

export {SingleComicPage};
