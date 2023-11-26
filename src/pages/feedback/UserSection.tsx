import { UserType } from '../../apis/users'

export function UserSection({ user }: { user: UserType }) {
  return (
    <div>
      <h2 className="text-2xl font-bold">유저정보</h2>
      <ul className="list-disc pl-5">
        <li>
          이름:{' '}
          <span className="rounded-lg bg-yellow-200 px-2 py-1 font-bold text-yellow-800">
            {user.name}
          </span>
        </li>
        <li>이메일: {user.email}</li>
        <li>팀: {user.team}</li>
        <li>직무: {user.job}</li>
      </ul>
    </div>
  )
}
