# About

  This is my [personal website](http://aurelienbottazini.com)
  It consists of a blog, a resume and anything interesting I want to share.

## Technology used

- HTML5
- CSS3 & SASS
- Javascript
- Gif, png, jpeg
- SVG
- Velocity.js
- Boilerplate
- Photoshop & Illustrator

This project uses grunt to minify and compress all files and update yaml files when needed (for a list of sketchnotes for examples)

# Installation

```bash
  bundle
  npm install -g grunt
  yarn
```

# dev

  `bundle exec jekyll s -wlD`

# Drafts posts

  Create a file inside `_drafts`. Serve it with the -D option `bundle exec jekyll -D`

# deploy

  !!! If you want to push the last version of the website, be sure to build the website first with `bundle exec jekyll build`

  You need a .env file with the following:
```bash
  AWS_ACCESS_KEY_ID=youraccessid
  AWS_SECRET_ACCESS_KEY=youraccesskey
  AWS_BUCKET=www.aurelienbottazini.com
```

  `./deploy.sh`
