function ErrorMessage({ error, title = 'Something went wrong' }) {
  const message = typeof error === 'string' ? error : error?.message

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
