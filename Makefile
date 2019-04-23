### BUILD

install-server:
	cd ./server && make install

install-client:
	cd ./client && make install

install: install-server install-client



### RUN

start-server:
	cd ./server && make start

start-client:
	cd ./client && make start


### TEST

test-server:
	cd ./server && make test


.PHONY: \
	install-server \
	install-client \
	install \
	start-server \
	start-client 
