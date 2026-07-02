interface LoadingStateProps {
  label?: string
}

function LoadingState({ label = 'Loading...' }: LoadingStateProps) {
  return (
    <div className="flex items-center justify-center rounded-md border border-lightGold bg-white p-10 text-secondary shadow-soft">
      <div className="mr-3 h-5 w-5 animate-spin rounded-full border-2 border-lightGold border-t-gold" />
      <p className="text-sm font-medium">{label}</p>
    </div>
  )
}

export default LoadingState
