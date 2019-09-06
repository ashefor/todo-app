import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../model/to-do.model';

@Injectable({
    providedIn: 'root'
})
export class TodoService {
    constructor(private http: HttpClient) { }
    private todoUrl = 'http://todoBackend.com/api';
    private endPoint = 'todo'

    createTodo(todo: Todo){
        return this.http.post(`${this.todoUrl}/${this.endPoint}`,todo)
    }

    getAllTodos(){
        return this.http.get<Todo[]>(`${this.todoUrl}/${this.endPoint}`)
    }

    getOneTodo(id:number){
        return this.http.get(`${this.todoUrl}/${this.endPoint}/${id}`)
    }

    updateTodo(todo: Todo){
        return this.http.put<Todo>(`${this.todoUrl}/${this.endPoint}/${todo.id}`, todo)
    }
    deleteTodo(id:number){
        return this.http.delete<Todo>(`${this.todoUrl}/${this.endPoint}/${id}`)
    }
}