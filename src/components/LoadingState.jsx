function LoadingState({ label = 'Loading...' }) {
  return (
    <div className="flex items-center justify-center rounded-md border border-slate-200 bg-white p-10 text-slate-600 shadow-soft">
      <div className="mr-3 h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-meadow" />
      <p className="text-sm font-medium">{label}</p>
    </div>
  )
}

export default LoadingState
