FROM ubuntu:latest
ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update
# Default packages to be able to compile
RUN apt-get install -y autoconf build-essential

RUN apt-get install -y git
# I don't want to create a ssh key just for installing gems. So let's just use http instead of ssh
RUN git config --global url."https://github.com/".insteadOf git@github.com:
RUN git config --global url."https://".insteadOf git://

#Installing ruby
WORKDIR /tmp

RUN apt-get install -y wget
RUN apt-get install -y zlib1g-dev bison libssl-dev libyaml-dev libreadline6-dev zlib1g-dev libncurses5-dev libffi-dev libgdbm3 libgdbm-dev
RUN wget -q http://cache.ruby-lang.org/pub/ruby/ruby-2.2.2.tar.gz
RUN tar xzf ruby-2.2.2.tar.gz
WORKDIR /tmp/ruby-2.2.2
RUN ./configure --enable-shared --prefix=/usr
RUN make && make install
WORKDIR /tmp
RUN rm -rf ruby-2.2.2*

RUN echo 'gem: --no-rdoc --no-ri' > ~/.gemrc

RUN gem update --system
RUN gem install bundler

RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup | sudo bash -
RUN apt-get install -y nodejs

RUN useradd -ms /bin/bash deploy
USER deploy
RUN bundle config --global path /home/deploy/blog/_vendor/bundle
WORKDIR /home/deploy/blog

#docker build -t blogimage1 .
#docker run -v /projects/blog:/home/deploy/blog -it blogimage1 /bin/bash
