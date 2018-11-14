DOCKERCOMPOSE=docker-compose

start: docker
  @$(DOCKERCOMPOSE) up -d server

restart: stop start

stop:
  @$(DOCKERCOMPOSE) down

docker:
  @$(DOCKERCOMPOSE) build