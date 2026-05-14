import type { TodoCardProps } from "../../types/todo"

export default function Card({ 
  title, description, stage, onDelete
}: TodoCardProps) {
  return (
    <div className="card">
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      <h3>{stage}</h3>
      <button onClick={onDelete}>X</button>
    </div>
  )
}