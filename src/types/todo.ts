type Todo = {
  id: number
  title: string
  description?: string
  stage: 'todo' | 'doing' | 'done'
}

type TodoColumn = {
  name: string
  tasks: Todo[]
}

export type { Todo, TodoColumn }