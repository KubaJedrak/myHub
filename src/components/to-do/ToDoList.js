export const ToDoList = (parentData) => {

  let data = parentData.data
  let id = data.id
  let tasks = data.tasks

  return (
    <div className="task-list">
          <h3> Temporary Title - List </h3>
          <ul>
            {tasks.map( (task, index) => {
              return <li key={index}>{task}</li>
            } )}
          </ul> 
    </div>
  )
}