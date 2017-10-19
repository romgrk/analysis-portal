#
# Makefile
# rgregoir, 2017-10-19 16:03
#

all:
	make build
	make start

start:
	docker run --name analysis-db --rm -p 9000:5432 -v $$(pwd)/data:/var/lib/postgresql/data analysis-db

build:
	sudo rm -rf data
	mkdir data
	docker build -t analysis-db .

.PHONY: start

# vim:ft=make
#
