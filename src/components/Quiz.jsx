import { useState, useEffect } from "react"
import Question from "./Question"
import Results from "./Results"
import StartScreen from "./StartScreen"
import Leaderboard from "./Leaderboard"
import { mockQuizData } from "../mockData"

const QUESTION_TIME_LIMIT = 20 // seconds
const MAX_POINTS_PER_QUESTION = 1000

function Quiz() {
  const [quizData, setQuizData] = useState(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [quizStarted, setQuizStarted] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME_LIMIT)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [badges, setBadges] = useState([])
  const [showLeaderboard, setShowLeaderboard] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuizData(mockQuizData)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    let timer
    if (quizStarted && !quizCompleted) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer)
            handleAnswer(null)
            return 0
          }
          return prevTime - 1
        })
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [quizStarted, quizCompleted])

  const startQuiz = () => {
    setQuizStarted(true)
    setTimeLeft(QUESTION_TIME_LIMIT)
  }

  const handleAnswer = (answer) => {
    const isCorrect = answer === quizData[currentQuestionIndex].correctAnswer
    const pointsEarned = Math.round((timeLeft / QUESTION_TIME_LIMIT) * MAX_POINTS_PER_QUESTION)

    setUserAnswers([...userAnswers, answer])
    setScore(score + (isCorrect ? pointsEarned : 0))

    if (isCorrect) {
      setStreak(streak + 1)
      checkAndAwardBadges(streak + 1, score + pointsEarned)
    } else {
      setStreak(0)
    }

    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setTimeLeft(QUESTION_TIME_LIMIT)
    } else {
      setQuizCompleted(true)
    }
  }

  const checkAndAwardBadges = (currentStreak, currentScore) => {
    const newBadges = [...badges]
    if (currentStreak === 3 && !badges.includes("Hot Streak")) {
      newBadges.push("Hot Streak")
    }
    if (currentScore >= 5000 && !badges.includes("High Scorer")) {
      newBadges.push("High Scorer")
    }
    if (newBadges.length > badges.length) {
      setBadges(newBadges)
    }
  }

  const restartQuiz = () => {
    setCurrentQuestionIndex(0)
    setUserAnswers([])
    setQuizStarted(false)
    setQuizCompleted(false)
    setTimeLeft(QUESTION_TIME_LIMIT)
    setScore(0)
    setStreak(0)
    setBadges([])
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl text-center">
        <div className="text-2xl font-bold text-gray-800 mb-4">Loading quiz...</div>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
      </div>
    )
  }

  if (!quizData || quizData.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl text-center">
        <div className="text-2xl font-bold text-gray-800 mb-4">No quiz data available</div>
      </div>
    )
  }

  if (showLeaderboard) {
    return <Leaderboard onClose={() => setShowLeaderboard(false)} />
  }

  if (!quizStarted) {
    return <StartScreen onStart={startQuiz} />
  }

  if (quizCompleted) {
    return (
      <Results
        quizData={quizData}
        userAnswers={userAnswers}
        score={score}
        badges={badges}
        onRestart={restartQuiz}
        onShowLeaderboard={() => setShowLeaderboard(true)}
      />
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
      <Question
        question={quizData[currentQuestionIndex]}
        onAnswer={handleAnswer}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={quizData.length}
        timeLeft={timeLeft}
        score={score}
        streak={streak}
      />
    </div>
  )
}

export default Quiz

