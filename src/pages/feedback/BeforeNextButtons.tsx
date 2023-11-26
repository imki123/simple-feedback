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
      <Link to={`${routes.feedback}/?userId=${beforeUser.id}`}>이전 유저</Link>
      <Link to={`${routes.feedback}/?userId=${nextUser.id}`}>다음 유저</Link>
    </>
  )
}
