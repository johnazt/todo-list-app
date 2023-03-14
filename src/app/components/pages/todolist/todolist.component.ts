import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from 'src/app/interfaces/task.interface';
import { SocketService } from '../../../services/socket.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css'],
})
export class TodolistComponent implements OnInit {
  public tasks: Task[] = [];
  public myForm = this.fb.group({
    name: ['', Validators.required],
  });
  public editTaskValue: string = '';

  constructor(private socketService: SocketService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.socketService.getTasks().subscribe((data) => {
      this.tasks = data;
    });
    this.socketService.listen();
  }

  public getTasks(): void {
    this.socketService.getTasks().subscribe((data: any) => {
      this.tasks.push(data);
    });
  }
  public createTask(): void {
    this.socketService.createTask(this.myForm.value.name as string);
    this.myForm.reset();
  }
  public deleteTask(id: string): void {
    this.socketService.deleteTask(id);
  }
  public completeTask(id: string): void {
    this.socketService.completeTask(id)
  }
  public call(task: Task) {
   this.editTaskValue = task.name
  }
  public updateTask(id: string, newName: string) {
    this.editTaskValue = newName
    this.socketService.updateTask(id, newName)
  }

}
