# Event Scheduler

## Project Description

Event Scheduler is a React + Vite front-end for the local WBS Events API. It lists events, shows event details, supports user registration and login, persists JWT authentication with `localStorage`, protects event creation, and prepares the app for static-site deployment.

The API contract was checked against the provided Events API Swagger/source. The front-end reads the API origin from `VITE_API_BASE_URL` and does not hardcode it inside React components.

## Tech Stack

- React
- Vite
- JavaScript
- React Router
- TailwindCSS
- Fetch API through a centralized API client
- Web Storage API with `localStorage`
- Local Node.js Express Events API

## Features

- Responsive home page with chronological event cards.
- Event details page with loading, not-found, invalid-ID, and API error states.
- User sign-up through `POST /api/users`.
- User sign-in through `POST /api/auth/login`.
- JWT persistence with the stable `events_api_token` storage key.
- Logout that clears the stored token.
- Protected `/create-event` route.
- Authenticated event creation through `POST /api/events`.
- Centralized API error handling for validation, auth, server, and network failures.
- Deployment notes for Render static sites.

## Route Overview

- `/` - Home page and event list.
- `/events/:id` - Event details.
- `/signup` - User registration.
- `/signin` - User login.
- `/create-event` - Protected event creation.
- `/not-found` - Not found page.
- `*` - Redirects unknown paths to `/not-found`.

## Local Events API Setup

Clone and run the provided API server:

```bash
git clone git@github.com:WebDev-WBSCodingSchool/events-api.git
cd events-api
npm install
cp example.env .env
npm run seed
npm run dev
```

Recommended API `.env` values:

```bash
PORT=3001
NODE_ENV=development
JWT_SECRET=yourSecret
```

Confirm the API is running at:

```text
http://localhost:3001
```

## Swagger UI Usage

Swagger UI is available when the API is not running in production mode:

```text
http://localhost:3001/api-docs
```

Use Swagger to verify request and response schemas before changing API payloads. The implemented front-end uses these endpoints:

- `GET /api/events`
- `GET /api/events/:id`
- `POST /api/users`
- `POST /api/auth/login`
- `POST /api/events`

The current API schema uses `email` and `password` for auth, returns a `token` on login, and accepts event fields including `title`, `date`, `location`, and optional `description`. The API fills `organizerId` from the authenticated JWT during event creation.

## Database Seeding

Seed the API database after installing API dependencies:

```bash
npm run seed
```

Seeding runs only once. If users already exist, the seed script skips and does not overwrite data.

To reset and re-seed the database:

```bash
SEED_FORCE=true npm run seed
```

Seeded users use the password `12345678`.

## Docker API Usage

Build the API image locally:

```bash
docker build -t events-api .
```

Run the local image:

```bash
docker run \
  --name events-api \
  -p 3001:3001 \
  -e NODE_ENV=development \
  -e JWT_SECRET=yourSecret \
  -v events-db:/app/data \
  events-api
```

Run the GitHub Container Registry image:

```bash
docker pull ghcr.io/WebDev-WBSCodingSchool/events-api:latest

docker run \
  --name events-api \
  -p 3001:3001 \
  -e NODE_ENV=development \
  -e JWT_SECRET=yourSecret \
  -v events-db:/app/data \
  ghcr.io/webdev-wbscodingschool/events-api:latest
```

## Frontend Setup

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
cp .env.example .env
```

Start the Vite dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Environment Variables

Frontend `.env.example` and local `.env`:

```bash
VITE_API_BASE_URL=http://localhost:3001
```

For production, set `VITE_API_BASE_URL` to the public URL of the deployed API.

## Authentication And localStorage Behavior

On successful login, the app stores the JWT in `localStorage` with this key:

```text
events_api_token
```

The token is read when the app loads, used to determine whether the user is authenticated, and attached to protected API calls as:

```text
Authorization: Bearer <token>
```

Logout clears the token. If an authenticated request returns `401` or `403`, the API client clears the token and redirects the user to `/signin`.

## Git Workflow And Pull Request Strategy

Use small branches and focused pull requests. Keep `main` deployable, run `npm run build` before opening a PR, and describe the affected route, API endpoint, and test steps in every PR.

A suggested PR sequence is documented in `DEVELOPMENT.md`.

## Render Static-Site Deployment Instructions

Create a Render Static Site with:

- Build command: `npm install && npm run build`
- Publish directory: `dist`
- Environment variable: `VITE_API_BASE_URL=<reachable public API URL>`

Important: the deployed static frontend cannot access an API running only on `localhost`. For a fully functional deployed version, the API must also be deployed to a reachable public URL, and `VITE_API_BASE_URL` must point to that deployed API URL.

## Known Limitations

- The app depends on the local API being available at the configured URL.
- The Events API currently injects `organizerId` on the server from the JWT; the front-end does not expose organizer selection.
- There are no automated UI tests yet.
- Authentication state is token-based only; the app does not currently display the signed-in user's profile.

## Future Improvements

- Add automated component and route tests.
- Add profile display through `GET /api/auth/profile`.
- Add event editing and deletion for authenticated users.
- Add pagination controls if the event dataset grows.
- Add map links or coordinates display when latitude and longitude are available.
