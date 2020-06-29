import { Component, OnInit } from '@angular/core';
import {Todo} from '../../interfaces/todo';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

const API_URL = environment.apiUrl;

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})

export class TodoListComponent implements OnInit {
  customerId: string;
  todoName: string;
  idForTodo: number;
  beforeEditCache: string;
  todos: Todo[] = [];

  constructor(private http: HttpClient) {
    this.todos = this.getTodos();
  }

  ngOnInit(): void {
    this.todoName = '';
    this.idForTodo = 4;
    this.todos = [];
    this.customerId = '1100';
  }

  getTodos(): Todo[] {
    const url = API_URL + '/api/v1/customer/1100/todos';
    console.log(url);
    this.http.get(API_URL + '/api/v1/customer/1100/todos')
      .pipe(catchError(this.errorHandler))
      .subscribe((response: any) => {
        this.todos = response;
        });
    return this.todos;
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError( error.message || 'something went wrong!!');
  }

  addTodo(customerId: string, todoName: string): void {
    if (todoName.trim().length === 0) {
      return;
    }

    this.http.post(API_URL + '/api/v1/customer/' + customerId + '/add',
      {name: todoName, priority: 'high', completed: false})
      .pipe(catchError(this.errorHandler))
      .subscribe((response: any) => {
        this.todos.push(
          {
            todo_id: response.todo_id,
            customer_id: customerId,
            name: todoName,
            completed: false,
            priority: 'high',
            created_at: response.created_at,
            editing: false,
          }
        );
        console.log(response.created_at);
      });

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

    this.http.put(API_URL + '/api/v1/customer/' + todo.customer_id + '/todo/' + todo.todo_id + '/update',
      {name: todo.name, priority: 'high', completed: false})
      .pipe(catchError(this.errorHandler))
      .subscribe((response: any) => {
        console.log(response);
      });

    todo.editing = false;
  }

  cancelEdit(todo: Todo): void {
    todo.name = this.beforeEditCache;
    todo.editing = false;
  }

  UpdateTodoToCompleted(todo: Todo): void {
    const checkedTodo = (event.target as HTMLInputElement).checked;

    this.http.put(API_URL + '/api/v1/customer/' + todo.customer_id + '/todo/' + todo.todo_id + '/update',
      {name: todo.name, priority: 'high', completed: checkedTodo})
      .pipe(catchError(this.errorHandler))
      .subscribe((response: any) => {
        console.log(response);
      });
    console.log(checkedTodo);
  }

  deleteTodo(customerId: string, todoId: string): void {
    this.http.delete(API_URL + '/api/v1/customer/' + customerId + '/todo/' + todoId)
      .subscribe((response: any) => {
        this.todos = this.todos.filter(todo => todo.todo_id !== todoId);
        console.log(response);
      });

  }
}

