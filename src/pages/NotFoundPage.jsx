import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div className="rounded-md border border-lightGold bg-white p-8 text-center shadow-soft">
      <p className="text-sm font-semibold uppercase tracking-wide text-gold">404</p>
      <h1 className="mt-3 text-3xl font-bold text-mainGreen">Page not found</h1>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-secondary">
        The page you are looking for does not exist or has moved.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex rounded-md bg-mainGreen px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-accentGreen"
      >
        Back to events
      </Link>
    </div>
  )
}

export default NotFoundPage
