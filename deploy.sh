#!/usr/bin/env sh
jekyll build
grunt

# s3_website is not compatible with java10 so we need to briefly
# switch to a previous version while using this script
echo '2' | sudo update-alternatives --config java
bundle exec s3_website push
echo '0' | sudo update-alternatives --config java
