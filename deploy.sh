#!/usr/bin/env sh
grunt
jekyll build

cd ~/projects/aurelienbottazini.com_public
git add .
git commit -m "publish"
g push
cd -
