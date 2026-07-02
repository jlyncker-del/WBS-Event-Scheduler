import type { EventListResponse, EventRecord } from '../types/event'

type UnknownRecord = Record<string, unknown>

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function firstValue(source: UnknownRecord, keys: string[]): unknown {
  return keys.map((key) => source[key]).find((value) => value !== undefined && value !== null)
}

function unwrapEvent(payload: unknown): unknown {
  if (!payload || Array.isArray(payload) || !isRecord(payload)) {
    return payload
  }

  return payload.event || payload.data || payload.item || payload
}

function normalizeId(value: unknown): string | number | null {
  if (typeof value === 'string' || typeof value === 'number') {
    return value
  }

  return null
}

function normalizeString(value: unknown): string | null {
  if (typeof value === 'string') {
    return value
  }

  if (typeof value === 'number') {
    return String(value)
  }

  return null
}

function normalizeOptionalNumber(value: unknown): number | null | undefined {
  if (value === null) {
    return null
  }

  if (typeof value === 'number') {
    return value
  }

  return undefined
}

export function normalizeEvent(payload: unknown): EventRecord | null {
  const event = unwrapEvent(payload)

  if (!isRecord(event)) {
    return null
  }

  const rawDate = firstValue(event, ['date', 'startDate', 'startTime', 'startsAt', 'eventDate'])
  const title = firstValue(event, ['title', 'name', 'eventName']) || 'Untitled event'
  const id = normalizeId(firstValue(event, ['id', '_id', 'eventId']))

  if (id === null) {
    return null
  }

  return {
    ...event,
    id,
    title: normalizeString(title) ?? 'Untitled event',
    date: normalizeString(rawDate) ?? '',
    location:
      normalizeString(firstValue(event, ['location', 'venue', 'address', 'city'])) ||
      'Location to be announced',
    description:
      normalizeString(firstValue(event, ['description', 'details', 'body', 'shortDescription'])) ||
      '',
    latitude: normalizeOptionalNumber(event.latitude),
    longitude: normalizeOptionalNumber(event.longitude),
    organizerId: typeof event.organizerId === 'number' ? event.organizerId : undefined,
    createdAt: normalizeString(event.createdAt) ?? undefined,
    updatedAt: normalizeString(event.updatedAt) ?? undefined,
  }
}

function getEventArray(payload: unknown): unknown[] {
  if (Array.isArray(payload)) {
    return payload
  }

  if (!isRecord(payload)) {
    throw new Error('Unexpected events response shape: expected an array or response object.')
  }

  const response = payload as EventListResponse
  const collection = response.events || response.items || response.results

  if (Array.isArray(collection)) {
    return collection
  }

  if (Array.isArray(response.data)) {
    return response.data
  }

  throw new Error('Unexpected events response shape: no events array was found in the API response.')
}

export function normalizeEventCollection(payload: unknown): EventRecord[] {
  const events = Array.isArray(payload)
    ? payload
    : getEventArray(payload)

  return events
    .map(normalizeEvent)
    .filter((event): event is EventRecord => event !== null)
    .sort((a, b) => {
      const aTime = a.date ? new Date(a.date).getTime() : Number.MAX_SAFE_INTEGER
      const bTime = b.date ? new Date(b.date).getTime() : Number.MAX_SAFE_INTEGER
      return aTime - bTime
    })
}

export function formatEventDate(date?: string | null): string {
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
