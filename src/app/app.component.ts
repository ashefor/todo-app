import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TodoService } from './services/to-do.service';
import { Todo } from './model/to-do.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'todo-app';
  allTodos: Todo[];
  todo: Todo;
  todoForm: FormGroup;
  editTodoForm: FormGroup
  newid;
  submitting: boolean = false;
  constructor(public fb: FormBuilder, public todoservice: TodoService) {

  }

  ngOnInit() {
    this.todoForm = this.fb.group({
      todo: ['', Validators.required]
    })
    this.editTodoForm = this.fb.group({
      editTodo: ['']
    })
    this.getAllTodos()
  }
  get todoerro(){
    return this.todoForm.get('todo')
  }
  getAllTodos() {
    this.todoservice.getAllTodos().subscribe(data => {
      this.allTodos = data
    })
  }

  createTodo(formvalue) {
    this.submitting = true;
    if(this.todoForm.invalid){
      return
    }
    let todoId = +Math.max.apply(null, this.allTodos.map(todo=> todo.id))
    if(todoId < 0){
      todoId = 0;
    }
    let todo: Todo = {
      id: todoId + 1,
      description: formvalue.todo
    }
    this.todoservice.createTodo(todo).subscribe((data: Todo) => {
      this.todo = data;
      this.submitting = false
      this.todoForm.reset()
    })
    this.getAllTodos()
  }
  edit(todo_id) {
    this.todoservice.getOneTodo(todo_id).subscribe((data: Todo) => {
      this.todo = data;
      this.newid = data.id
      this.editTodoForm.get('editTodo').patchValue(data.description)
    })
  }
  updateTodo(formvalue) {
    this.todo.description = formvalue.editTodo
    this.todoservice.updateTodo(this.todo).subscribe(data => {
      this.getAllTodos()
      setTimeout(() => {
        this.newid = null;
      }, 500)
    })
  }
  cancel(){
    this.newid = null
  }
  deleteTodo(todo_id){
    this.todoservice.deleteTodo(todo_id).subscribe(data=>{
      this.getAllTodos()
    })
  }
}
