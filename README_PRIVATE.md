This is the repo that holds my blog.

This repo is used to generate the public version using the ./deploy.sh scripts.
It generates the blog public version at `../blog-public`.
It then commits then changes and push. On push the website is automatically updated by github pages, bitbucket pages and any other _pages_ that is setup in the git remote.

A simple now.sh deploy on a free account done by `../aurelienbottazini.com` is done and redirects to my github pages repo.

So to actually have a setup on one of my computers, I need to

```
cd ~/projects

git clone git@github.com:aurelienbottazini/aurelienbottazini.com.git

git clone git@github.com:aurelienbottazini/blog.git
cd blog
git remote set-url --add --push origin git@github.com:aurelienbottazini/blog.git
yarn global add grunt-cli
yarn
bundle

cd ..
  * /
git clone git@github.com:aurelienbottazini/aurelienbottazini.github.io.git blog-public
cd blog-public
git remote set-url --add --push origin git@github.com:aurelienbottazini/aurelienbottazini.github.io.git
git remote set-url --add --push origin git@bitbucket.org:aurelienbottazini/aurelienbottazini.bitbucket.io.git
```

I have shortcuts in my emacs config to create new blog posts using org-mode and to publish the html version the this private repo.
The html versions are then published when using `./deploy.sh`
The org versions are ignored thanks to the jekyll config so they are not published.

To develop run
```
bundle exec jekyll serve -w --livereload
```
