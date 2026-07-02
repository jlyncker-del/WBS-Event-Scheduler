# Event Scheduler

## Project Description

Event Scheduler is a React + Vite + TypeScript front-end for the local WBS Events API. It lists events, shows event details, supports user registration and login, persists JWT authentication with `localStorage`, protects event creation, supports authenticated event deletion, and prepares the app for static-site deployment.

The API contract was checked against the provided Events API Swagger/source. The front-end reads the API origin from `VITE_API_BASE_URL` and does not hardcode it inside React components.

## Tech Stack

- React
- TypeScript with strict project references
- Vite
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
- Authenticated event deletion through `DELETE /api/events/:id`.
- Centralized API error handling for validation, auth, server, and network failures.
- Deployment notes for Render static sites.

## TypeScript Migration Summary

The app was migrated from React JavaScript to strict TypeScript. Source files in `src` now use `.ts` and `.tsx`, with shared domain types in `src/types`.

Key typed areas:

- Event, user, auth, and API request models.
- Centralized API client and structured `ApiError`.
- Auth context and `useAuth`.
- Custom event loading hooks.
- Reusable component props.
- Page form state, form events, and route params.

The production build runs TypeScript first:

```bash
npm run build
```

This executes:

```bash
tsc -b && vite build
```

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
- `DELETE /api/events/:id`

The current API schema uses `email` and `password` for auth, returns a `token` on login, and accepts event fields including `title`, `date`, `location`, and optional `description`. The API fills `organizerId` from the authenticated JWT during event creation. Event deletion requires the same Bearer token authentication.

## World Cup 2026 Seed Data

The current API seed data contains 14 FIFA World Cup 2026 themed events covering the tournament from 11 June 2026 to 19 July 2026. It includes host-country fan festivals, group-stage milestones, knockout rounds, both semi-finals, the third-place playoff, and the final.

The API event schema supports `title`, `description`, `date`, `location`, `latitude`, `longitude`, and `organizerId`. The seed uses only those fields; categories, images, capacity, and status are not part of the current database model.

Seed the API database after installing API dependencies:

```bash
npm run seed
```

The seed script replaces all existing event records with the World Cup event set and keeps existing users intact. If the user table is empty, it creates seed users first. Seeded users use the password `12345678`.

To explicitly run the same replacement flow as a forced reseed:

```bash
SEED_FORCE=true npm run seed
```

After reseeding, start the API and verify the events through Swagger or the events endpoint:

```text
http://localhost:3001/api-docs
http://localhost:3001/api/events
```

Then start the frontend and verify the cards at:

```text
http://localhost:5173
```

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

Run the linter:

```bash
npm run lint
```

Preview the production build:

```bash
npm run preview
```

## Run Frontend And API Together

The React app and the Events API must run at the same time in two VS Code terminals.

Terminal 1 - start the API:

```bash
cd ~/Documents/events-api
npm run dev
```

Confirm the API is reachable:

```text
http://localhost:3001/api-docs
```

Terminal 2 - start the frontend:

```bash
cd "/Users/jamal/Documents/Event Scheduler"
npm run dev
```

Open the frontend URL printed by Vite, usually:

```text
http://127.0.0.1:5173
```

## Environment Variables

Frontend `.env.example` and local `.env`:

```bash
VITE_API_BASE_URL=http://localhost:3001
```

For production, set `VITE_API_BASE_URL` to the public URL of the deployed API.

Restart `npm run dev` after changing `.env`, because Vite reads environment variables when the dev server starts.

## Troubleshooting API Connection Errors

If the app shows `Unable to reach the Events API`, the frontend could not connect to the configured API origin. Check these items:

- The API server is running in a separate terminal.
- The API terminal prints `Server running on http://localhost:3001`.
- `http://localhost:3001/api-docs` opens in the browser.
- Frontend `.env` contains `VITE_API_BASE_URL=http://localhost:3001`.
- The generated request path is `/api/events`, so the final local events URL is `http://localhost:3001/api/events`.

For a deployed frontend, `localhost` points to the visitor's computer, not to your API server. Deploy the API separately and set `VITE_API_BASE_URL` to the public API URL.

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

## Event Deletion Behavior

Authenticated users see a delete action on the event details page. The app asks for browser confirmation before sending the delete request.

Delete flow:

- User must be signed in.
- UI calls `DELETE /api/events/:id`.
- API client sends `Authorization: Bearer <token>`.
- Button shows a deleting state.
- Errors are displayed inline.
- Successful deletion redirects back to `/`.

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
- Delete permissions are enforced by the API token; the UI hides delete controls for logged-out users.

## Future Improvements

- Add automated component and route tests.
- Add profile display through `GET /api/auth/profile`.
- Add event editing for authenticated users.
- Add owner-aware authorization UI once the API exposes event ownership rules.
- Add pagination controls if the event dataset grows.
- Add map links or coordinates display when latitude and longitude are available.
