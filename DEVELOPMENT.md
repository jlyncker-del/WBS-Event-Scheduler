# Development Workflow

Build this project incrementally through small branches and pull requests. Each PR should include a short summary, affected routes or endpoints, screenshots for UI changes, and local test results.

## PR 1 - Project Setup

- Vite React setup.
- TailwindCSS setup.
- Basic folder structure.
- Initial `.env.example`.

Test locally:

```bash
npm install
npm run dev
npm run build
```

## PR 2 - Routing And Layout

- React Router setup.
- Layout component.
- Navbar component.
- Page skeletons for all required routes.

Test locally:

```bash
npm run dev
```

Visit `/`, `/events/1`, `/signup`, `/signin`, `/create-event`, and `/not-found`.

## PR 3 - API Client

- Centralized API client in `src/api/client.js`.
- `VITE_API_BASE_URL` environment variable setup.
- JSON parsing and empty-response handling.
- API error and network error foundation.
- Bearer token header support for authenticated requests.

Test locally:

```bash
npm run build
```

With the API stopped, verify the UI shows a friendly server-unavailable message.

## PR 4 - Events Listing

- `GET /api/events` integration.
- Event cards.
- Chronological sorting by event date.
- Loading, empty, and error states.

Test locally:

```bash
npm run dev
```

Run the API on `http://localhost:3001`, seed the database, and confirm events render on `/`.

## PR 5 - Event Details

- `GET /api/events/:id` integration.
- Details page.
- 404, invalid-ID, and network error handling.

Test locally:

```bash
npm run dev
```

Open `/events/1`, `/events/not-a-number`, and a missing numeric ID.

## PR 6 - Authentication

- Sign-up page with `POST /api/users`.
- Sign-in page with `POST /api/auth/login`.
- Token persistence in `localStorage` with `events_api_token`.
- `AuthContext` and `useAuth`.
- Logout behavior.

Test locally:

```bash
npm run dev
```

Create an account, sign in, reload the page, confirm the session remains active, then log out.

## PR 7 - Protected Route And Create Event

- `ProtectedRoute`.
- Protected `/create-event`.
- Create event form based on the Events API schema.
- `POST /api/events` with `Authorization: Bearer <token>`.
- Success redirect to `/events/:id` when the API returns an ID.

Test locally:

```bash
npm run dev
```

Confirm unauthenticated users redirect to `/signin`, authenticated users can create events, and invalid or expired tokens are cleared.

## PR 8 - Polish And Deployment Documentation

- Responsive UI improvements.
- Final error handling pass.
- README completion.
- Render deployment notes.
- Known limitations and future improvements.

Test locally:

```bash
npm run build
```

Review the app on mobile, tablet, and desktop viewport widths.
