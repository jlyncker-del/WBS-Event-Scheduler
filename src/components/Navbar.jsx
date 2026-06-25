import { CalendarDays, LogIn, LogOut, Plus, UserPlus } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const navLinkClass = ({ isActive }) =>
  [
    'inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition',
    isActive
<<<<<<< HEAD
      ? 'bg-gold text-darkGreen'
      : 'text-white/80 hover:bg-white/10 hover:text-white',
=======
      ? 'bg-ink text-white'
      : 'text-slate-700 hover:bg-white hover:text-ink hover:shadow-sm',
>>>>>>> 66450274e42ff63bdebda6eb520bd02bf582bed5
  ].join(' ')

function Navbar() {
  const { isAuthenticated, signOut } = useAuth()
  const navigate = useNavigate()

  function handleSignOut() {
    signOut()
    navigate('/')
  }

  return (
<<<<<<< HEAD
    <header className="border-b border-lightGold/50 bg-[linear-gradient(125deg,#0B2C26,#123D34,#174F43)] text-white">
      <nav className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <NavLink to="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-md border border-lightGold/60 bg-gold text-darkGreen">
=======
    <header className="border-b border-slate-200/80 bg-white/85 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <NavLink to="/" className="flex items-center gap-3 text-ink">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-meadow text-white shadow-soft">
>>>>>>> 66450274e42ff63bdebda6eb520bd02bf582bed5
            <CalendarDays aria-hidden="true" size={22} />
          </span>
          <span>
            <span className="block text-base font-bold">Event Scheduler</span>
<<<<<<< HEAD
            <span className="block text-xs font-medium text-white/70">
=======
            <span className="block text-xs font-medium text-slate-500">
>>>>>>> 66450274e42ff63bdebda6eb520bd02bf582bed5
              Browse and plan local events
            </span>
          </span>
        </NavLink>

        <div className="flex flex-wrap items-center gap-2">
          <NavLink to="/" className={navLinkClass}>
            Events
          </NavLink>
          {isAuthenticated ? (
            <>
              <NavLink to="/create-event" className={navLinkClass}>
                <Plus aria-hidden="true" size={16} />
                Create
              </NavLink>
              <button
                type="button"
                onClick={handleSignOut}
<<<<<<< HEAD
                className="inline-flex items-center gap-2 rounded-md border border-lightGold/60 bg-white/10 px-3 py-2 text-sm font-medium text-white transition hover:bg-white/15"
=======
                className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-coral hover:text-coral"
>>>>>>> 66450274e42ff63bdebda6eb520bd02bf582bed5
              >
                <LogOut aria-hidden="true" size={16} />
                Sign out
              </button>
            </>
          ) : (
            <>
              <NavLink to="/signin" className={navLinkClass}>
                <LogIn aria-hidden="true" size={16} />
                Sign in
              </NavLink>
              <NavLink to="/signup" className={navLinkClass}>
                <UserPlus aria-hidden="true" size={16} />
                Sign up
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
