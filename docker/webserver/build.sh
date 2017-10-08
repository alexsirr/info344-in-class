#! /usr/bin/env bash
set -e
GOOS=linux go build
docker build -t alexsirr/testserver .
docker push alexsirr/testserver
go clean
