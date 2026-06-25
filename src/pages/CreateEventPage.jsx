import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createEvent } from '../api/events'
import ErrorMessage from '../components/ErrorMessage'
import FormInput from '../components/FormInput'

const initialValues = {
  title: '',
  date: '',
  location: '',
  description: '',
}

function validate(values) {
  const errors = {}

  if (!values.title.trim()) {
    errors.title = 'Title is required.'
  }

  if (!values.date) {
    errors.date = 'Date and time are required.'
  }

  if (!values.location.trim()) {
    errors.location = 'Location is required.'
  }

  return errors
}

function CreateEventPage() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  function updateField(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    const payload = {
      title: values.title.trim(),
      date: new Date(values.date).toISOString(),
      location: values.location.trim(),
      description: values.description.trim(),
    }

    try {
      setSubmitting(true)
      setApiError(null)
      const createdEvent = await createEvent(payload)

      if (createdEvent?.id) {
        navigate(`/events/${createdEvent.id}`)
      } else {
        navigate('/')
      }
    } catch (err) {
      setApiError(err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
<<<<<<< HEAD
    <div className="mx-auto w-full max-w-[calc(100vw-2rem)] rounded-md border border-lightGold bg-white p-5 shadow-soft sm:max-w-2xl sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-gold">Protected</p>
      <h1 className="mt-3 text-3xl font-bold text-mainGreen">Create event</h1>
      <p className="mt-3 text-sm leading-6 text-secondary">
=======
    <div className="mx-auto max-w-2xl rounded-md border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-meadow">Protected</p>
      <h1 className="mt-3 text-3xl font-bold text-ink">Create event</h1>
      <p className="mt-3 text-sm leading-6 text-slate-600">
>>>>>>> 66450274e42ff63bdebda6eb520bd02bf582bed5
        Publish a new event to the local Events API. The request includes your stored authentication token.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <FormInput
          id="title"
          name="title"
          label="Title"
          value={values.title}
          onChange={updateField}
          error={errors.title}
          autoComplete="off"
        />
        <FormInput
          id="date"
          name="date"
          type="datetime-local"
          label="Date and time"
          value={values.date}
          onChange={updateField}
          error={errors.date}
        />
        <FormInput
          id="location"
          name="location"
          label="Location"
          value={values.location}
          onChange={updateField}
          error={errors.location}
          autoComplete="street-address"
        />
        <FormInput
          id="description"
          name="description"
          multiline
          label="Description"
          value={values.description}
          onChange={updateField}
          hint="Optional, but helpful for attendees."
        />

        <ErrorMessage error={apiError} title="Could not create event" />

        <button
          type="submit"
          disabled={submitting}
<<<<<<< HEAD
          className="w-full rounded-md bg-mainGreen px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-accentGreen disabled:cursor-not-allowed disabled:opacity-60"
=======
          className="w-full rounded-md bg-coral px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-coral/90 disabled:cursor-not-allowed disabled:opacity-60"
>>>>>>> 66450274e42ff63bdebda6eb520bd02bf582bed5
        >
          {submitting ? 'Creating event...' : 'Create event'}
        </button>
      </form>
    </div>
  )
}

export default CreateEventPage
