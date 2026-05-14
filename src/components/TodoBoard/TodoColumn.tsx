import Card from "./TodoCard"
import type { Todo, TodoColumn } from "../../types/todo"

export default function Column({ name, tasks, onDelete }: TodoColumn) {

  const renderedTasks = tasks.map((task: Todo) => (
    <Card 
      key={task.id}
      id={task.id}
      title={task.title}
      description={task.description}
      stage={task.stage}
      onDelete={() => onDelete(task.id)}
    />
  ))

  return (
    <div className={`${name}-column base-column`}>
      <h1>{name}</h1>

      <div>
        {renderedTasks}
      </div>
    </div>
  )
}