import { TodoDatas } from "../../mockTodos"
import Column from "./TodoColumn"

export default function Board() {
  const todo = TodoDatas.filter(task => task.stage === 'todo')
  const doing = TodoDatas.filter(task => task.stage === 'doing')
  const done = TodoDatas.filter(task => task.stage === 'done')

  return (
    <main className="todo-board">
      <Column name='todo' tasks={todo}/>
      <Column name='doing' tasks={doing}/>
      <Column name='done' tasks={done}/>
    </main>
  )
}