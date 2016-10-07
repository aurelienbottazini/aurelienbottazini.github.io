#!/usr/bin/env sh
grunt
bundle exec jekyll build
bundle exec s3_website push
