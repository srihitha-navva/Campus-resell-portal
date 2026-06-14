# CampusResell Frontend

React + Vite client for the CampusResell marketplace.

## Scripts

- `npm run dev` starts local development.
- `npm run build` creates a production build in `dist`.
- `npm run lint` runs ESLint.
- `npm run preview` previews the production build locally.

## Environment Variables

Use `frontend/.env.example` as the template.

- `VITE_API_URL` should point to the deployed backend URL.

Example:

```env
VITE_API_URL=https://your-backend-domain.com
```

If the frontend and backend are deployed on separate domains, the backend must also include the frontend URL in `CLIENT_URL` or `CLIENT_URLS`.
