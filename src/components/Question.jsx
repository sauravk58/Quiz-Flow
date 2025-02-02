import { motion } from "framer-motion"

function Question({ question, onAnswer, currentQuestionIndex, totalQuestions, timeLeft, score, streak }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Question {currentQuestionIndex + 1}</h2>
        <div className="text-gray-600">
          {currentQuestionIndex + 1} / {totalQuestions}
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
        ></div>
      </div>
      <div className="flex justify-between items-center">
        <div className="text-xl font-semibold text-blue-600">Score: {score}</div>
        <div className="text-xl font-semibold text-green-600">Streak: {streak}</div>
        <div className="text-xl font-semibold text-red-600">Time: {timeLeft}s</div>
      </div>
      <p className="text-xl text-gray-700 mb-4">{question.question}</p>
      <div className="space-y-2">
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onAnswer(option)}
            className="w-full p-3 text-left bg-gray-100 hover:bg-blue-100 rounded-lg transition duration-300 ease-in-out"
          >
            {option}
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}

export default Question

