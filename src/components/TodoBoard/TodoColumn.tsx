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
    data: { stage: name }
  })

  const renderedTasks = tasks
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
          background: isOver ? "#e0f2fe" : "#fff"
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