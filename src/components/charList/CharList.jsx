import "./charList.scss";
import { Spinner } from "../spinner/Spinner";
import { ErrorMessage } from "../errorMessage/ErrorMessage";
import { Component } from "react/cjs/react.production.min";
import { MarvelService } from "../../services/MarvelService";

class CharList extends Component {
  state = {
    charList: [],
    error: false,
    loading: true,
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.updateCharList();
  }

  updateCharList = () => {
    this.marvelService
      .getAllCharacters()
      .then(this.onCharListLoaded)
      .catch(this.onError);
  };

  onCharListLoaded = (charList) => {
    this.setState({ charList, loading: false });
  };

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  renderItems(arr) {
    const items = arr.map((item) => {
      const checkThumbnail =
        item.thumbnail ==
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";
      let imgStyle = { objectFit: "cover" };

      checkThumbnail
        ? (imgStyle = { objectFit: "unset" })
        : (imgStyle = { objectFit: "cover" });

      return (
        <li
          className="char__item"
          key={item.id}
          onClick={() => {
            this.props.onCharSelected(item.id); //This ID will be passed to the App component
          }}
        >
          <img src={item.thumbnail} alt={item.name} style={imgStyle} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });

    return <ul className="char__grid">{items}</ul>;
  }

  render() {
    const { charList, loading, error } = this.state;
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
        <button className="button button__main button__long">
          <div className="inner">Load More</div>
        </button>
      </div>
    );
  }
}

export default CharList;
