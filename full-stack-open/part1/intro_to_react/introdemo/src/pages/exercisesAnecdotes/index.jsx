import { useState } from "react"
import Button from "../../components/Button"
import Header from "../../components/Header"

const ExercisesAnecdotes = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const points = Array(anecdotes.length).fill(0)
   
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(points)

  const handleRandom = () => {
    const randomNumber = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomNumber)
  }

  // option: 1
  // const handleVote = () => {
  //   const copyVote = [...vote]
  //   copyVote[selected] += 1
  //   setVote(copyVote)
  // }

  // option: 2
  const handleVoteUsingMap = () => {
    setVote(prevVotes => 
      prevVotes.map((count, index) => 
        index === selected ? count + 1 : count
      )
    );
  };

  // option: 3
  // const handleVoteUsingSpread = () => {
  //   setVote(prevVotes => [
  //     ...prevVotes.slice(0, selected),
  //     prevVotes[selected] + 1,
  //     ...prevVotes.slice(selected + 1)
  //   ]);
  // };

  const mostVotes = Math.max(...vote)
  const anecdoteVotes = vote.indexOf(mostVotes)
  
  

  return (
    <div>
      <Header text="Anecdote of the day" />
      <div>{anecdotes[selected]}</div>
      <div>has {vote[selected]} votes</div>
      <Button text="vote" onClick={handleVoteUsingMap} />
      <Button text="next anecdote" onClick={handleRandom} />
      <Header text="Anecdote with most votes" />
      <div>{anecdotes[anecdoteVotes]}</div> 
      <div>has {mostVotes} votes</div> 
    </div>
  )
}

export default ExercisesAnecdotes