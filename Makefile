NODE_BIN = ./node_modules/.bin

check: test

test:
	$(NODE_BIN)/mocha

bench:
	node support/benchmark

clean:
	rm -rf test/output test/temp

.PHONY: test
