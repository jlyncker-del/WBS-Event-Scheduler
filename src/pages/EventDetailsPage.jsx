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
      <div className="rounded-md border border-slate-200 bg-white p-8 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-wide text-coral">Invalid ID</p>
        <h1 className="mt-3 text-3xl font-bold text-ink">This event link is not valid.</h1>
        <Link to="/" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-meadow">
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
      <div className="rounded-md border border-slate-200 bg-white p-8 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-wide text-coral">Not found</p>
        <h1 className="mt-3 text-3xl font-bold text-ink">This event could not be found.</h1>
        <Link to="/" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-meadow">
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
    <article className="rounded-md border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
      <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-meadow">
        <ArrowLeft aria-hidden="true" size={16} />
        Back to events
      </Link>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-meadow">Event details</p>
          <h1 className="mt-3 text-3xl font-bold text-ink sm:text-5xl">{event.title}</h1>
          {event.description ? (
            <p className="mt-5 whitespace-pre-line text-base leading-8 text-slate-600">
              {event.description}
            </p>
          ) : (
            <p className="mt-5 text-base leading-8 text-slate-600">
              No description was provided for this event.
            </p>
          )}
        </div>

        <aside className="rounded-md border border-slate-200 bg-mist p-5">
          <h2 className="text-lg font-bold text-ink">When and where</h2>
          <dl className="mt-5 space-y-5">
            <div>
              <dt className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Calendar aria-hidden="true" size={16} className="text-coral" />
                Date
              </dt>
              <dd className="mt-1 text-sm text-slate-600">{formatEventDate(event.date)}</dd>
            </div>
            <div>
              <dt className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <MapPin aria-hidden="true" size={16} className="text-meadow" />
                Location
              </dt>
              <dd className="mt-1 text-sm text-slate-600">{event.location}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </article>
  )
}

export default EventDetailsPage
