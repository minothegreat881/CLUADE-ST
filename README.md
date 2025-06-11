# Simple Strapi Web Example

This repository contains a very basic example of a web page that can connect to a [Strapi](https://strapi.io/) backend. It includes two pages:

- `index.html` – a simple page that fetches data from the Strapi API.
- `admin.html` – a minimal admin interface to create new entries via the API (using fetch requests).

## Running a Strapi Backend

1. Ensure you have `node` and `npm` installed.
2. Create a new Strapi project (the quickstart option is easiest):
   ```bash
   npx create-strapi-app@latest backend --quickstart
   ```
   This starts Strapi on `http://localhost:1337`.
3. Once Strapi is running, open the admin panel at `http://localhost:1337/admin` to set up your administrator account and create a content type named **Post** with at least a `title` field.
4. In `app.js` and `admin.js`, ensure `BASE_URL` matches your backend URL (default is `http://localhost:1337/api`).
5. Open `index.html` and `admin.html` in your browser. From `admin.html`, you can create new posts, and `index.html` will display them.

## Deployment

These files can be served statically from any web server. For example, you can use the `http-server` npm package:

```bash
npx http-server .
```

Then navigate to `http://localhost:8080` (or whichever port is shown) to view the site.

For production, host these static files on any static site hosting solution and ensure they can reach your Strapi instance.
