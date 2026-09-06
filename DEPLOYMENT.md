# Deployment

Three services, three origins:

| Service   | Origin                       | Serves                        |
| --------- | ---------------------------- | ----------------------------- |
| Website   | `https://faisal6000.ssh.bd`  | `/` (this repo root)          |
| Backend   | `https://faisal6001.ssh.bd`  | `bacchus_backend/`            |
| Dashboard | `https://faisal6003.ssh.bd`  | `bacchus_dashboard/`          |

All three talk to one MongoDB. The website and dashboard are static builds that
call the backend from the browser, so **every origin has to be allowed by CORS**
and **every build has to be pointed at the backend at build time** — Vite bakes
`VITE_*` values into the bundle, they are not read at runtime.

---

## Backend

### Environment

Copy the URL block from `bacchus_backend/.env.production.example` into the
server's `.env`. Everything else (database, JWT secret, SMTP, Stripe,
Cloudinary) stays as it is.

Two of these were wrong in production and each caused a visible failure:

- **`QUOTE_ACCEPT_BASE_URL`** — unset, so it fell back to `CLIENT_URL`
  (`http://localhost:5173`). Every "Accept Quote" button emailed to a client
  was a dead link. Set it explicitly to `https://faisal6000.ssh.bd`.
- **`EXTRA_CORS_ORIGINS`** — did not list the dashboard, so every call from
  `https://faisal6003.ssh.bd` was blocked by the browser before it reached the
  server. Both frontends must be listed.

### Deploying

`pdfkit` was added for the contract PDF, so a pull-and-restart is not enough —
**`npm install` must run**, or the process dies on boot with
`Error: Cannot find module 'pdfkit'`.

```bash
git pull
npm install          # required — new dependency
npm run build
# restart (pm2 restart <app> / systemctl restart <unit> / your process manager)
curl https://faisal6001.ssh.bd/health     # expect {"status":"ok",...}
```

---

## Website and dashboard

### Build, don't `npm run dev`

The website is currently served by the **Vite dev server** — the deployed HTML
loads `/@vite/client` and `/src/main.tsx`. That ships unminified TypeScript
source to every visitor, has no caching, and is not built to take production
traffic. Serve a production build instead.

```bash
# website (repo root)
npm ci && npm run build      # -> dist/

# dashboard
cd bacchus_dashboard && npm ci && npm run build   # -> dist/
```

`.env.production` in each project points the build at
`https://faisal6001.ssh.bd`. `.env` is left alone so `npm run dev` still talks
to localhost.

### SPA fallback

Both are single-page apps. Any path that is not a real file must return
`index.html`, or a client opening `/accept-quote/<token>` straight from their
email gets a web-server 404 before React ever loads.

nginx:

```nginx
root /var/www/bacchus-website/dist;
location / {
    try_files $uri $uri/ /index.html;
}
```

The Vite dev server does this automatically, which is why it is not currently
broken — it will break the moment you switch to a static build without this.

---

## Checks after deploying

```bash
# backend up
curl https://faisal6001.ssh.bd/health

# dashboard allowed by CORS — must return access-control-allow-origin
curl -sD - -o /dev/null -X OPTIONS https://faisal6001.ssh.bd/api/v1/quote \
  -H "Origin: https://faisal6003.ssh.bd" \
  -H "Access-Control-Request-Method: POST" | grep -i access-control-allow-origin

# website serves the accept route
curl -o /dev/null -w "%{http_code}\n" https://faisal6000.ssh.bd/accept-quote/test

# dashboard up
curl -o /dev/null -w "%{http_code}\n" https://faisal6003.ssh.bd/
```

Then submit one real quote and check that the emailed **Accept This Quote**
button points at `https://faisal6000.ssh.bd/accept-quote/...` and not
`localhost`.

---

## Note on acceptance links

An acceptance token is issued per quote, stored only as a SHA-256 hash, and is
valid for 30 days (`QUOTE_ACCEPT_TOKEN_DAYS`). A link stops working if the
quote is deleted, or if an admin uses **Resend estimate with a fresh link** —
that deliberately invalidates the previous token. In both cases the client sees
"This link is not valid", which is the same message as a genuinely bad link.
