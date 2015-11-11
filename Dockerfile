FROM jekyll/jekyll:master
ENV DEBIAN_FRONTEND noninteractive

# I don't want to create a ssh key just for installing gems. So let's just use http instead of ssh
RUN git config --global url."https://github.com/".insteadOf git@github.com:
RUN git config --global url."https://".insteadOf git://

# RUN apt-get install -y curl
# RUN curl -sL https://deb.nodesource.com/setup | sudo bash -
# RUN apt-get install -y nodejs
# RUN npm install npm -g
# RUN npm install -g grunt-cli
# RUN gem install sass

# RUN locale-gen en_US.UTF-8
# RUN dpkg-reconfigure locales

# ENV LANG en_US.UTF-8
# ENV LC_ALL en_US.UTF-8

#docker build -t blogimage1 .
#docker run -v /projects/blog:/home/deploy/blog -it blogimage1 /bin/bash
