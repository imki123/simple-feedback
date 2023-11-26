import { useSearchParams } from 'react-router-dom'
import { UserType, getUser } from '../../apis/users'
import { Header } from '../../components/Header'
import { routes } from '../../main'
import { useEffect, useRef, useState } from 'react'
import { QuestionType, getQuestions } from '../../apis/questions'
import { FeedbackType, getFeedbacks } from '../../apis/feedbacks'
import {
  QuestionAnswerType,
  getQuestionAnswersByUser,
} from '../../apis/questionAnswers'
import { round, toFixed } from '../../utils'
import { UserSection } from './UserSection'

export function FeedbackPage() {
  const [searchParams] = useSearchParams()
  const userId = Number(searchParams.get('userId'))
  const mountFlagRef = useRef(false)

  // high priority data
  const [user, setUser] = useState<UserType | undefined | null>(undefined)
  const [questions, setQuestions] = useState<QuestionType[]>([])
  const [feedbacks, setFeedbacks] = useState<FeedbackType[]>([])

  // lazy data
  const [questionAnswers, setQuestionAnswers] = useState<QuestionAnswerType[]>(
    [],
  )

  useEffect(() => {
    async function fetchAllData() {
      // lazy data
      getQuestionAnswersByUser(userId).then(setQuestionAnswers)

      // high priority data
      const allData = await Promise.all([
        getUser(userId),
        getQuestions(),
        getFeedbacks(),
      ])
      setUser(allData[0])
      setQuestions(allData[1])
      setFeedbacks(allData[2])
      mountFlagRef.current = true
    }
    fetchAllData()
  }, [])

  if (mountFlagRef.current === false) {
    return <Header backPath={routes.root} title="Loading..." />
  }

  if (!user) {
    return (
      <>
        <Header backPath={routes.root} title="Not Found User" />
        <h1>존재하지 않는 사용자입니다.</h1>
      </>
    )
  }

  const QuestionAnswersList = () => {
    return (
      <ol className="list-decimal pl-5">
        {questions.map((question) => {
          // 설문 문항 별 평균점수, 개수 구하기
          const questionAnswersById = questionAnswers.filter(
            (answer) => answer.questionId === question.id,
          )
          let summary = <span></span>
          if (questionAnswersById.length !== 0) {
            const sumScore = questionAnswersById.reduce((acc, cur) => {
              return acc + cur.score
            }, 0)
            const averageScore = toFixed(
              round(sumScore / questionAnswersById.length),
            )
            summary = (
              <span>
                <span className="bg-green-200 py-1 px-2 rounded-lg font-bold text-green-800">
                  {averageScore}점
                </span>{' '}
                ({questionAnswersById.length}개)
              </span>
            )
          }

          return (
            <li key={question.id}>
              <div>
                <strong>{question.content}</strong> {summary}
                <form
                  className="flex gap-4 items-center"
                  onSubmit={(e) => {
                    e.preventDefault()
                    alert('점수를 저장했습니다.')
                  }}
                >
                  <ul className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((score) => (
                      <li key={score}>
                        <label className="cursor-pointer hover:opacity-60 px-2 py-1 bg-green-200 rounded-lg">
                          <input
                            type="radio"
                            name={`question_${question.id}`}
                          />
                          {` `}
                          {score}점
                        </label>
                      </li>
                    ))}
                  </ul>
                  <button className="bg-blue-200 px-2 py-1 rounded-lg">
                    내 점수 저장
                  </button>
                </form>
              </div>
            </li>
          )
        })}
      </ol>
    )
  }

  return (
    <>
      <Header backPath={routes.root} title={`${user.name} 피드백`} />

      <main className="py-5 flex flex-col gap-6">
        <UserSection user={user} />

        <div>
          <h2 className="text-2xl font-bold">
            설문{' '}
            <span className="font-normal text-base">
              1점(매우 그렇지 않다.) ~ 5점(매우 그렇다.)
            </span>
          </h2>
          <QuestionAnswersList />
        </div>

        <div>
          <h2 className="text-2xl font-bold">피드백</h2>
          <ul className="list-disc pl-5">
            {feedbacks.map((feedback) => (
              <li key={feedback.id}>{feedback.comment}</li>
            ))}
          </ul>
        </div>
      </main>
    </>
  )
}
