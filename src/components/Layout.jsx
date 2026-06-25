import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

function Layout() {
  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-cream">
=======
    <div className="min-h-screen">
>>>>>>> 66450274e42ff63bdebda6eb520bd02bf582bed5
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
