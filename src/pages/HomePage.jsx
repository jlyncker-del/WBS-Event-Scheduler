import { Link } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import ErrorMessage from '../components/ErrorMessage'
import EventCard from '../components/EventCard'
import LoadingState from '../components/LoadingState'
import { useAuth } from '../hooks/useAuth'
import { useEvents } from '../hooks/useEvents'

function HomePage() {
  const { events, loading, error } = useEvents()
  const { isAuthenticated } = useAuth()

  return (
    <div className="space-y-8">
<<<<<<< HEAD
      <section className="grid gap-6 rounded-md border border-lightGold bg-[linear-gradient(125deg,#0B2C26,#123D34,#174F43)] p-6 text-white shadow-soft md:grid-cols-[1.5fr_1fr] md:items-center md:p-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-lightGold">Local events</p>
          <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Find what is happening next.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/75">
=======
      <section className="grid gap-6 rounded-md border border-slate-200 bg-white p-6 shadow-soft md:grid-cols-[1.5fr_1fr] md:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-meadow">Local events</p>
          <h1 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
            Find what is happening next.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
>>>>>>> 66450274e42ff63bdebda6eb520bd02bf582bed5
            Browse events from the local REST API, open details, and create new listings after signing in.
          </p>
        </div>
        <div className="flex md:justify-end">
          <Link
            to={isAuthenticated ? '/create-event' : '/signin'}
<<<<<<< HEAD
            className="inline-flex items-center justify-center rounded-md bg-gold px-4 py-2.5 text-sm font-semibold text-darkGreen transition hover:bg-lightGold"
=======
            className="inline-flex items-center justify-center rounded-md bg-coral px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-coral/90"
>>>>>>> 66450274e42ff63bdebda6eb520bd02bf582bed5
          >
            {isAuthenticated ? 'Create event' : 'Sign in to create'}
          </Link>
        </div>
      </section>

      {loading ? <LoadingState label="Loading events..." /> : null}
      {error ? <ErrorMessage error={error} title="Could not load events" /> : null}
      {!loading && !error && events.length === 0 ? (
        <EmptyState message="Once the API returns events, they will appear here chronologically." />
      ) : null}
      {!loading && !error && events.length > 0 ? (
<<<<<<< HEAD
        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
=======
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
>>>>>>> 66450274e42ff63bdebda6eb520bd02bf582bed5
          {events.map((event) => (
            <EventCard key={event.id || `${event.title}-${event.date}`} event={event} />
          ))}
        </section>
      ) : null}
    </div>
  )
}

export default HomePage
