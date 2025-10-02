import { Component, Input, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { Task, TaskPayload } from '../../models/Task';
import { ModalTask } from '../modal-task/modal-task';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DateFormatPipe } from '../../pipes/date-format.pipe';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-table-task',
  imports: [MatTableModule, DateFormatPipe, MatIconModule, CommonModule],
  templateUrl: './table-task.html',
  styleUrl: './table-task.sass'
})
export class TableTask implements OnInit {
  displayedColumns: string[] = ['id', 'Titulo', 'Descripción', 'Completado', 'Creado Por', 'Fecha Creación',  'Acciones'];
  @Input() tasks: Task[] = [];
  dataSource = new MatTableDataSource<Task>(this.tasks);
  isAuthenticated$ : Observable<boolean>;

  constructor(private taskService: TaskService,
          private authService: AuthService,
          private dialog: MatDialog){
      this.isAuthenticated$ = this.authService.isAuthenticated$
  }

  ngOnInit(): void {
   this.getTasks();
    this.taskService.taskCreated$.subscribe( task => {
      this.tasks.push(task);
      this.dataSource.data = this.tasks;
    })
  }

  getTasks() {
    this.taskService.getTasks().subscribe( resp => {
      this.tasks = resp;
      this.dataSource.data = resp
    });
  }

  delete(id: number){
    this.taskService.deleteTask(id).subscribe({
      next: (data: any) => {
          this.tasks = this.tasks.filter(t => t.id != id);
          console.log(this.tasks);
          this.dataSource.data = this.tasks;
      }
    })
  }

  edit(task: TaskPayload){
    const dialog = this.dialog.open(ModalTask, {
      data: {mode: 'edit', task}
    });
    dialog.afterClosed().subscribe( resp => {
      if (resp?.ok && resp.task) {
        const idx = this.tasks.findIndex(t => t.id === resp.task.id);
        if (idx > -1) {
          // inmutable: crear nuevo array para disparar change detection (OnPush friendly)
          this.tasks = [
            ...this.tasks.slice(0, idx),
            resp.task,
            ...this.tasks.slice(idx + 1)
          ];
          this.dataSource.data = this.tasks;

        } else {
          // Si no estaba (caso raro), lo agrego
          this.tasks = [resp.task, ...this.tasks];
          this.dataSource.data = this.tasks;

        }
      }
    })
  }

}
