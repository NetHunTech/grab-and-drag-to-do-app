import type { Todo, TodoColumn } from "../../types/todo"
import Card from "./TodoCard"
import { useDroppable } from "@dnd-kit/core"
import { 
  SortableContext, 
  verticalListSortingStrategy 
} from "@dnd-kit/sortable"

export default function Column({ name, tasks, onDelete, activeId }: TodoColumn) {
  const {setNodeRef, isOver} = useDroppable({
    id: name,
    data: {
      type: 'column',
      stage: name 
    }
  })

  const renderedTasks = tasks.map((task: Todo) => {
    const isDragging = task.id === activeId

    return (
      <div
        key={task.id}
        style={{
          opacity: isDragging ? 0.2 : 1,
          transform: isDragging ? "scale(0.98)" : "scale(1)",
          transition: "opacity 150ms ease, transform 150ms ease",
          pointerEvents: isDragging ? "none" : "auto"
        }}
      >
        <Card
          id={task.id}
          title={task.title}
          description={task.description}
          stage={task.stage}
          onDelete={() => onDelete(task.id)}
        />
      </div>
    )
  })

  const taskIds = tasks.map(task => task.id)

  return (
    <div className={`${name}-column base-column`}>
      <h1>{name}</h1>

      <div 
        className="container-column"
        ref={setNodeRef}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          minHeight: "100%",
          background: isOver ? "#a4dbff" : "#fff"
        }}
      >
        <SortableContext 
          items={taskIds} 
          strategy={verticalListSortingStrategy}
        >
          {renderedTasks}
        </SortableContext>
      </div>
    </div>
  )
}