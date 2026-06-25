import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signUp } from '../api/auth'
import ErrorMessage from '../components/ErrorMessage'
import FormInput from '../components/FormInput'

const initialValues = {
  name: '',
  email: '',
  password: '',
}

function validate(values) {
  const errors = {}

  if (values.name.trim() && values.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters.'
  }

  if (!values.email.includes('@')) {
    errors.email = 'Enter a valid email address.'
  }

  if (values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters.'
  }

  return errors
}

function SignUpPage() {
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

    try {
      setSubmitting(true)
      setApiError(null)
      await signUp({
        name: values.name.trim() || undefined,
        email: values.email.trim(),
        password: values.password,
      })
      navigate('/signin', {
        state: { message: 'Account created. Sign in with your new credentials.' },
      })
    } catch (err) {
      setApiError(err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-xl rounded-md border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-meadow">Create account</p>
      <h1 className="mt-3 text-3xl font-bold text-ink">Sign up</h1>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        Create an account so you can sign in and publish events.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <FormInput
          id="name"
          name="name"
          label="Name"
          value={values.name}
          onChange={updateField}
          error={errors.name}
          autoComplete="name"
          hint="Optional."
        />
        <FormInput
          id="email"
          name="email"
          type="email"
          label="Email"
          value={values.email}
          onChange={updateField}
          error={errors.email}
          autoComplete="email"
        />
        <FormInput
          id="password"
          name="password"
          type="password"
          label="Password"
          value={values.password}
          onChange={updateField}
          error={errors.password}
          autoComplete="new-password"
        />

        <ErrorMessage error={apiError} title="Could not create account" />

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-md bg-meadow px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-meadow/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? 'Creating account...' : 'Create account'}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-slate-600">
        Already have an account?{' '}
        <Link to="/signin" className="font-semibold text-meadow">
          Sign in
        </Link>
      </p>
    </div>
  )
}

export default SignUpPage
