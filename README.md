# Glovo Webhook Service

A TypeScript/Express.js webhook service for Glovo partner integration, ready for deployment on Render.com.

## Features

- ✅ Express.js server with TypeScript
- ✅ Webhook signature verification using HMAC SHA-256
- ✅ Two webhook endpoints: `/glovo/orders/dispatched` and `/glovo/orders/cancelled`
- ✅ Health check endpoint at `/health`
- ✅ Error handling and logging
- ✅ Ready for Render.com deployment

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   Fill in your Glovo credentials in `.env`:
   - `GLOVO_SHARED_TOKEN`: Your shared token from Glovo
   - `GLOVO_WEBHOOK_ID`: Your webhook ID from Glovo

3. **Development:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

## Webhook Endpoints

When requesting credentials from `partner.integrationseu@glovoapp.com`, provide these URLs:

- **Dispatched orders:** `https://your-app.onrender.com/glovo/orders/dispatched`
- **Cancelled orders:** `https://your-app.onrender.com/glovo/orders/cancelled`

## Deployment on Render.com

1. Connect your GitHub repository to Render
2. Use the included `render.yaml` configuration
3. Set environment variables in Render dashboard:
   - `GLOVO_SHARED_TOKEN`
   - `GLOVO_WEBHOOK_ID`

## Security

- Webhook requests are verified using HMAC SHA-256 signatures
- All endpoints require valid signatures
- HTTPS is enforced in production

## API Response Format

All webhook endpoints return standardized responses:

```json
{
  "success": true,
  "message": "Order dispatched notification processed successfully",
  "timestamp": "2023-12-07T10:30:00.000Z"
}
```

## Health Check

The service provides a health check endpoint at `/health` for monitoring.