module.exports.controller = app => {
  /* GET users listing. */
  app.get('/users', (req, res, next) => {
    res.render('users', {
      title: 'Users',
      description: 'This is the description of all the users'
    });
  });
};
