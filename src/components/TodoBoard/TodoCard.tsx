import { useDraggable } from "@dnd-kit/core"
import { CSS } from '@dnd-kit/utilities'
import type { TodoCardProps } from "../../types/todo"

export default function Card({ 
  id, title, description, stage, onDelete, onMove
}: TodoCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform
  } = useDraggable({
    id: String(id)
  });

  return (
    <div 
      ref={setNodeRef} 
      {...listeners}
      {...attributes}
      className="card"
      style={{
        transform: CSS.Transform.toString(transform)
      }}
    >
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      <h3>{stage}</h3>
      <button onClick={onDelete}>X</button>

      <div>
        <button onClick={() => {onMove(id, 'todo')}}>todo</button>
        <button onClick={() => {onMove(id, 'doing')}}>doing</button>
        <button onClick={() => {onMove(id, 'done')}}>done</button>
      </div>

    </div>
  )
}