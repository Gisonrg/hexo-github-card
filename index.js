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
    data: function() {
      return fs.createReadStream(filePath);
    }
  };
});

nunjucks.configure(__dirname, {
  watch: false
});

hexo.extend.tag.register('githubCard', function(args) {
  var arg_obj = {};

  args.forEach(function(arg) {
    var current_arg = arg.split(":");
    arg_obj[current_arg[0]] = current_arg[1]
  });

  var user = arg_obj.user,
    repo = arg_obj.repo,
    width = arg_obj.width ? arg_obj.width : '400',
    theme = arg_obj.theme ? arg_obj.theme : 'default',
    client_id = arg_obj.client_id ? arg_obj.client_id : '',
    client_secret = arg_obj.client_secret ? arg_obj.client_secret : '',
    align = arg_obj.align ? arg_obj.align : 'center';

  var payload = {
    user: user,
    repo: repo,
    width: width,
    theme: theme,
    client_id: client_id,
    client_secret: client_secret,
    align: align
  };

  return new Promise(function(resolve, reject) {
    nunjucks.render('card.html', payload, function(err, res) {
      if (err) {
        return reject(err);
      }
      resolve(res);
    });
  });
}, {
  async: true
});
