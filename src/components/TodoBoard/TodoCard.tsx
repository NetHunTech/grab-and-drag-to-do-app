import type { Todo } from "../../types/todo"

export default function Card({ 
  title, description, stage
}: Todo) {
  return (
    <div className="card">
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      <h3>{stage}</h3>
    </div>
  )
}