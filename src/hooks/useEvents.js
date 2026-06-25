import { useEffect, useState } from 'react'
import { getEventById, listEvents } from '../api/events'

export function useEvents() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let ignore = false

    async function loadEvents() {
      try {
        setLoading(true)
        setError(null)
        const data = await listEvents()

        if (!ignore) {
          setEvents(data)
        }
      } catch (err) {
        if (!ignore) {
          setError(err)
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    loadEvents()

    return () => {
      ignore = true
    }
  }, [])

  return { events, loading, error }
}

export function useEvent(id) {
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let ignore = false

    async function loadEvent() {
      if (!id) {
        setEvent(null)
        setError(null)
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)
        const data = await getEventById(id)

        if (!ignore) {
          setEvent(data)
        }
      } catch (err) {
        if (!ignore) {
          setError(err)
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    loadEvent()

    return () => {
      ignore = true
    }
  }, [id])

  return { event, loading, error }
}
