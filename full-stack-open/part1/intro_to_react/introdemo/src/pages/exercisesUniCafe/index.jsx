import { useState } from "react"
import Header from "../../components/Header"
import Button from "../../components/Button"
import Statistics from "./components/Statistics"

const ExercisesUniCafe = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGood = () => {
    setGood((prev) => prev + 1)
    setAll((prev) => prev + 1)
  }
  const handleNeutral = () => {
    setNeutral((prev) => prev + 1)
    setAll((prev) => prev + 1)
  }
  const handleBad = () => {
    setBad((prev) => prev + 1)
    setAll((prev) => prev + 1)
  }

  const averageScore = { good: 1, neutral: 0, bad: -1}
  const totalScore = (good * averageScore.good) + (neutral * averageScore.neutral) + (bad * averageScore.bad)
  const average = totalScore / all

  const positivePercentage = `${(good / all) * 100} %`

  return (
    <div>
      <Header text="give feedback"/>
      <Button onClick={handleGood} text="good" />
      <Button onClick={handleNeutral} text="neutral" />
      <Button onClick={handleBad} text="bad" />
      <Header text="statistics"/>
      <Statistics 
        good={good} 
        neutral={neutral} 
        bad={bad}
        all={all}
        average={average}
        positive={positivePercentage}
      />
    </div>
  )
}

export default ExercisesUniCafe