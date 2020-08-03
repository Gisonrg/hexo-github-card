'use strict';

const Promise = require('bluebird');
const fs = require('hexo-fs');
const nunjucks = require('nunjucks');
const path = require('path');

const LIB_PATH = path.resolve(__dirname, './lib');
const GITHUB_CARD_LIB_NAME = 'githubcard.js';
const GITHUB_CARD_FILE_PATH = path.resolve(LIB_PATH, GITHUB_CARD_LIB_NAME);
const GITHUB_CARD_ROUTE_NAME = 'lib/github-card-lib';
const GITHUB_CARD_TAG_NAME = 'githubCard';
const GITHUB_CARD_TEMPLATE = path.resolve(__dirname, 'card.html');

nunjucks.configure(__dirname, {
  watch: false,
});

// Registers serving of the lib used by the plugin with Hexo.
hexo.extend.generator.register(GITHUB_CARD_ROUTE_NAME, () => {
  return {
    path: `${GITHUB_CARD_ROUTE_NAME}/${GITHUB_CARD_LIB_NAME}`,
    data: () => fs.createReadStream(GITHUB_CARD_FILE_PATH),
  };
});

// Registers the new tag with Hexo.
hexo.extend.tag.register(GITHUB_CARD_TAG_NAME, (args) => {
  const argsObj = {};

  args.forEach((arg) => {
    let current = arg.split(':');
    argsObj[current[0]] = current[1];
  });

  const user = argsObj.user,
    repo = argsObj.repo,
    width = argsObj.width || '400',
    height = argsObj.height || '200',
    theme = argsObj.theme || 'default',
    client_id = argsObj.client_id || '',
    client_secret = argsObj.client_secret || '',
    align = argsObj.align || 'center';

  const payload = {
    user,
    repo,
    height,
    width,
    theme,
    client_id,
    client_secret,
    style: `text-align: ${align}`,
  };

  return new Promise((resolve, reject) => {
    nunjucks.render(GITHUB_CARD_TEMPLATE, payload, (err, res) => {
      if (err) {
        return reject(err);
      }
      resolve(res);
    });
  });
}, {
  async: true
});
