import { Component } from "react/cjs/react.production.min";
import "./charInfo.scss";
import thor from "../../resources/img/thor.jpeg";
import { Spinner } from "../spinner/Spinner";
import { ErrorMessage } from "../errorMessage/ErrorMessage";
import { MarvelService } from "../../services/MarvelService";

class CharInfo extends Component {
  state = {
    char: {},
    loading: false,
    error: false,
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.updateChar();
  }

  updateChar = () => {
    const { charId } = this.props;

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
    this.setState({ char, loading: false });
  };

  onCharLoading = () => {
    this.setState({ loading: true });
  };

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  render() {
    const { char, loading, error } = this.state;
    return <div className="char__info"></div>;
  }
}

const View = ({ char }) => {
  //for the convenience of working with this large component from the rendering method, it was divided into two different components, one of them will deal only with the interface, the other with logic and state
  return (
    <>
      <div className="char__basics">
        <img src={thor} alt="abyss" />
        <div>
          <div className="char__info-name">thor</div>
          <div className="char__btns">
            <a href="#" className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href="#" className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">
        In Norse mythology, Loki is a god or jötunn (or both). Loki is the son
        of Fárbauti and Laufey, and the brother of Helblindi and Býleistr. By
        the jötunn Angrboða, Loki is the father of Hel, the wolf Fenrir, and the
        world serpent Jörmungandr. By Sigyn, Loki is the father of Nari and/or
        Narfi and with the stallion Svaðilfari as the father, Loki gave birth—in
        the form of a mare—to the eight-legged horse Sleipnir. In addition, Loki
        is referred to as the father of Váli in the Prose Edda.
      </div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        <li className="char__comics-item">
          All-Winners Squad: Band of Heroes (2011) #3
        </li>
        <li className="char__comics-item">Alpha Flight (1983) #50</li>
        <li className="char__comics-item">Amazing Spider-Man (1999) #503</li>
        <li className="char__comics-item">Amazing Spider-Man (1999) #504</li>
        <li className="char__comics-item">
          AMAZING SPIDER-MAN VOL. 7: BOOK OF EZEKIEL TPB (Trade Paperback)
        </li>
        <li className="char__comics-item">
          Amazing-Spider-Man: Worldwide Vol. 8 (Trade Paperback)
        </li>
        <li className="char__comics-item">
          Asgardians Of The Galaxy Vol. 2: War Of The Realms (Trade Paperback)
        </li>
        <li className="char__comics-item">Vengeance (2011) #4</li>
        <li className="char__comics-item">Avengers (1963) #1</li>
        <li className="char__comics-item">Avengers (1996) #1</li>
      </ul>
    </>
  );
};

export default CharInfo;
