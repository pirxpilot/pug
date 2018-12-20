NODE_BIN = ./node_modules/.bin

check: test

test:
	$(NODE_BIN)/mocha

clean:
	rm -rf test/output test/temp

.PHONY: test
