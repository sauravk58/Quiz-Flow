import { motion } from "framer-motion"

function Results({ quizData, userAnswers, score, badges, onRestart, onShowLeaderboard }) {
  const correctAnswers = quizData.filter((q, i) => q.correctAnswer === userAnswers[i])
  const totalQuestions = quizData.length
  const percentage = (correctAnswers.length / totalQuestions) * 100

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl text-center"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Quiz Results</h2>
      <div className="text-5xl font-bold text-blue-600 mb-4">{percentage.toFixed(0)}%</div>
      <p className="text-xl text-gray-700 mb-6">
        You got {correctAnswers.length} out of {totalQuestions} questions correct!
      </p>
      <p className="text-2xl font-semibold text-gray-800 mb-4">Total Score: {score}</p>
      {badges.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Badges Earned:</h3>
          <div className="flex justify-center space-x-2">
            {badges.map((badge, index) => (
              <span key={index} className="bg-yellow-400 text-yellow-800 py-1 px-3 rounded-full text-sm font-semibold">
                {badge}
              </span>
            ))}
          </div>
        </div>
      )}
      <div className="space-y-4 mb-8">
        {quizData.map((question, index) => (
          <div key={index} className="bg-gray-100 rounded-lg p-4 text-left">
            <p className="font-semibold text-gray-800 mb-2">{question.question}</p>
            <p className="text-green-600">Correct answer: {question.correctAnswer}</p>
            <p className={`${userAnswers[index] === question.correctAnswer ? "text-green-600" : "text-red-600"}`}>
              Your answer: {userAnswers[index]}
            </p>
          </div>
        ))}
      </div>
      <div className="flex justify-center space-x-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRestart}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out text-xl font-semibold"
        >
          Restart Quiz
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onShowLeaderboard}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 ease-in-out text-xl font-semibold"
        >
          View Leaderboard
        </motion.button>
      </div>
    </motion.div>
  )
}

export default Results

