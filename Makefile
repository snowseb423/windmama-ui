
#javascript path
JS_SRC = app/front/js_jsx/index.jsx
JS_TARGET = public/js/index.js

#less path
LESS_DIR = app/front/less/
LESS_SRC = $(LESS_DIR)index.less
LESS_TARGET = public/css/style.css

#bin
WATCHIFY = ./node_modules/.bin/watchify
EXORCIST = ./node_modules/.bin/exorcist
WATCH = ./node_modules/.bin/watch
LESSC = ./node_modules/.bin/lessc

#commands
watch-js:
	$(WATCHIFY) --verbose --debug -t [ babelify --presets [ es2015 react ] ] -o $(JS_TARGET) -- $(JS_SRC) | $(EXORCIST) $(JS_TARGET).map > $(JS_TARGET)

watch-css:
	$(WATCH) '$(LESSC) $(LESS_SRC) $(LESS_TARGET)' $(LESS_DIR)

watch:
	make -j4 watch-js watch-css

init:
	npm install watchify exorcist --save && npm install watch less --save-dev
