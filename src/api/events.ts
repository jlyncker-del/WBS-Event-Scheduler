import { apiRequest } from './client'
import { normalizeEvent, normalizeEventCollection } from '../utils/eventMapping'
import type { CreateEventInput, EventRecord } from '../types/event'

export async function listEvents(): Promise<EventRecord[]> {
  const payload = await apiRequest<unknown>('/api/events?limit=100')
  return normalizeEventCollection(payload)
}

export async function getEventById(id: string): Promise<EventRecord | null> {
  const payload = await apiRequest<unknown>(`/api/events/${encodeURIComponent(id)}`)
  return normalizeEvent(payload)
}

export async function createEvent(event: CreateEventInput): Promise<EventRecord | null> {
  const payload = await apiRequest<unknown, CreateEventInput>('/api/events', {
    method: 'POST',
    auth: true,
    body: event,
  })

  return normalizeEvent(payload)
}

export async function deleteEvent(id: string): Promise<void> {
  await apiRequest<null>(`/api/events/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    auth: true,
  })
}
