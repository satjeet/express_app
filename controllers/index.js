//exporta todo el controller(app)
//osea hago exportable la funcion controller(app)
module.exports.controller = app => {
  /* GET home page. */
  app.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });
};
