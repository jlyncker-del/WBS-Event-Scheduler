import { CalendarX } from 'lucide-react'

function EmptyState({
  title = 'No events found',
  message = 'There are no events to show yet.',
}) {
  return (
<<<<<<< HEAD
    <div className="rounded-md border border-dashed border-lightGold bg-white p-10 text-center shadow-soft">
      <CalendarX aria-hidden="true" className="mx-auto text-gold" size={36} />
      <h2 className="mt-4 text-lg font-semibold text-mainGreen">{title}</h2>
      <p className="mt-2 text-sm text-secondary">{message}</p>
=======
    <div className="rounded-md border border-dashed border-slate-300 bg-white p-10 text-center shadow-soft">
      <CalendarX aria-hidden="true" className="mx-auto text-slate-400" size={36} />
      <h2 className="mt-4 text-lg font-semibold text-ink">{title}</h2>
      <p className="mt-2 text-sm text-slate-600">{message}</p>
>>>>>>> 66450274e42ff63bdebda6eb520bd02bf582bed5
    </div>
  )
}

export default EmptyState
