import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import {useMarvelService} from '../../services/MarvelService';
import {Spinner} from '../spinner/Spinner';
import {ErrorMessage} from '../errorMessage/ErrorMessage';
import {useEffect, useState} from 'react';

const RandomChar = () => {
  const [char, setChar] = useState({});

  const {loading, error, getCharacter} = useMarvelService();

  useEffect(() => {
    updateChar();
  }, []);

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const updateChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    getCharacter(id).then(onCharLoaded); //the argument that came from .then()  will be written to char: onCharLoaded = (char)
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? <View char={char} /> : null; //if there is no loading now or there is no error, then in this case we will return the View component

  return (
    <div className="randomchar">
      {errorMessage}
      {spinner}
      {content}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button className="button button__main">
          <div className="inner" onClick={updateChar}>
            try it
          </div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
};

const View = ({char}) => {
  const {thumbnail, description, name, homepage, wiki} = char;
  const checkThumbnail = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';

  return (
    <div className="randomchar__block">
      <img
        src={thumbnail}
        alt="Random character"
        className={checkThumbnail ? 'randomchar__errorImg' : 'randomchar__img'}
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
