import { arrayMove } from "@dnd-kit/sortable"
import type { Todo } from "../types/todo"

export function reorderTodos(
  todos: Todo[], 
  activeId: string, 
  overId: string
) {
  const oldIndex = todos.findIndex(task => task.id === activeId)
  const newIndex = todos.findIndex(task => task.id === overId)

  return arrayMove(todos, oldIndex, newIndex)
}