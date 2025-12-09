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

deploy:
	act -W .github/workflows/deploy.yml \
		--secret-file ./secrets
		
install:
	npm install

dev:
	npm run dev

tail:
	npx wrangler tail

login:
	npx wrangler login

logout:
	npx wrangler logout
