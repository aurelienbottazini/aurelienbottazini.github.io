build:
	bundle exec jekyll b
dev:
	bundle exec jekyll serve -l -D --future -H 0.0.0.0

dev-ipad:
	bundle exec jekyll serve -D --future -H 0.0.0.0

.PHONY: dev build
