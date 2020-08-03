import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = (props) => {
  // ...
  return(
    <tr>
        <td> {props.text} </td>
        <td> {props.value} </td>
    </tr>
  )
}
const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)
const Statistics = (props) => {
  // ...
  if (props.all === 0) {
    return (
      <div> Feedback not given </div>
    )
  }
  return(
    <div>
      <table>
        <tbody>
      <Statistic text="good" value = {props.good} />
      <Statistic text="neutral" value = {props.neutral} />
      <Statistic text="bad" value = {props.bad} />
      <Statistic text="all" value = {props.all} />
      <Statistic text="positive" value = {props.positive + "%"} />
      <Statistic text="average" value = {props.average} />
        </tbody>
      </table>
    </div>
  )
}
const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [positive, setPositive] = useState(0)
  const [average, setAverage] = useState(0)
  const handleGood = () =>
  {
    setGood(good + 1)
    setAll(good + bad + neutral + 1)
    setAverage((good + 1 - bad)/(all + 1))
    setPositive((good + 1)/(all + 1) * 100)
  }
  const handleNeutral = () =>
  {
    setNeutral(neutral + 1)
    setAll(good + bad + neutral + 1)
    setAverage((good - bad)/(all + 1))
    setPositive(good/(all + 1) * 100)
  }

  const handleBad = () =>
  {
    setBad(bad + 1)
    setAll(good + bad + neutral + 1)
    setAverage((good - bad - 1)/(all + 1))
    setPositive(good/(all + 1) * 100)
  }

  return (
    <div>
      <h1> give feedback</h1>
      <div>
      <Button handleClick = {handleGood} text="good" />
      <Button handleClick = {handleBad} text="bad"/>
      <Button handleClick = {handleNeutral} text ="neutral" />
      </div>
      <h1> statistics </h1>
      <Statistics good = {good} bad = {bad} neutral = {neutral} average = {average} positive = {positive} all = {all}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)