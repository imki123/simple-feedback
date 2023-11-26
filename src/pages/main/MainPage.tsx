import { Link } from 'react-router-dom'
import { routes } from '../../main'
import { round, toFixed } from '../../utils'
import { Header } from '../../components/Header'
import { useEffect, useRef, useState } from 'react'
import { UserType, getUsers } from '../../apis/users'

export function MainPage() {
  const [users, setUsers] = useState<UserType[]>([])
  const mountFlagRef = useRef(false)

  useEffect(() => {
    async function fetchUsers() {
      const users = await getUsers()
      setUsers(users)
      mountFlagRef.current = true
    }
    fetchUsers()
  })

  if (mountFlagRef.current === false) {
    return (
      <>
        <Header title="Simple Feedback System" />
        Loading...
      </>
    )
  }

  return (
    <>
      <Header />

      <main className="py-5">
        <ul className="list-disc pl-5">
          {users.map((user) => (
            <li key={user.id}>
              <Link to={`${routes.feedback}/?userId=${user.id}`}>
                {user.name} ({user.email}) / 평균점수: {toFixed(round(3.0))} (
                {5}개) / 피드백: {3}개
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}
