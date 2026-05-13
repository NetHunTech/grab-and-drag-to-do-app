import Card from "./TodoCard"

export default function Column() {
  return (
    <div className="todo-column">
      <h1>Stage</h1>
      <div>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  )
}