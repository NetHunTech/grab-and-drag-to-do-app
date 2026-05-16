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

  const columnStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    minHeight: "100%",
    borderRadius: "10px",

    border: `1px solid ${
      name === 'todo'
        ? 'red'
        : name === 'doing'
        ? '#757c10'
        : 'green'
    }`,

    background: isOver
      ? "#a4dbff"
      : name === 'todo'
      ? '#ffbfbf'
      : name === 'doing'
      ? '#e1e78f'
      : '#91f088',

    boxShadow: isOver
      ? "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
      : ""
  }

  return (
    <div className={`${name}-column base-column`}>
      <h1>{name}</h1>

      <div 
        className="container-column"
        ref={setNodeRef}
        style={columnStyle}
      >
        <SortableContext 
          items={taskIds} 
          strategy={verticalListSortingStrategy}
        >
          {!renderedTasks.length ? (
            <h3 style={{ opacity: 0.5 }}>Drop something here!</h3>
          ) : (
            renderedTasks
          )}
        </SortableContext>
      </div>
    </div>
  )
}