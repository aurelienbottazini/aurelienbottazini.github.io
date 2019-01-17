# About

  This is my [personal website](http://aurelienbottazini.com)
  It consists of a blog, a resume and anything interesting I want to share.

## Technology used

- Jekyll to build the website.
- Grunt to minify and js, css, and perform additional preparation
tasks for jekyll

One tricky task that Grunt runs is it creates a _data/sketchnotes.yaml
file based on the content of the sketchnotes directory.
This sketchnotes.yaml file is then used in notes.html to list the sketchnotes.

# Installation

```bash
  bundle
  rm -rf ./node_modules
  npm install -g grunt-cli
  yarn
```

# dev

  `bundle exec jekyll s -wlD`

# Drafts posts

  Create a file inside `_drafts`. Serve it with the -D option `bundle exec jekyll -D`

# deploy

  You need a .env file with the following:
```bash
  AWS_ACCESS_KEY_ID=youraccessid
  AWS_SECRET_ACCESS_KEY=youraccesskey
  AWS_BUCKET=www.aurelienbottazini.com
```

  `./deploy.sh`
