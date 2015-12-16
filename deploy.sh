#!/usr/bin/env sh

grunt
jekyll build
bundle exec s3_website push
