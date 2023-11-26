export type FeedbackType = {
  id: number
  userId: number
  answerUserId: number
  comment: string
}

const feedbacks: FeedbackType[] = [
  {
    id: 1,
    userId: 1,
    answerUserId: 1,
    comment: '적극적으로 도움주셔서 너무 감사했어요!',
  },
  {
    id: 2,
    userId: 1,
    answerUserId: 1,
    comment: '함께 성장 할 수 있는 동료입니다.',
  },
  {
    id: 2,
    userId: 2,
    answerUserId: 1,
    comment: '명확한 목적을 가지고 미팅을 하면 더 좋을 것 같아요.',
  },
]

export async function getFeedbacks(): Promise<FeedbackType[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...feedbacks])
    }, 1000)
  })
}

export async function getUserFeedbacks(userId: number) {
  const feedbacks = await getFeedbacks()
  return Promise.resolve(
    feedbacks.filter((feedback) => feedback.userId === userId) || [],
  )
}
