module.exports = (app) => {
  app.get('/about/', (req, res) => {
    res.send('About Me')
  });
};
