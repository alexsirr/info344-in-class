#! /usr/bin/env bash
set -e
CGO_ENABLED=0 go build -a
docker build -t alexsirr/zipsvr .
docker push alexsirr/zipsvr
go clean