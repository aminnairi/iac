DOCKERCOMPOSE=docker-compose

.PHONY: start restart stop docker

start: docker
	@$(DOCKERCOMPOSE) up -d server

restart: stop start

stop:
	@$(DOCKERCOMPOSE) down

build: docker
	docker-compose run --rm build

docker:
	@$(DOCKERCOMPOSE) build

publish:
	@make build && git add . && git commit -am ":package: production build" && git push origin $(git subtree split --prefix public master):gh-pages --force && git reset HEAD~1 && rm -rf public