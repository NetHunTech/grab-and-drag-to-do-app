import { useDraggable } from "@dnd-kit/core"
import { CSS } from '@dnd-kit/utilities'
import type { TodoCardProps } from "../../types/todo"

export default function Card({ 
  id, title, description, stage, onDelete
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
        transform: transform ? CSS.Transform.toString(transform) : undefined,
        touchAction: "none"
      }}
    >
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      <h3>{stage}</h3>
      <button onClick={onDelete}>X</button>

    </div>
  )
}