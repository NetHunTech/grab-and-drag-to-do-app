import Card from "./TodoCard"
import type { Todo, TodoColumn } from "../../types/todo"
import { useDroppable } from "@dnd-kit/core"

export default function Column({ name, tasks, onDelete }: TodoColumn) {
  const {setNodeRef, isOver} = useDroppable({
    id: name,
    data: { stage: name }
  })

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

      <div 
        ref={setNodeRef}
        style={{
          minHeight: "100%",
          background: isOver ? 'lightblue' : 'white'
        }}
      >
        {renderedTasks}
      </div>
    </div>
  )
}