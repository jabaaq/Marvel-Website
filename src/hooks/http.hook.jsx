import {useState, useCallback} from 'react';

const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {
      setLoading(true);

      /*need to think about how to throw an error because this method will only send the request to the server but will not process it using .then / .Catch or dot .finally */

      try {
        const response = await fetch(url, {method, body, headers}); //sent a request and the answer will be placed in response

        if (!response.ok) {
          throw new Error(`Couldn't fetch ${url}, status: ${response.status} `);
        }

        const data = await response.json(); //since the answer is just a promise, then I get specific data response.json();
        setLoading(false); //if the data has loaded, that is, the code has reached this section, then loading completed
        return data;
      } catch (e) {
        setLoading(false);
        setError(e.message);
        throw e;
      }
    },
    [],
  );

  const clearError = useCallback(() => setError(null), []);

  return {loading, error, request, clearError}; //Well, since this is a custom hook, let’s just return them
};

export {useHttp};
