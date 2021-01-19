.PHONY: start_reactjs_server run_react_demo test

start_reactjs_server:
	yarn workspace @ladifire-opensource/stylex-reactjs-examples run start:server

run_react_demo: start_reactjs_server
	yarn workspace @ladifire-opensource/stylex-reactjs-examples run run

test:
	yarn jest
