# CampusResell Backend

Express API for authentication, product listings, carts, and admin management.

## Scripts

- `npm start` starts the API server.
- `npm run check` validates backend JavaScript syntax.
- `npm test` runs the same backend check.

## Required Environment Variables

Use `backend/.env.example` as the template for your hosting provider.

- `NODE_ENV=production`
- `PORT`
- `DB_URL`
- `SECRET_KEY`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `CLIENT_URL` or `CLIENT_URLS`

For multiple frontend origins, set `CLIENT_URLS` as a comma-separated list.

## Deploy Notes

- Set `NODE_ENV=production` so auth cookies use `secure` and `sameSite=none`.
- The frontend domain must be included in `CLIENT_URL` or `CLIENT_URLS` for CORS.
- The frontend must call this deployed API using `VITE_API_URL`.
