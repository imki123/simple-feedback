import { Link } from 'react-router-dom'
import { routes } from '../../main'
import { round, toFixed } from '../../utils'
import { Header } from '../../components/Header'
import { useEffect, useState } from 'react'
import { UserType, getUsers } from '../../apis/users'
import { FeedbackType, getFeedbacks } from '../../apis/feedbacks'
import {
  QuestionAnswerType,
  getQuestionAnswers,
} from '../../apis/questionAnswers'

export function MainPage() {
  const [users, setUsers] = useState<UserType[]>([])
  const [questionAnswers, setQuestionAnswers] = useState<QuestionAnswerType[]>(
    [],
  )
  const [feedbacks, setFeedbacks] = useState<FeedbackType[]>([])
  const [mountFlag, setMountFlag] = useState(false)

  useEffect(() => {
    async function fetchAllData() {
      setMountFlag(false)

      // high priority data
      const allData = await Promise.all([
        getUsers(),
        getQuestionAnswers(),
        getFeedbacks(),
      ])
      setUsers(allData[0])
      setQuestionAnswers(allData[1])
      setFeedbacks(allData[2])
      setMountFlag(true)
    }
    fetchAllData()
  }, [])

  if (!mountFlag) {
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
        <ul className="list-disc pl-5 text-lg">
          {users.map((user) => {
            const questionAnswersByUser = questionAnswers.filter(
              (questionAnswer) => questionAnswer.userId === user.id,
            )
            const sumScoreByUser = questionAnswersByUser.reduce((acc, cur) => {
              return acc + cur.score
            }, 0)
            const averageScoreByUser =
              questionAnswersByUser.length > 0
                ? toFixed(round(sumScoreByUser / questionAnswersByUser.length))
                : '-'
            const feedbacksByUser = feedbacks.filter(
              (feedback) => feedback.userId === user.id,
            )

            return (
              <li key={user.id}>
                <Link to={`${routes.feedback}/?userId=${user.id}`}>
                  {user.name} ({user.email}) / 평균점수: {averageScoreByUser} (
                  {questionAnswersByUser.length}개) / 피드백:{' '}
                  {feedbacksByUser.length}개
                </Link>
              </li>
            )
          })}
        </ul>
      </main>
    </>
  )
}
