class MarvelService {
  //Component is not needed here because I am working with VanillaJS class.
  _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  _apiKey = 'apikey=78c856cd3caac3f9ad37ca7a521c529b';
  _baseOffset = 210;

  getResource = async (url) => {
    let res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Couldn't fetch ${url}, status: ${res.status} `);
    }
    return await res.json();
  };

  getAllCharacters = async (offset = this._baseOffset) => {
    //this will allow the function to be more flexible because now it will start from the argument. And if we don’t pass this argument there, then the base offset will be used: _baseOffset = 210;

    const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);

    return res.data.results.map(this._transformCharacter);
    // return this.getResource(
    //   `${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`
    // );
  };

  getCharacter = async (id) => {
    const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`); //this is an asynchronous function. We have absolutely no idea how long the server will respond to us. in order for this variable to be formed we must take into account asynchronous
    return this._transformCharacter(res.data.results[0]); //That's it, now when the method is launched it will wait for a response and the result will be written to the 'res' variable
  };

  _transformCharacter = (char) => {
    //Now the 'char' is res.data.results[0]
    return {
      id: char.id,
      name: char.name,
      description: char.description.length !== 0 ? char.description.slice(0, 120) + '...' : 'Description not found',
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension, //This is how we create a single path to our image
      homepage: char.urls[0].url, //here I get the first object and it has URL properties
      wiki: char.urls[1].url,
      comics: char.comics.items,
    };
  };
}

export {MarvelService};
