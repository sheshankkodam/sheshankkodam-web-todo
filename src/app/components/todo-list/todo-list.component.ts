import { Component, OnInit } from '@angular/core';
import {Todo} from '../../interfaces/todo';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos: Todo[];
  todoName: string;
  idForTodo: number;
  beforeEditCache: string;

  constructor() { }

  ngOnInit(): void {
    this.todoName = '';
    this.idForTodo = 4;
    this.todos = [
      {
        todo_id: 'e5a7d644-ea3e-4816-bc29-f7c3bf02c70b',
        customer_id: '1100',
        name: 'task1',
        completed: true,
        priority: 'low',
        created_at: '0001-01-01T00:00:00Z',
        editing: false,
      },
      {
        todo_id: 'f4f7f40e-0e76-437c-8158-27b881731d8c',
        customer_id: '1100',
        name: 'task2',
        completed: false,
        priority: 'high',
        created_at: '0001-01-01T00:00:00Z',
        editing: false,
      }
    ];
  }

  addTodo(): void {
    if (this.todoName.trim().length === 0) {
      return;
    }
    this.todos.push(
      {
        todo_id: this.idForTodo.toString(),
        customer_id: '1100',
        name: this.todoName,
        completed: false,
        priority: 'high',
        created_at: '0001-01-01T00:00:00Z',
        editing: false,
      }
    );

    this.todoName = '';
    this.idForTodo ++;
  }

  editTodo(todo: Todo): void {
    this.beforeEditCache = todo.name;
    todo.editing = true;
  }

  doneEdit(todo: Todo): void {
    if (todo.name.trim().length === 0) {
      todo.name = this.beforeEditCache;
    }
    todo.editing = false;
  }

  cancelEdit(todo: Todo): void {
    todo.name = this.beforeEditCache;
    todo.editing = false;
  }

  deleteTodo(todoId: string): void {
    this.todos = this.todos.filter(todo => todo.todo_id !== todoId);
  }
}

