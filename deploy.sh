#!/usr/bin/env sh

emacs -Q --batch -l ~/.emacs.d/emacs-config.el --funcall org-publish-all
grunt
bundle exec jekyll build
bundle exec s3_website push
