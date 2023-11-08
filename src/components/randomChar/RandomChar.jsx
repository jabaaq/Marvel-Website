import { Component } from "react";
import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";
import { MarvelService } from "../../services/MarvelService";
import { Spinner } from "../spinner/Spinner";
import { ErrorMessage } from "../errorMessage/ErrorMessage";

class RandomChar extends Component {
  constructor(props) {
    super(props);
    this.updateChar();
  }

  state = {
    //the state may then contain some other data, not only this: { name: null, description: null, thumbnail: null, homepage: null, wiki: null}.  That's why, I put all this data into a separate Object that will characterize the character
    char: {},
    loading: true,
    error: false,
  };

  marvelService = new MarvelService(); //in order to work with the JS class, we create an instance

  componentDidMount() {
    this.updateChar();
    // this.timerId = setInterval(this.updateChar, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  onCharLoaded = (char) => {
    this.setState({ char, loading: false }); // same as ({char : char})
  };

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  updateChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    this.marvelService
      .getCharacter(id)
      .then(this.onCharLoaded) //the argument that came from .then()  will be written to char: onCharLoaded = (char)
      .catch(this.onError);
  };
  //Now after that, it is necessary to call the updateChar method, so I will call it in the constructor in a moment.

  render() {
    const { char, loading, error } = this.state; //since these states are already inside the 'char' object, we’ll just do this kind of destructuring
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
            <div className="inner" onClick={this.updateChar}>
              try it
            </div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div>
    );
  }
}

const View = ({ char }) => {
  const { thumbnail, description, name, homepage, wiki } = char;
  const checkThumbnail =
    thumbnail ==
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";

  return (
    <div className="randomchar__block">
      <img
        src={thumbnail}
        alt="Random character"
        className={checkThumbnail ? "randomchar__errorImg" : "randomchar__img"}
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
