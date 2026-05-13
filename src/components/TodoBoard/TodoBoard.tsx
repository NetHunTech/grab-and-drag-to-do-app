import Column from "./TodoColumn"

export default function Board() {
  return (
    <main className="todo-board">
      <Column />
      <Column />
      <Column />
    </main>
  )
}