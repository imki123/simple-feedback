export type QuestionType = {
  id: number
  content: string
}

const questions: QuestionType[] = [
  {
    id: 1,
    content: '함께 일하고 싶은 동료인가요?',
  },
  {
    id: 2,
    content:
      '동료와 함께 일할때 좋은 감정(즐거움, 동기부여, 성취감 등)을 느끼나요?',
  },
]

export async function getQuestions(): Promise<QuestionType[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...questions])
    }, 1000)
  })
}
