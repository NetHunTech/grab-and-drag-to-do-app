import { useSortable } from "@dnd-kit/sortable"
import { CSS } from '@dnd-kit/utilities'
import type { TodoCardProps } from "../../types/todo"

export default function Card({ 
  id, title, description, stage, onDelete
}: TodoCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({
    id,
    data: {
      type: 'card',
      stage 
    }
  })


  return (
    <div className={`card card-${stage}`}>
      <div 
        ref={setNodeRef} 
        {...listeners}
        {...attributes}
        
        style={{
          transform: transform ? CSS.Transform.toString(transform) : undefined,
          transition,
        }}
      >
        <h2>{title}</h2>
        {description && <p>{description}</p>}

      </div >
      <div className="card-info">
        <h3>{stage}</h3>
        <button onClick={onDelete}>X</button>
      </div>
    </div>
  )
}