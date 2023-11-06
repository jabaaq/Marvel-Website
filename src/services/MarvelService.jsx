class MarvelService {
  //Component is not needed here because I am working with VanillaJS class.
  _apiBase = "https://gateway.marvel.com:443/v1/public/";
  _apiKey = "apikey=78c856cd3caac3f9ad37ca7a521c529b";

  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Couldn't fetch ${url}, status: ${res.status} `);
    }
    return await res.json();
  };

  getAllCharacters = () => {
    return this.getResource(
      `${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`
    );
  };

  getCharacter = (id) => {
    return this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
  };
}

export { MarvelService };
