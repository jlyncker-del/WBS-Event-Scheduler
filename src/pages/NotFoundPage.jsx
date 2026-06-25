import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div className="rounded-md border border-slate-200 bg-white p-8 text-center shadow-soft">
      <p className="text-sm font-semibold uppercase tracking-wide text-coral">404</p>
      <h1 className="mt-3 text-3xl font-bold text-ink">Page not found</h1>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600">
        The page you are looking for does not exist or has moved.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex rounded-md bg-ink px-4 py-2.5 text-sm font-semibold text-white"
      >
        Back to events
      </Link>
    </div>
  )
}

export default NotFoundPage
