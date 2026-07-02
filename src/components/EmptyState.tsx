import { CalendarX } from 'lucide-react'

interface EmptyStateProps {
  title?: string
  message?: string
}

function EmptyState({
  title = 'No events found',
  message = 'There are no events to show yet.',
}: EmptyStateProps) {
  return (
    <div className="rounded-md border border-dashed border-lightGold bg-white p-10 text-center shadow-soft">
      <CalendarX aria-hidden="true" className="mx-auto text-gold" size={36} />
      <h2 className="mt-4 text-lg font-semibold text-mainGreen">{title}</h2>
      <p className="mt-2 text-sm text-secondary">{message}</p>
    </div>
  )
}

export default EmptyState
