import { Link } from 'react-router-dom'
import { UserType } from '../../apis/users'
import { routes } from '../../main'

export function BeforeNextButtons({
  users,
  userId,
}: {
  users: UserType[]
  userId: number
}) {
  const currentUserIndex = users.findIndex((user) => user.id === userId)
  const beforeUser = users[currentUserIndex - 1]
    ? users[currentUserIndex - 1]
    : users[users.length - 1]
  const nextUser = users[currentUserIndex + 1]
    ? users[currentUserIndex + 1]
    : users[0]

  if (users.length === 0) {
    return null
  }

  return (
    <>
      <Link
        to={`${routes.feedback}/?userId=${beforeUser.id}`}
        className="fixed bottom-5 left-[calc(50%-300px)] z-10 translate-x-[-50%] transform whitespace-nowrap rounded bg-blue-300 px-4 py-2"
      >
        이전
      </Link>
      <Link
        to={`${routes.feedback}/?userId=${nextUser.id}`}
        className="fixed bottom-5 left-[calc(50%+300px)] z-10 translate-x-[-50%] transform whitespace-nowrap rounded bg-blue-300 px-4 py-2"
      >
        다음
      </Link>
    </>
  )
}
