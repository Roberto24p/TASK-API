import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Task, TaskPayload } from '../models/Task'; // Asegúrate de crear este archivo
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly baseUrl = environment.urlBase+'task';
  private _taskCreated = new Subject<Task>();
  taskCreated$ = this._taskCreated.asObservable();

  private http = inject(HttpClient);

  public setTaskCreated(task: Task) {
    this._taskCreated.next(task);
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl);
  }

  createTask(payload: TaskPayload): Observable<Task> {
    return this.http.post<Task>(this.baseUrl+'/', payload);
  }

  updateTask(id: number, payload: TaskPayload): Observable<Task> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<Task>(url, payload);
  }

  deleteTask(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url);
  }
}