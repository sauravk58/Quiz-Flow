import { motion } from "framer-motion"

const mockLeaderboard = [
  { name: "Alice", score: 4800 },
  { name: "Bob", score: 4500 },
  { name: "Charlie", score: 4200 },
  { name: "David", score: 3900 },
  { name: "Eve", score: 3600 },
]

function Leaderboard({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Leaderboard</h2>
      <div className="space-y-4 mb-6">
        {mockLeaderboard.map((entry, index) => (
          <div key={index} className="flex justify-between items-center bg-gray-100 rounded-lg p-4">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-gray-800 mr-4">{index + 1}</span>
              <span className="text-xl text-gray-700">{entry.name}</span>
            </div>
            <span className="text-xl font-semibold text-blue-600">{entry.score}</span>
          </div>
        ))}
      </div>
      <div className="text-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out text-xl font-semibold"
        >
          Close Leaderboard
        </motion.button>
      </div>
    </motion.div>
  )
}

export default Leaderboard

