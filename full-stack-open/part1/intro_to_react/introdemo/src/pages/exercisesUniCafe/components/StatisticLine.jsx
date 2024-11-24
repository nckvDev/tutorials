const StatisticLine = ({text, value}) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>{text}</td>
          <td>{value.toString()}</td>
        </tr>
      </tbody>
    </table>
  )
}

export default StatisticLine