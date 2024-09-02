.PHONY: run dev

run:
	if [ !  -f ./app/node_modules ]; then \
		cd app && npm install; \
	fi
	cd app && npm start

dev:
	if [ !  -f ./app/node_modules ]; then \
		cd app && npm install; \
	fi
	cd app && npm run dev