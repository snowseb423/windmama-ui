LESS_DIR = app/less/
LESS_SRC = $(LESS_DIR)index.less
LESS_TARGET = public/css/style.css

JS_SRC = app/js/index.jsx
JS_TARGET = public/js/index.js
OPTION_REACT = [ babelify --presets [ es2015 react ] ]

WATCHIFY = ./node_modules/.bin/watchify
WATCH = ./node_modules/.bin/watch
LESSC = ./node_modules/.bin/lessc
BROWSERIFY = ./node_modules/.bin/browserify


dev-js:
	$(WATCHIFY) --verbose --debug -t $(OPTION_REACT) -o $(JS_TARGET) $(JS_SRC)
dev-less:
	$(WATCH) '$(LESSC) $(LESS_SRC) $(LESS_TARGET)' $(LESS_DIR)


dev:
	echo "8080" > app/.port
	make -j4 dev-js dev-less
clear:
	rm -f app/.port $(JS_TARGET) $(LESS_TARGET)
prod:
	echo "80" > app/.port
	npm install
	$(LESSC) $(LESS_SRC) $(LESS_TARGET) | $(BROWSERIFY) -t $(OPTION_REACT) -o $(JS_TARGET) $(JS_SRC)
