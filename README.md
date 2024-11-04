# AI Image to Listing Generator

A Next.js application that uses AI to analyze product images and generate marketplace listings.

## Features

- 🖼️ Image upload and analysis
- 🤖 AI-powered product listing generation
- 📝 Form submission with validation
- 🐳 Docker containerization
- 🚀 Production-ready setup

## Prerequisites

- Docker and Docker Compose
- Node.js 20.x (for local development)
- Git

## Self-Hosted Deployment

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd ai-image-to-listing
```

### 2. Configuration

Create a `.env` file in the root directory:

```bash
# Server Configuration
PORT=3000
NODE_ENV=production

# Add any additional environment variables here
```

### 3. Docker Deployment

The easiest way to deploy is using Docker Compose:

```bash
# Build and start the containers
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the application
docker-compose down
```

### 4. Manual Deployment

If you prefer to run without Docker:

```bash
# Install dependencies
npm install

# Build the application
npm run build

# Start the production server
npm start
```

### 5. Nginx Configuration

If you're using Nginx as a reverse proxy, use this configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 6. SSL Setup (Optional)

To enable HTTPS with Let's Encrypt:

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d your-domain.com

# Certbot will automatically modify your Nginx configuration
```

## Development

To run the application locally:

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Project Structure

```
.
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   └── page.tsx           # Main page
├── components/            # React components
│   ├── sections/         # Page sections
│   └── ui/               # UI components
├── public/               # Static files
└── docker/               # Docker configuration
```

## API Endpoints

- `POST /api/analyze-image`: Analyzes uploaded product images
- `POST /api/submit-form`: Handles form submissions
- `GET /api/health`: Health check endpoint

## Maintenance

### Updating the Application

```bash
# Pull latest changes
git pull

# Rebuild and restart containers
docker-compose down
docker-compose up -d --build
```

### Backup

Regularly backup your environment files and any persistent data:

```bash
# Backup environment file
cp .env .env.backup

# Create a dated backup
tar -czf backup-$(date +%Y%m%d).tar.gz .env data/
```

### Monitoring

Monitor the application using Docker's built-in tools:

```bash
# View container status
docker-compose ps

# Check container resources
docker stats

# View logs
docker-compose logs -f
```

## Troubleshooting

### Common Issues

1. **Container fails to start:**
   ```bash
   # Check logs
   docker-compose logs web
   ```

2. **Port conflicts:**
   ```bash
   # Check if port 3000 is in use
   sudo lsof -i :3000
   ```

3. **Permission issues:**
   ```bash
   # Fix permissions
   sudo chown -R 1001:1001 .next/
   ```

## Security Considerations

- Keep Docker and Node.js updated
- Regularly update dependencies
- Use environment variables for sensitive data
- Enable firewall rules
- Set up rate limiting
- Monitor logs for suspicious activity

## License

[MIT License](LICENSE)