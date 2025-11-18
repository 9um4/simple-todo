import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Todo } from "../types/todo";

type TodoState = {
    todos: Todo[];
    addTodo: (text: string) => boolean;
    toggleTodo: (id: string) => boolean;
    removeTodo: (id: string) => boolean;
    clearCompletedTodos: () => number;
}

export const useTodoStore = create<TodoState>()(
    persist(
        (set, get) => ({
            todos: [],

            addTodo: (text: string) => {
                const title = text.trim();
                if (!title) return false;

                const newTodo: Todo = {
                    id: crypto.randomUUID(),
                    text: title,
                    done: false,
                };

                set((state) => ({
                    todos: [...state.todos, newTodo],
                    })
                );
                return true;
            },

            toggleTodo: (id: string) => {
                const { todos } = get();

                let toggled = false;
                
                const nextTodos = todos.map((todo) => {
                    if (todo.id === id) {
                        toggled = true;
                        return { ...todo, done: !todo.done };
                    }

                    return todo;
                });

                if (toggled) {
                    set({ todos: nextTodos });
                }

                return toggled; // true면 실제로 뭔가 바뀐 것
            },

            removeTodo: (id: string) => {
                const { todos } = get();

                const nextTodos = todos.filter((todo) => todo.id !== id);

                if (nextTodos.length === todos.length) {
                    return false; // 삭제된 게 없음
                }
                set({ todos: nextTodos });
                return true;
            },

            clearCompletedTodos: () => {
                const { todos } = get();
                const nextTodos = todos.filter((todo) => !todo.done);
                const removedCount = todos.length - nextTodos.length;
                if (removedCount === 0) {
                    return 0; // 삭제된 게 없음
                }
                set({ todos: nextTodos });
                return removedCount;
            },
        }),
        {
            name: 'todo-storage',
        }
    )
);