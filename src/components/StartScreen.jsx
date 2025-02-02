import { motion } from "framer-motion"

function StartScreen({ onStart }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl text-center"
    >
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to the Quiz!</h1>
      <p className="text-xl text-gray-600 mb-8">Test your knowledge with our exciting questions!</p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out text-xl font-semibold"
      >
        Start Quiz
      </motion.button>
    </motion.div>
  )
}

export default StartScreen

