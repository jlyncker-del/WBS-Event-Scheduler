import { useState } from 'react'
import { ArrowLeft, Calendar, MapPin, Trash2 } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { deleteEvent } from '../api/events'
import ErrorMessage from '../components/ErrorMessage'
import LoadingState from '../components/LoadingState'
import { useAuth } from '../hooks/useAuth'
import { useEvent } from '../hooks/useEvents'
import { formatEventDate } from '../utils/eventMapping'

function hasStatus(error: unknown, status: number): boolean {
  return typeof error === 'object' && error !== null && 'status' in error && error.status === status
}

function EventDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const { isAuthenticated } = useAuth()
  const [deleteError, setDeleteError] = useState<unknown>(null)
  const [deleting, setDeleting] = useState(false)
  const hasInvalidId = !id || !/^\d+$/.test(id)
  const { event, loading, error } = useEvent(hasInvalidId ? null : id)

  async function handleDelete(): Promise<void> {
    if (!id || deleting) {
      return
    }

    const confirmed = window.confirm('Delete this event permanently?')

    if (!confirmed) {
      return
    }

    try {
      setDeleting(true)
      setDeleteError(null)
      await deleteEvent(id)
      window.location.assign('/')
    } catch (err: unknown) {
      setDeleteError(err)
    } finally {
      setDeleting(false)
    }
  }

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

  if (hasStatus(error, 404) || (!error && !event)) {
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

  if (!event) {
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

  return (
    <article className="rounded-md border border-lightGold bg-white p-6 shadow-soft sm:p-8">
      <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-mainGreen underline decoration-gold underline-offset-4">
        <ArrowLeft aria-hidden="true" size={16} />
        Back to events
      </Link>

      {isAuthenticated ? (
        <div className="mt-6 rounded-md border border-lightGold bg-goldCream p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-mainGreen">
              You are signed in and can delete this event.
            </p>
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-mainGreen px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-accentGreen disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Trash2 aria-hidden="true" size={16} />
              {deleting ? 'Deleting...' : 'Delete event'}
            </button>
          </div>
          <div className="mt-3">
            <ErrorMessage error={deleteError} title="Could not delete event" />
          </div>
        </div>
      ) : null}

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
