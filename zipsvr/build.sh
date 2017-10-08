#! /usr/bin/env bash
set -e
go build
docker build -t alexsirr/zipsvr .
docker push alexsirr/zipsvr
go clean
