# edge_router

Cloudflare Worker for edge routing and proxying requests.

## Features

- Simple HTTP/HTTPS proxy implementation
- Request forwarding to target host
- Configurable via environment variables
- Automatic deployment via GitHub Actions

## Setup

### Prerequisites

- Node.js (v18 or later)
- Cloudflare account
- Wrangler CLI

### Installation

```bash
make install
```

### Configuration

Set the target host in `wrangler.toml`:

```toml
[vars]
TARGET_HOST = "your-target-host.com"
```

## Development

### Local Development

Start the local development server:

```bash
make dev
```

### Deploy

Deploy to Cloudflare Workers:

```bash
make deploy
```

### View Logs

Watch real-time logs:

```bash
make tail
```

## Commands

Available Make commands:

- `make install` - Install dependencies
- `make dev` - Start local development server
- `make deploy` - Deploy to Cloudflare Workers
- `make tail` - Watch worker logs
- `make login` - Login to Cloudflare
- `make logout` - Logout from Cloudflare

## GitHub Actions

The repository includes automated deployment workflow that deploys to Cloudflare Workers on push to the main branch.

### Setup Secrets

Add the following secrets to your GitHub repository:

- `CLOUDFLARE_API_TOKEN` - Cloudflare API token with Workers permissions
- `CLOUDFLARE_ACCOUNT_ID` - Your Cloudflare account ID

## License

MIT
