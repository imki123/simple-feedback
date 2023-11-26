import { QuestionAnswerType } from '../../apis/questionAnswers'
import { QuestionType } from '../../apis/questions'
import { round, toFixed } from '../../utils'

export function QuestionSection({
  questions,
  questionAnswers,
}: {
  questions: QuestionType[]
  questionAnswers: QuestionAnswerType[]
}) {
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
    <div>
      <h2 className="text-2xl font-bold">
        설문{' '}
        <span className="font-normal text-base">
          1점(매우 그렇지 않다.) ~ 5점(매우 그렇다.)
        </span>
      </h2>
      <QuestionAnswersList />
    </div>
  )
}
