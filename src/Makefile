#
# Makefile
# rgregoir, 2017-10-20 11:42
#

all:
	make build
	make run

run:
	docker run --name analysis-app --rm -p 3001:3001 -v $$(pwd):/usr/src/app analysis-app

build:
	docker build -t analysis-app .

.PHONY: start

# vim:ft=make
#
