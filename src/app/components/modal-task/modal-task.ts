import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task, TaskPayload } from '../../models/Task';
import { Observable } from 'rxjs';
import { TaskService } from '../../services/task.service';

type TaskMode = 'create' | 'edit';

export interface ModalTaskData {
  mode: TaskMode;
  task?: Task; 
}

@Component({
  selector: 'app-modal-task',
  imports: [ReactiveFormsModule],
  templateUrl: './modal-task.html',
  styleUrl: './modal-task.sass'
})
export class ModalTask {
  taskForm!: FormGroup;
  isSubmitting = false;
  isEditMode: boolean = false;

  constructor(private fb: FormBuilder,
  public matDialogRef: MatDialogRef<ModalTask>,
  @Inject(MAT_DIALOG_DATA) public data: ModalTaskData,
  private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.isEditMode = this.data?.mode === 'edit';

    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],

      description: [''],

      isCompleted: [false]
    });

    if (this.isEditMode && this.data.task) {
      this.taskForm.patchValue({
        title: this.data.task.title ?? '',
        description: this.data.task.description ?? '',
        isCompleted: !!this.data.task.isCompleted
      });
    }
  }

  onSubmit(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const { title, description, isCompleted } = this.taskForm.value as TaskPayload;
    const payload: TaskPayload = { title, description, isCompleted };

    let request$: Observable<Task>;
    let successMessage: string;

    this.isSubmitting = true;
    this.taskForm.disable();

    if (this.isEditMode && this.data.task?.id != null) {
      request$ = this.taskService.updateTask(this.data.task.id, payload);
      successMessage = 'Tarea actualizada correctamente.';
    } else {
      request$ = this.taskService.createTask(payload);
      successMessage = 'Tarea creada correctamente.';
    }

    request$.subscribe({
      next: (task) => {
        if ( !this.isEditMode ) {
          this.taskService.setTaskCreated(task)

        }
        this.matDialogRef.close({ ok: true, task });
      },
      error: (err) => {
        this.isSubmitting = false;
        this.taskForm.enable();
      }
    });
  }

  closeModal(): void {
    this.matDialogRef.close();
  }
}
