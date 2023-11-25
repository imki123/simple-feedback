import { Link } from 'react-router-dom'
import { routes } from '../routes'

export function MainPage() {
  return (
    <>
      <div>Hello, simple feedback system!</div>
      <Link to={routes.feedback}>feedback page</Link>
    </>
  )
}
