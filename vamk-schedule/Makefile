SHELL := /bin/bash

IMAGE_NAME = vamk-schedule-image
CONTAINER_NAME = vamk-schedule

build-local:
	docker build -t $(IMAGE_NAME) .

start-local:
	docker run -d --name $(CONTAINER_NAME) --restart=always --net=host $(IMAGE_NAME)

stop-local:
	-docker stop $(CONTAINER_NAME)
	-docker rm $(CONTAINER_NAME)
