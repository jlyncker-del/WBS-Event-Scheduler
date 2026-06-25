import { apiRequest } from './client'
import { normalizeEvent, normalizeEventCollection } from '../utils/eventMapping'

export async function listEvents() {
  const payload = await apiRequest('/api/events')
  return normalizeEventCollection(payload)
}

export async function getEventById(id) {
  const payload = await apiRequest(`/api/events/${encodeURIComponent(id)}`)
  return normalizeEvent(payload)
}

export async function createEvent(event) {
  const payload = await apiRequest('/api/events', {
    method: 'POST',
    auth: true,
    body: event,
  })

  return normalizeEvent(payload)
}
