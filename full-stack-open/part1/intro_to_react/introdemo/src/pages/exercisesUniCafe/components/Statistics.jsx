import StatisticLine from "./StatisticLine"

const Statistics = (props) => {
  if (props.all === 0) {
    return <div>No feedback given</div>
  }

  return (
    <div>
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine text="all" value={props.all} />
      <StatisticLine text="average" value={props.average} />
      <StatisticLine text="positive" value={props.positive} />
    </div>
  )
}

export default Statistics