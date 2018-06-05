#!/usr/bin/env sh
grunt

# s3_website is not compatible with java10 so we need to briefly
# switch to a previous version while using this script
sudo update-alternatives --config java
bundle exec s3_website push
sudo update-alternatives --config java
