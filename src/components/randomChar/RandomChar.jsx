import { Component } from "react";
import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";
import { MarvelService } from "../../services/MarvelService";
import { Spinner } from "../spinner/Spinner";

class RandomChar extends Component {
  constructor(props) {
    super(props);
    this.updateChar();
  }
  state = {
    //the state may then contain some other data, not only this: { name: null, description: null, thumbnail: null, homepage: null, wiki: null}.  That's why, I put all this data into a separate Object that will characterize the character
    char: {},
    loading: true,
  };

  marvelService = new MarvelService(); //in order to work with the JS class, we create an instance

  onCharLoaded = (char) => {
    this.setState({ char, loading: false }); // same as ({char : char})
  };

  updateChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    this.marvelService.getCharacter(id).then(this.onCharLoaded); //the argument that came from this .then() function will be written to char: onCharLoaded = (char) here
  };
  //Now after that, it is necessary to call the updateChar method, so I will call it in the constructor in a moment.

  render() {
    const { char, loading } = this.state; //since these states are already inside the 'char' object, we’ll just do this kind of destructuring

    return (
      <div className="randomchar">
        {loading ? <Spinner /> : <View char={char} />}
        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!
            <br />
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">Or choose another one</p>
          <button className="button button__main">
            <div className="inner">try it</div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div>
    );
  }
}

const View = ({ char }) => {
  const { thumbnail, description, name, homepage, wiki } = char;

  return (
    <div className="randomchar__block">
      <img src={thumbnail} alt="Random character" className="randomchar__img" />
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
