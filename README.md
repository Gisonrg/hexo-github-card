# hexo-github-card
Display a card for GitHub profile and repo in your [hexo](https://hexo.io) blog. Implemented with [Github-cards](https://github.com/lepture/github-cards).

## Motive

When I write a new blog post, sometimes I would like to include information of a GitHub repo or GitHub profile, and I want them to look nicely in my blog, not just a simple link.

Currently, there is a hexo plugin called [hexo-github](https://github.com/akfish/hexo-github) which can show a GitHub commit in your blog. However, I feel I don't really need to show a specific commit, but more general information such as the name of the repo, its description and its author.

Luckily, there is a repo called [github-cards](https://github.com/lepture/github-cards), which just suits my need well. Hence, I implement this simple plugin so that bloggers could include information on GitHub at ease.

You may find more about how I create the plugin by reading my [blog post](https://blog.gisonrg.me/2016/04/develop-hexo-github-card/)

## Install

NPM
```
npm install --save hexo-github-card
```

Yarn
```
yarn add hexo-github-card
```

## Usage

Insert `githubCard` tag in your article:

```
{% githubCard user:your_user [repo:your_repo] [width:400] [theme:Default] [client_id:your_client_id] [client_secret:your_client_secret] [align:text-align_position] %}
```

Argument | Description
-------- | -----------
user     | GitHub user name
repo     |  (Optional) GitHub repository name of the user. If omit then display only the user profile
width   | (Optional) Widget's width. It should be a valid CSS width value. Default is 400.
client_id | (Optional) Your GitHub app client_id
client_secret | (Optional) Your GitHub app client_secret
align | (Optional) What kind of text-align is you want. Default is center.

(Configuration are consistent with [github-cards](https://github.com/lepture/github-cards#widgetjs))

Example:

Display user profile only
```
{% githubCard user:Gisonrg %}
```

Display a repo
```
{% githubCard user:Gisonrg repo:hexo-github-card %}
```

TODO
-----------
* May be a good idea to put the configuration in the `_config.yml` file.
* [github-cards](https://github.com/lepture/github-cards) is sometimes buggy. Probably I could fork it to create my own build.

## Credit
@incomparable9527 for introducing key value (attr:value) attribute pair to support unordered attributes.

License
=======

[MIT](LICENSE)
