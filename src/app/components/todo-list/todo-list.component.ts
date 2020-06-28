import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos: object[];
  todoName: string;
  idForTodo: number;

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
        created_at: '0001-01-01T00:00:00Z'
      },
      {
        todo_id: 'f4f7f40e-0e76-437c-8158-27b881731d8c',
        customer_id: '1100',
        name: 'task2',
        completed: false,
        priority: 'high',
        created_at: '0001-01-01T00:00:00Z'
      }
    ];
  }

  addTodo(): void {
    if (this.todoName.trim().length === 0) {
      return;
    }
    this.todos.push(
      {
        todo_id: this.idForTodo,
        customer_id: '1100',
        name: this.todoName,
        completed: false,
        priority: 'high',
        created_at: '0001-01-01T00:00:00Z'
      }
    );

    this.todoName = '';
    this.idForTodo ++;
  }
}
