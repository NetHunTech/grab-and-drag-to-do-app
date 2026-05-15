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
            tasks={todos.filter(task => task.stage === 'todo')} 
            onDelete={delTodo} 
            activeId={activeId}
          />
          <Column 
            name='doing' 
            tasks={todos.filter(task => task.stage === 'doing')} 
            onDelete={delTodo} 
            activeId={activeId}
          />
          <Column 
            name='done' 
            tasks={todos.filter(task => task.stage === 'done')} 
            onDelete={delTodo} 
            activeId={activeId}
          />
        </main>

        <DragOverlay>
          {activeTodo ? (
            <Card
              id={activeTodo.id}
              title={activeTodo.title}
              description={activeTodo.description}
              stage={activeTodo.stage}
              onDelete={() => {}}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </>
  )
}