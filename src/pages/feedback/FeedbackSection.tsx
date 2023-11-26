import { FeedbackType } from '../../apis/feedbacks'

export function FeedbackSection({
  feedbacks,
  userId,
}: {
  feedbacks: FeedbackType[]
  userId: number
}) {
  const filteredFeedbacks = feedbacks.filter(
    (feedback) => feedback.userId === userId,
  )

  return (
    <div>
      <h2 className="text-2xl font-bold">
        피드백{' '}
        <span className="rounded-lg bg-blue-200 px-2 py-1 text-lg font-bold text-blue-800">
          {filteredFeedbacks.length}개
        </span>
      </h2>
      <ul className="list-disc pl-5">
        {filteredFeedbacks.map((feedback) => (
          <li key={feedback.id}>{feedback.comment}</li>
        ))}
        {filteredFeedbacks.length === 0 && <li>피드백이 없습니다.</li>}
      </ul>
    </div>
  )
}
