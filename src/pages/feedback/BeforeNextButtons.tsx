import { Link } from 'react-router-dom'
import { UserType } from '../../apis/users'
import { routes } from '../../main'

export function BeforeNextButtons({
  users,
  userId,
  setMoundFlagFalse,
}: {
  users: UserType[]
  userId: number
  setMoundFlagFalse: () => void
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
        className="left:0 fixed bottom-2 z-10 transform whitespace-nowrap rounded bg-blue-300 px-4 py-2 sm:left-[calc(50%-300px)] sm:translate-x-[-50%]"
        onClick={() => setMoundFlagFalse()}
      >
        이전
      </Link>
      <Link
        to={`${routes.feedback}/?userId=${nextUser.id}`}
        className="fixed bottom-2 right-0 z-10 transform whitespace-nowrap rounded bg-blue-300 px-4 py-2 sm:right-[calc(50%-300px)] sm:translate-x-[-50%]"
        onClick={() => setMoundFlagFalse()}
      >
        다음
      </Link>
    </>
  )
}
