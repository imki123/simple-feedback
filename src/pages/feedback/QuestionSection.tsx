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
  return (
    <div>
      <h2 className="text-2xl font-bold">
        설문{' '}
        <span className="text-base font-normal">
          1점(매우 그렇지 않다.) ~ 5점(매우 그렇다.)
        </span>
      </h2>

      <ol className="list-decimal pl-5">
        {questions.map((question) => {
          // 설문 문항 별 평균점수, 개수 구하기
          const questionAnswersByQuestionId = questionAnswers.filter(
            (answer) => answer.questionId === question.id,
          )
          let summary = <span></span>
          if (questionAnswersByQuestionId.length !== 0) {
            const sumScore = questionAnswersByQuestionId.reduce((acc, cur) => {
              return acc + cur.score
            }, 0)
            const averageScore = toFixed(
              round(sumScore / questionAnswersByQuestionId.length),
            )
            summary = (
              <span>
                <span className="rounded-lg bg-green-200 px-2 py-1 font-bold text-green-800">
                  {averageScore}점
                </span>{' '}
                ({questionAnswersByQuestionId.length}개)
              </span>
            )
          }

          return (
            <li key={question.id}>
              <div>
                <strong>{question.content}</strong> {summary}
                <form
                  className="flex items-center gap-4"
                  onSubmit={(e) => {
                    e.preventDefault()
                    alert('점수를 저장했습니다.')
                  }}
                >
                  <ul className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((score) => (
                      <li key={score}>
                        <label className="cursor-pointer rounded-lg bg-green-200 px-2 py-1 hover:opacity-60">
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
                  <button className="rounded-lg bg-blue-200 px-2 py-1">
                    내 점수 저장
                  </button>
                </form>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
