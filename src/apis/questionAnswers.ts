export type QuestionAnswerType = {
  id: number
  userId: number
  questionId: number
  answerUserId: number
  score: number
}

const questionAnswers: QuestionAnswerType[] = [
  {
    id: 1,
    userId: 1,
    questionId: 1,
    answerUserId: 1,
    score: 3,
  },
  {
    id: 1,
    userId: 1,
    questionId: 1,
    answerUserId: 2,
    score: 4,
  },
  {
    id: 1,
    userId: 1,
    questionId: 1,
    answerUserId: 3,
    score: 1,
  },
]

export async function getQuestionAnswers(): Promise<QuestionAnswerType[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...questionAnswers])
    }, 1000)
  })
}

export async function getQuestionAnswersByUser(userId: number) {
  const questionAnswers = await getQuestionAnswers()
  return Promise.resolve(
    questionAnswers.filter(
      (questionAnswer) => questionAnswer.userId === userId,
    ) || [],
  )
}
