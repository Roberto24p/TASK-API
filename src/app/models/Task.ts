export interface Task {
  id?: number; // Opcional, ya que no existe al crear
  title: string;
  description: string;
  isCompleted: boolean;
  createBy: {
    email: string;
  };
  createdAt?: string; // Para la fecha de creación
}

export interface TaskPayload {
  title: string;
  description: string;
  isCompleted: boolean;
}