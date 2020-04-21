#!/usr/bin/env bash

set -e

IMAGE_NAME=pplanning-client:latest

docker rm $(docker stop $(docker ps -a -q --filter ancestor=${IMAGE_NAME} --format="{{.ID}}"))

docker build -t $IMAGE_NAME .

docker run -d -p 8081:80 $IMAGE_NAME
