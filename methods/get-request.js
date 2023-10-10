module.exports = (req, res) => {
  let baseUrl = req.url.substring(0, req.url.lastIndexOf('/') + 1);
  // console.log(baseUrl);
  let id = req.url.split('/')[3];
  console.log(id);
  if (req.url === '/api/movies') {
    res.statusCode = 200;
    res.setHeader('content-Type', 'application/json');
    res.write(JSON.stringify(req.movies));
    res.end();
  } else if (baseUrl === '/api/movies/' && req.movies.id === id) {
    res.setHeader('content-Type', 'application/json');
    let filteredMovie = req.movies.filter((movie) => {
      return movie.id === id;
    });
    if (filteredMovie.length > 0) {
      res.statusCode = 200;
      res.write(JSON.stringify(filteredMovie));
      res.end();
    } else {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify({ title: 'Not Found', message: 'Movie not found' }));
      res.end();
    }
  } else {
    res.writeHead(404, { 'content-Type': 'application/json' });
    res.end(JSON.stringify({ title: 'Not Found', message: 'Route not found' }));
  }
};
