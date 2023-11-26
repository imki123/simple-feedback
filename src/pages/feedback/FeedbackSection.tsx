import { FeedbackType } from '../../apis/feedbacks'

export function FeedbackSection({ feedbacks }: { feedbacks: FeedbackType[] }) {
  return (
    <div>
      <h2 className="text-2xl font-bold">피드백</h2>
      <ul className="list-disc pl-5">
        {feedbacks.map((feedback) => (
          <li key={feedback.id}>{feedback.comment}</li>
        ))}
      </ul>
    </div>
  )
}
