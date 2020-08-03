import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0])
  const [selected, setSelected] = useState(0)
  const [voteLarge, setVoteLarge] = useState(0)
  const [largest, setLargest] = useState(0)
  const handleClick = () => {
    let y = parseInt(Math.random() * 6)
    setSelected(y)
    setVote(votes[y])
    findLargest()
  }
  const [voteNo , setVote] = useState(0)
  const vote = () => {
    setVote(voteNo + 1)
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }
  const findLargest = () => {
    let y = 0
    let index = 0
    let i
    for (i = 0; i < 6; i++)
    {
      if (votes[i] > y)
      {
        y = votes[i]
        index = i
      }
    }
    setLargest(index)
    setVoteLarge(votes[index])
  }
  return (
    <div>
      {props.anecdotes[selected]}
      <div> has {voteNo} votes </div>
      <div>
        <button onClick={vote}> vote </button>
        <button onClick={handleClick}> next anecdote </button>
      </div>
      {props.anecdotes[largest]}
      <div> has {voteLarge} votes </div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)