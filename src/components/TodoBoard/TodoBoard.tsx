import {
  DndContext,
  closestCenter,
  DragOverlay
} from "@dnd-kit/core"

import AddTodo from "../AddTodo/AddTodo"
import Column from "./TodoColumn"
import Card from "./TodoCard"
import { useTodos } from "../../hooks/useTodos"

export default function Board() {
  const {
    todos, 
    activeTodo, 
    activeId, 
    addTodo, 
    delTodo, 
    onDragStart, 
    onDragEnd, 
    onDragCancel
  } = useTodos()

  const columns = {
    todo: todos.filter(task => task.stage === 'todo'),
    doing: todos.filter(task => task.stage === 'doing'),
    done: todos.filter(task => task.stage === 'done')
  }

  return (
    <>
      <header>
        {<h1>To-Do App</h1>}
        <AddTodo onAddTodo={addTodo}/>
      </header>
      <DndContext
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragCancel={onDragCancel}
        collisionDetection={closestCenter}
      >
        <main className="todo-board">
          <Column 
            name='todo' 
            tasks={columns.todo} 
            onDelete={delTodo} 
            activeId={activeId}
          />
          <Column 
            name='doing' 
            tasks={columns.doing} 
            onDelete={delTodo} 
            activeId={activeId}
          />
          <Column 
            name='done' 
            tasks={columns.done} 
            onDelete={delTodo} 
            activeId={activeId}
          />
        </main>

        <DragOverlay>
          {activeTodo ? (
            <div
              key={activeTodo.id}
              style={{
                transform:"scale(1.2)",
                transition: "opacity 150ms ease, transform 150ms ease",
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                borderRadius: "8px"
              }}
            >
              <Card
                id={activeTodo.id}
                title={activeTodo.title}
                description={activeTodo.description}
                stage={activeTodo.stage}
                onDelete={() => {}}
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </>
  )
}