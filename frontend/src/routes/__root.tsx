import {createRootRoute, Link, Outlet} from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="flex gap-2 max-w-2xl mx-auto p-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
        <Link to="/expenses" className="[&.active]:font-bold">Expenses</Link>
        <Link to="/create-expense" className="[&.active]:font-bold">Create expense</Link>
      </div>
      <hr/>
      <div className="gap-2 max-w-2xl mx-auto p-2">
        <Outlet/>
      </div>
    </>
  ),
})
