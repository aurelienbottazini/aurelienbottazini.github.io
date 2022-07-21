build:
	bundle exec jekyll b
dev:
	bundle exec jekyll serve -l -D --future -o

.PHONY: dev build
