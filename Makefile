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