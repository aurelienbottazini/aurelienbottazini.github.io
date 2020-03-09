This is the repo that holds my blog.

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
