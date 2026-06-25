function ErrorMessage({ error, title = 'Something went wrong' }) {
  const message = typeof error === 'string' ? error : error?.message

  if (!message) {
    return null
  }

  return (
<<<<<<< HEAD
    <div className="rounded-md border border-gold bg-goldCream px-4 py-3 text-sm text-mainGreen">
=======
    <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
>>>>>>> 66450274e42ff63bdebda6eb520bd02bf582bed5
      <p className="font-semibold">{title}</p>
      <p className="mt-1">{message}</p>
    </div>
  )
}

export default ErrorMessage
