import { ArrowLeft, Calendar, MapPin } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import LoadingState from '../components/LoadingState'
import { useEvent } from '../hooks/useEvents'
import { formatEventDate } from '../utils/eventMapping'

function EventDetailsPage() {
  const { id } = useParams()
  const hasInvalidId = !id || !/^\d+$/.test(id)
  const { event, loading, error } = useEvent(hasInvalidId ? null : id)

  if (hasInvalidId) {
    return (
      <div className="rounded-md border border-lightGold bg-white p-8 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-wide text-gold">Invalid ID</p>
        <h1 className="mt-3 text-3xl font-bold text-mainGreen">This event link is not valid.</h1>
        <Link to="/" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-mainGreen underline decoration-gold underline-offset-4">
          <ArrowLeft aria-hidden="true" size={16} />
          Back to events
        </Link>
      </div>
    )
  }

  if (loading) {
    return <LoadingState label="Loading event details..." />
  }

  if (error?.status === 404 || (!error && !event)) {
    return (
      <div className="rounded-md border border-lightGold bg-white p-8 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-wide text-gold">Not found</p>
        <h1 className="mt-3 text-3xl font-bold text-mainGreen">This event could not be found.</h1>
        <Link to="/" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-mainGreen underline decoration-gold underline-offset-4">
          <ArrowLeft aria-hidden="true" size={16} />
          Back to events
        </Link>
      </div>
    )
  }

  if (error) {
    return <ErrorMessage error={error} title="Could not load event" />
  }

  return (
    <article className="rounded-md border border-lightGold bg-white p-6 shadow-soft sm:p-8">
      <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-mainGreen underline decoration-gold underline-offset-4">
        <ArrowLeft aria-hidden="true" size={16} />
        Back to events
      </Link>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-gold">Event details</p>
          <h1 className="mt-3 text-3xl font-bold text-mainGreen sm:text-5xl">{event.title}</h1>
          {event.description ? (
            <p className="mt-5 whitespace-pre-line text-base leading-8 text-secondary">
              {event.description}
            </p>
          ) : (
            <p className="mt-5 text-base leading-8 text-secondary">
              No description was provided for this event.
            </p>
          )}
        </div>

        <aside className="rounded-md border border-lightGold bg-cream p-5">
          <h2 className="text-lg font-bold text-mainGreen">When and where</h2>
          <dl className="mt-5 space-y-5">
            <div>
              <dt className="flex items-center gap-2 text-sm font-semibold text-mainGreen">
                <Calendar aria-hidden="true" size={16} className="text-gold" />
                Date
              </dt>
              <dd className="mt-1 text-sm text-secondary">{formatEventDate(event.date)}</dd>
            </div>
            <div>
              <dt className="flex items-center gap-2 text-sm font-semibold text-mainGreen">
                <MapPin aria-hidden="true" size={16} className="text-gold" />
                Location
              </dt>
              <dd className="mt-1 text-sm text-secondary">{event.location}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </article>
  )
}

export default EventDetailsPage
