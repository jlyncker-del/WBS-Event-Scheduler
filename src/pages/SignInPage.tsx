import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import FormInput from '../components/FormInput'
import { useAuth } from '../hooks/useAuth'

interface SignInFormValues {
  email: string
  password: string
}

function SignInPage() {
  const [values, setValues] = useState<SignInFormValues>({ email: '', password: '' })
  const [apiError, setApiError] = useState<unknown>(null)
  const [submitting, setSubmitting] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = location.state?.from?.pathname || '/'

  function updateField(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()

    if (!values.email.trim() || !values.password) {
      setApiError('Email and password are required.')
      return
    }

    try {
      setSubmitting(true)
      setApiError(null)
      await signIn({
        email: values.email.trim(),
        password: values.password,
      })
      navigate(redirectTo, { replace: true })
    } catch (err) {
      setApiError(err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-[calc(100vw-2rem)] rounded-md border border-lightGold bg-white p-5 shadow-soft sm:max-w-xl sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-gold">Welcome back</p>
      <h1 className="mt-3 text-3xl font-bold text-mainGreen">Sign in</h1>
      {location.state?.message ? (
        <div className="mt-4 rounded-md border border-lightGold bg-goldCream px-4 py-3 text-sm text-mainGreen">
          {location.state.message}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <FormInput
          id="email"
          name="email"
          type="email"
          label="Email"
          value={values.email}
          onChange={updateField}
          autoComplete="email"
        />
        <FormInput
          id="password"
          name="password"
          type="password"
          label="Password"
          value={values.password}
          onChange={updateField}
          autoComplete="current-password"
        />

        <ErrorMessage error={apiError} title="Sign in failed" />

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-md bg-mainGreen px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-accentGreen disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? 'Signing in...' : 'Sign in'}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-secondary">
        Need an account?{' '}
        <Link to="/signup" className="font-semibold text-mainGreen underline decoration-gold underline-offset-4">
          Sign up
        </Link>
      </p>
    </div>
  )
}

export default SignInPage
