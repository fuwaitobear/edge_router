# Cloudflare Worker Management

.PHONY: help install dev deploy tail login logout

help:
	@echo "Available commands:"
	@echo "  make install  - Install dependencies"
	@echo "  make dev      - Start local development server"
	@echo "  make deploy   - Deploy to Cloudflare Workers"
	@echo "  make tail     - Watch worker logs"
	@echo "  make login    - Login to Cloudflare"
	@echo "  make logout   - Logout from Cloudflare"

install:
	npm install

dev:
	npm run dev

deploy:
	npm run deploy

tail:
	npx wrangler tail

login:
	npx wrangler login

logout:
	npx wrangler logout
