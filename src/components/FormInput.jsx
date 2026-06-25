function FormInput({ id, label, hint, error, multiline = false, className = '', ...props }) {
  const inputClasses =
    'mt-2 w-full rounded-md border border-lightGold bg-white px-3 py-2 text-sm text-textGreen outline-none transition placeholder:text-secondary/70 focus:border-gold focus:ring-4 focus:ring-gold/20'

  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm font-semibold text-mainGreen">
        {label}
      </label>
      {multiline ? (
        <textarea id={id} className={`${inputClasses} min-h-32 resize-y`} {...props} />
      ) : (
        <input id={id} className={inputClasses} {...props} />
      )}
      {hint ? <p className="mt-1 text-xs text-secondary">{hint}</p> : null}
      {error ? <p className="mt-1 text-xs font-medium text-mainGreen">{error}</p> : null}
    </div>
  )
}

export default FormInput
