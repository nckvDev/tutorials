import Part from "./Part"

const Course = ({course}) => {
  const totalExercises = course.parts.reduce((acc, curr) => acc + curr.exercises ,0)

  return (
    <div>
      <h2>{course.name}</h2>
      {
        course.parts.map(value => (
          <Part key={value.id} name={value.name} exercises={value.exercises} />
        ))
      }
      <b>total of {totalExercises} exercises</b>
    </div>
  )
}

export default Course