var fs = require('hexo-fs');
var path = require('path');
var Promise = require('bluebird');
var nunjucks = require('nunjucks');

var libBase = path.resolve(__dirname, "./lib");

hexo.extend.generator.register('github-card-lib', function(locals) {
  var routes = [];
  var file = 'githubcard.js';
  var filePath = path.resolve(libBase, file);

  return {
    path: 'github-card-lib/' + file,
    data: function () {
      return fs.createReadStream(filePath);
    }
  };
});

nunjucks.configure(__dirname, {watch: false});

hexo.extend.tag.register('githubCard', function(args) {
  var user = args[0],
    repo = args[1],
    width = args[2] ? args[2] : '400',
    theme = args[3] ? args[3] : 'default',
    client_id = args[4] ? args[4] : '',
    client_secret = args[5] ? args[5] : '';

  var payload = {
    user: user,
    repo: repo,
    width: width,
    theme: theme,
    client_id: client_id,
    client_secret : client_secret
  };

  return new Promise(function (resolve, reject) {
    nunjucks.render('card.html', payload, function (err, res) {
      if (err) {
        return reject(err);
      }
      resolve(res);
    });
  });
}, {async: true});
