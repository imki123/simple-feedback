import { useSearchParams } from 'react-router-dom'
import { UserType, getUser, getUsers } from '../../apis/users'
import { Header } from '../../components/Header'
import { routes } from '../../main'
import { useEffect, useState } from 'react'
import { QuestionType, getQuestions } from '../../apis/questions'
import { FeedbackType, getFeedbacks } from '../../apis/feedbacks'
import {
  QuestionAnswerType,
  getQuestionAnswersByUser,
} from '../../apis/questionAnswers'
import { UserSection } from './UserSection'
import { QuestionSection } from './QuestionSection'
import { FeedbackSection } from './FeedbackSection'
import { BeforeNextButtons } from './BeforeNextButtons'

export function FeedbackPage() {
  const [searchParams] = useSearchParams()
  const userId = Number(searchParams.get('userId'))
  const [mountFlag, setMountFlag] = useState(false)

  // high priority data
  const [user, setUser] = useState<UserType | undefined | null>(undefined)
  const [questions, setQuestions] = useState<QuestionType[]>([])
  const [feedbacks, setFeedbacks] = useState<FeedbackType[]>([])

  // lazy data
  const [questionAnswers, setQuestionAnswers] = useState<QuestionAnswerType[]>(
    [],
  )
  const [users, setUsers] = useState<UserType[]>([])

  useEffect(() => {
    async function fetchAllData() {
      setMountFlag(false)
      // lazy data
      getQuestionAnswersByUser(userId).then(setQuestionAnswers)
      getUsers().then(setUsers)

      // high priority data
      const allData = await Promise.all([
        getUser(userId),
        getQuestions(),
        getFeedbacks(),
      ])
      setUser(allData[0])
      setQuestions(allData[1])
      setFeedbacks(allData[2])
      setMountFlag(true)
    }
    fetchAllData()
  }, [searchParams])

  if (mountFlag === false) {
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

  return (
    <>
      <Header backPath={routes.root} title={`${user.name} 피드백`} />

      <main className="flex flex-col gap-6 px-2 py-5 pb-14">
        <UserSection user={user} />

        <QuestionSection
          questions={questions}
          questionAnswers={questionAnswers}
        />

        <FeedbackSection feedbacks={feedbacks} userId={userId} />
      </main>

      <BeforeNextButtons
        users={users}
        userId={userId}
        setMoundFlagFalse={() => setMountFlag(false)}
      />
    </>
  )
}
