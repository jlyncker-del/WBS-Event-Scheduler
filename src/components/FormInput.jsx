function FormInput({ id, label, hint, error, multiline = false, className = '', ...props }) {
  const inputClasses =
<<<<<<< HEAD
    'mt-2 w-full rounded-md border border-lightGold bg-white px-3 py-2 text-sm text-textGreen outline-none transition placeholder:text-secondary/70 focus:border-gold focus:ring-4 focus:ring-gold/20'

  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm font-semibold text-mainGreen">
=======
    'mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-ink outline-none transition placeholder:text-slate-400 focus:border-meadow focus:ring-4 focus:ring-meadow/10'

  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm font-semibold text-slate-800">
>>>>>>> 66450274e42ff63bdebda6eb520bd02bf582bed5
        {label}
      </label>
      {multiline ? (
        <textarea id={id} className={`${inputClasses} min-h-32 resize-y`} {...props} />
      ) : (
        <input id={id} className={inputClasses} {...props} />
      )}
<<<<<<< HEAD
      {hint ? <p className="mt-1 text-xs text-secondary">{hint}</p> : null}
      {error ? <p className="mt-1 text-xs font-medium text-mainGreen">{error}</p> : null}
=======
      {hint ? <p className="mt-1 text-xs text-slate-500">{hint}</p> : null}
      {error ? <p className="mt-1 text-xs font-medium text-red-700">{error}</p> : null}
>>>>>>> 66450274e42ff63bdebda6eb520bd02bf582bed5
    </div>
  )
}

export default FormInput
