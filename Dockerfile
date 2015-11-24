FROM jekyll/jekyll:master
COPY . /srv/jekyll
RUN chown -R jekyll:jekyll /srv/jekyll
