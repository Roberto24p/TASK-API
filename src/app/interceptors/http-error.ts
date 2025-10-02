import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ErrorService } from '../services/error.service';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorService = inject(ErrorService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 0) {
        errorService.showError('No hay conexión con el servidor.');
        return throwError(() => err);
      }

      const payload = err.error;

      if (payload) {
        if (Array.isArray(payload.errors) && payload.errors.length) {
          errorService.showError(payload.errors);
        } else if (typeof payload.message === 'string' && payload.message.trim()) {
          errorService.showError(payload.message);
        } else if (typeof payload === 'string') {
          errorService.showError(payload);
        } else {
          const byStatus =
            err.status === 401 ? 'No autorizado.' :
            err.status === 403 ? 'Acceso denegado.' :
            err.status === 404 ? 'Recurso no encontrado.' :
            err.status >= 500 ? 'Error interno del servidor.' :
            'Solicitud inválida.';
          errorService.showError(byStatus);
        }
      } else {
        errorService.showError('Error inesperado del servidor.');
      }

      return throwError(() => err);
    })
  );
};
