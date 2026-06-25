function LoadingState({ label = 'Loading...' }) {
  return (
<<<<<<< HEAD
    <div className="flex items-center justify-center rounded-md border border-lightGold bg-white p-10 text-secondary shadow-soft">
      <div className="mr-3 h-5 w-5 animate-spin rounded-full border-2 border-lightGold border-t-gold" />
=======
    <div className="flex items-center justify-center rounded-md border border-slate-200 bg-white p-10 text-slate-600 shadow-soft">
      <div className="mr-3 h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-meadow" />
>>>>>>> 66450274e42ff63bdebda6eb520bd02bf582bed5
      <p className="text-sm font-medium">{label}</p>
    </div>
  )
}

export default LoadingState
