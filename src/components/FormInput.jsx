function FormInput({ id, label, hint, error, multiline = false, className = '', ...props }) {
  const inputClasses =
    'mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-ink outline-none transition placeholder:text-slate-400 focus:border-meadow focus:ring-4 focus:ring-meadow/10'

  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm font-semibold text-slate-800">
        {label}
      </label>
      {multiline ? (
        <textarea id={id} className={`${inputClasses} min-h-32 resize-y`} {...props} />
      ) : (
        <input id={id} className={inputClasses} {...props} />
      )}
      {hint ? <p className="mt-1 text-xs text-slate-500">{hint}</p> : null}
      {error ? <p className="mt-1 text-xs font-medium text-red-700">{error}</p> : null}
    </div>
  )
}

export default FormInput
