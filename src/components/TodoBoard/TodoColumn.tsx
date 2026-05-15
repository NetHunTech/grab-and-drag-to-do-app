import Card from "./TodoCard"
import type { Todo, TodoColumn } from "../../types/todo"
import { useDroppable } from "@dnd-kit/core"

export default function Column({ name, tasks, onDelete, activeId }: TodoColumn) {
  const {setNodeRef, isOver} = useDroppable({
    id: name,
    data: { stage: name }
  })

  const renderedTasks = tasks
    .filter(task => task.id !== activeId)
    .map((task: Todo) => (
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
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          minHeight: "100%"
        }}
      >
        {renderedTasks}
      </div>
    </div>
  )
}