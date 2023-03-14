import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Task } from '../interfaces/task.interface';

class MySocket extends Socket {
  constructor() {
    super({
      url: environment.socketUrl,
      options: {
        transports: ['websocket'],
        query: {
          room: 'johnazt',
        },
      },
    });
  }
}
@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: MySocket;

  constructor() {
    this.socket = new MySocket();
  }

  public listen() {
    this.socket.on('connect', () => {
      console.log('server listening...');
    });
  }
  public createTask(name: string): void {
    this.socket.emit('createTask', { name });
  }
  public deleteTask(id: string): void {
    this.socket.emit('deleteTask', { id });
  }
  public completeTask(id: string): void {
    this.socket.emit('completeTask', { id });
  }
  public updateTask(id:string, newName:string): void {
    this.socket.emit('updateTask', id, newName);
  }

  public getTasks(): Observable<Task[]> {
    return new Observable<Task[]>((observer) => {
      this.socket.on('getTasks', (data: Task[]) => {
        observer.next(data);
      });
    });
  }
}
