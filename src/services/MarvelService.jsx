import {useHttp} from '../hooks/http.hook';

const useMarvelService = () => {
  const {loading, request, error, clearError} = useHttp(); //destructuring syntax

  //Component is not needed here because I am working with VanillaJS class.
  const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  const _apiKey = 'apikey=78c856cd3caac3f9ad37ca7a521c529b';
  const _baseOffset = 210;

  const getAllCharacters = async (offset = _baseOffset) => {
    //this will allow the function to be more flexible because now it will start from the argument. And if we don’t pass this argument there, then the base offset will be used: _baseOffset = 210;
    try {
      const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
      if (!res || !res.data || !res.data.results) {
        throw new Error('Invalid response structure');
      }
      return res.data.results.map(_transformCharacter);
    } catch (error) {
      console.error('Error in getAllCharacters:', error);
      return null;
    }
  };

  const getCharacter = async (id) => {
    try {
      const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
      if (!res || !res.data || !res.data.results) {
        throw new Error('Invalid response structure');
      }
      return _transformCharacter(res.data.results[0]);
    } catch (error) {
      console.error('Error in getAllCharacters:', error);
      return [];
    }

    //That's it, now when the method is launched it will wait for a response and the result will be written to the 'res' variable
  };

  const _transformCharacter = (char) => {
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

  /*since this function (made a custom hook from the class component) we can return something from it since this is such a custom hook also in order to use the service. */

  return {
    loading,
    error,
    clearError,
    getAllCharacters,
    getCharacter,
  };
};

export {useMarvelService};
