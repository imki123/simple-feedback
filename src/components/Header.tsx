import { Link, useNavigate } from 'react-router-dom'
import { routes } from '../main'

export function Header({
  backPath,
  hasBack,
  title = 'Simple Feedback System',
}: {
  backPath?: string
  hasBack?: boolean
  title?: string
}) {
  const navigate = useNavigate()
  return (
    <header>
      <div className="flex items-center gap-4">
        {hasBack && !backPath && (
          // 뒤로가기 버튼
          <a href={routes.root} onClick={() => navigate(-1)}>
            {'<'}
          </a>
        )}

        {backPath && (
          // 특정 경로로 이동하는 뒤로가기 버튼
          <Link to={backPath} className="text-3xl">
            {'<'}
          </Link>
        )}

        <h1 className="text-3xl font-bold">{title}</h1>
      </div>
    </header>
  )
}
