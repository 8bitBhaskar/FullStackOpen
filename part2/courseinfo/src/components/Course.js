const HeadingH2 = ({text}) => <h2>{text}</h2>

const Part = ({name,exercises}) => <p>{name} {exercises}</p>

const TotalExercises =({exercises}) => {
  const totalExercises = exercises.reduce((total,coursePart) => {
    return total+coursePart.exercises
  },0)

  return(
    <p><strong>total of {totalExercises} exercises</strong></p>
  )
  
}

const Course = ({course}) =>{
  return(
  <div>
  <HeadingH2 text={course.name} />
  {course.parts.map((item)=> <Part key={item.id} name={item.name} exercises={item.exercises} />)}
  <TotalExercises exercises={course.parts} />
  </div>
  )
}

export default Course