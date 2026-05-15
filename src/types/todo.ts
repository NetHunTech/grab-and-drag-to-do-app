type Todo = {
  id: string
  title: string
  description?: string
  stage: 'todo' | 'doing' | 'done'
}

type TodoColumn = {
  name: string
  tasks: Todo[]
  onDelete: (id: string) => void
}

type AddTodoProps = {
  onAddTodo: (todo: Todo) => void
}

type TodoCardProps = Todo & {
  onDelete: () => void
}

export type { Todo, TodoColumn, AddTodoProps, TodoCardProps }