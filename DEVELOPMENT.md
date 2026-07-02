# Development Workflow

Build this project incrementally through small branches and pull requests. Each PR should include a short summary, affected routes or endpoints, screenshots for UI changes, and local test results.

## PR 1 - TypeScript Preparation

- Add TypeScript dependencies.
- Add `tsconfig.json`, `tsconfig.app.json`, and `tsconfig.node.json`.
- Convert `vite.config.js` to `vite.config.ts`.
- Compare with a temporary Vite React TypeScript project.
- Keep the app running.

Test locally:

```bash
npm install
npm run dev
npm run build
```

## PR 2 - Shared Types And Utilities

- Add domain models for events, users, auth, and API.
- Convert utility/helper files.
- Type localStorage helpers.
- Keep event normalization typed.

Test locally:

```bash
npm run dev
```

Confirm event sorting and date formatting still work.

## PR 3 - API Layer Migration

- Convert API client to TypeScript.
- Type API requests and responses.
- Improve API error handling.
- Type event, auth, and delete API functions.

Test locally:

```bash
npm run build
```

With the API stopped, verify the UI shows a friendly server-unavailable message.

## PR 4 - Auth Migration

- Convert `AuthContext` and `useAuth`.
- Type login, logout, and token persistence.
- Ensure protected routes still work.

Test locally:

```bash
npm run dev
```

Create an account, sign in, reload the page, confirm the session remains active, then log out.

## PR 5 - Component Migration

- Convert reusable UI components.
- Type props and children.
- Keep visual behavior unchanged.

Test locally:

```bash
npm run dev
```

Review layout, navbar, cards, loading, empty, error, and form states.

## PR 6 - Page Migration

- Convert Home, Event Details, Sign In, Sign Up, Create Event, and Not Found pages.
- Type form events and route params.
- Ensure existing routes still work.

Test locally:

```bash
npm run dev
```

Visit `/`, `/events/1`, `/signup`, `/signin`, `/create-event`, and `/not-found`.

## PR 7 - Event Deletion UI

- Add typed `DELETE /api/events/:id` API function.
- Add authenticated delete button.
- Add confirmation handling.
- Add loading and error states.
- Redirect after successful deletion.

Test locally:

```bash
npm run dev
```

Confirm logged-out users do not see delete controls. Confirm logged-in users can delete an event and are redirected to `/`.

## PR 8 - Final Cleanup

- Remove remaining implicit `any`.
- Fix build errors.
- Improve README.
- Run final tests.

Test locally:

```bash
npm run build
npm run lint
```

Review the app on mobile, tablet, and desktop viewport widths.
