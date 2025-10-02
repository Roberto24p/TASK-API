import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class ErrorService {
  private snack = inject(MatSnackBar);

  showError(input: string | string[] | unknown, fallback = 'Ha ocurrido un error inesperado.'): void {
    let text = fallback;

    if (Array.isArray(input)) {
      text = input.map((m) => `• ${m}`).join('\n');
    } else if (typeof input === 'string' && input.trim()) {
      text = input;
    } else if (input && typeof input === 'object') {
      try {
        const obj = input as any;
        if (Array.isArray(obj?.errors) && obj.errors.length) {
          text = obj.errors.map((m: string) => `• ${m}`).join('\n');
        } else if (typeof obj?.message === 'string') {
          text = obj.message;
        }
      } catch {
      }
    }

    this.snack.open(text, 'Cerrar', {
      duration: 6000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['snackbar-error'],
    });
  }

  showSuccess(message: string): void {
    this.snack.open(message, 'Cerrar', {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['snackbar-success'],
    });
  }
}
