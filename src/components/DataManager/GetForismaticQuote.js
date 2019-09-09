import fetchJsonp from 'fetch-jsonp'

export default {
    getRandomQuote () {
        fetchJsonp('http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en',
        {jsonpCallback: 'jsonp'})
        .then(function(response) {
          return response.json();
        })
        .then(response => console.log(response))
      }
}

