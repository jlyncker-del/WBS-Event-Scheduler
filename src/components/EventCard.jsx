import { Calendar, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatEventDate } from '../utils/eventMapping'

function EventCard({ event }) {
  return (
    <Link
      to={`/events/${event.id}`}
<<<<<<< HEAD
      className="flex h-full flex-col rounded-md border border-lightGold bg-white p-5 shadow-soft"
    >
      <div className="flex flex-1 flex-col gap-4">
        <div>
          <p className="inline-flex rounded-md border border-lightGold bg-goldCream px-2.5 py-1 text-xs font-semibold text-mainGreen">
            Upcoming
          </p>
          <h2 className="mt-3 text-xl font-bold text-mainGreen">
=======
      className="group flex h-full flex-col rounded-md border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-meadow/40 hover:shadow-soft"
    >
      <div className="flex flex-1 flex-col gap-4">
        <div>
          <p className="inline-flex rounded-md bg-meadow/10 px-2.5 py-1 text-xs font-semibold text-meadow">
            Upcoming
          </p>
          <h2 className="mt-3 text-xl font-bold text-ink group-hover:text-meadow">
>>>>>>> 66450274e42ff63bdebda6eb520bd02bf582bed5
            {event.title}
          </h2>
        </div>

<<<<<<< HEAD
        <div className="space-y-2 text-sm text-secondary">
          <p className="flex items-start gap-2">
            <Calendar aria-hidden="true" className="mt-0.5 shrink-0 text-gold" size={16} />
            <span>{formatEventDate(event.date)}</span>
          </p>
          <p className="flex items-start gap-2">
            <MapPin aria-hidden="true" className="mt-0.5 shrink-0 text-gold" size={16} />
=======
        <div className="space-y-2 text-sm text-slate-600">
          <p className="flex items-start gap-2">
            <Calendar aria-hidden="true" className="mt-0.5 shrink-0 text-coral" size={16} />
            <span>{formatEventDate(event.date)}</span>
          </p>
          <p className="flex items-start gap-2">
            <MapPin aria-hidden="true" className="mt-0.5 shrink-0 text-meadow" size={16} />
>>>>>>> 66450274e42ff63bdebda6eb520bd02bf582bed5
            <span>{event.location}</span>
          </p>
        </div>

        {event.description ? (
<<<<<<< HEAD
          <p className="line-clamp-3 text-sm leading-6 text-secondary">{event.description}</p>
=======
          <p className="line-clamp-3 text-sm leading-6 text-slate-600">{event.description}</p>
>>>>>>> 66450274e42ff63bdebda6eb520bd02bf582bed5
        ) : null}
      </div>
    </Link>
  )
}

export default EventCard
