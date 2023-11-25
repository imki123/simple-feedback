import { Link } from 'react-router-dom'
import { routes } from '../../main'
import { toFixed1 } from '../../utils'

export function MainPage() {
  const users = [
    {
      id: 1,
      name: 'Hoodie',
      email: 'hoodie@haechi.io',
      averageScore: 3.2,
      scoreCount: 5,
      feedbackCount: 1,
    },
    {
      id: 2,
      name: 'Hoodie2',
      email: 'hoodie2@haechi.io',
      averageScore: 1.0,
      scoreCount: 100,
      feedbackCount: 50,
    },
  ]

  return (
    <>
      <header>
        <div className="flex items-center">
          <div>Simple Feedback System</div>
        </div>
      </header>

      <main>
        <ul className="list-disc pl-5">
          {users.map((user) => (
            <li key={user.id}>
              <Link to={`${routes.feedback}/?userId=${user.id}`}>
                {user.name} ({user.email}) / 평균점수:{' '}
                {toFixed1(user.averageScore)} ({user.scoreCount}개) / 피드백:{' '}
                {user.feedbackCount}개
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}
