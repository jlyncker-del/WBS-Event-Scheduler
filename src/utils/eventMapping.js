function firstValue(source, keys) {
  return keys.map((key) => source?.[key]).find((value) => value !== undefined && value !== null)
}

function unwrapEvent(payload) {
  if (!payload || Array.isArray(payload)) {
    return payload
  }

  return payload.event || payload.data || payload.item || payload
}

export function normalizeEvent(payload) {
  const event = unwrapEvent(payload)

  if (!event || typeof event !== 'object') {
    return null
  }

  const rawDate = firstValue(event, ['date', 'startDate', 'startTime', 'startsAt', 'eventDate'])
  const title = firstValue(event, ['title', 'name', 'eventName']) || 'Untitled event'

  return {
    ...event,
    id: firstValue(event, ['id', '_id', 'eventId']),
    title,
    date: rawDate,
    location:
      firstValue(event, ['location', 'venue', 'address', 'city']) || 'Location to be announced',
    description: firstValue(event, ['description', 'details', 'body', 'shortDescription']) || '',
  }
}

export function normalizeEventCollection(payload) {
  const events = Array.isArray(payload)
    ? payload
    : payload?.events || payload?.items || payload?.results || payload?.data || []

  return events
    .map(normalizeEvent)
    .filter((event) => event?.id !== undefined && event?.id !== null)
    .sort((a, b) => {
      const aTime = a.date ? new Date(a.date).getTime() : Number.MAX_SAFE_INTEGER
      const bTime = b.date ? new Date(b.date).getTime() : Number.MAX_SAFE_INTEGER
      return aTime - bTime
    })
}

export function formatEventDate(date) {
  if (!date) {
    return 'Date to be announced'
  }

  const parsed = new Date(date)

  if (Number.isNaN(parsed.getTime())) {
    return String(date)
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(parsed)
}
