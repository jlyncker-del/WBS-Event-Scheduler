interface ErrorMessageProps {
  error: unknown
  title?: string
}

function getErrorMessage(error: unknown): string | null {
  if (typeof error === 'string') {
    return error
  }

  if (error instanceof Error) {
    return error.message
  }

  return null
}

function ErrorMessage({ error, title = 'Something went wrong' }: ErrorMessageProps) {
  const message = getErrorMessage(error)

  if (!message) {
    return null
  }

  return (
    <div className="rounded-md border border-gold bg-goldCream px-4 py-3 text-sm text-mainGreen">
      <p className="font-semibold">{title}</p>
      <p className="mt-1">{message}</p>
    </div>
  )
}

export default ErrorMessage
