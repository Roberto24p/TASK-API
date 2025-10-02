Frontend
El frontend de Angular gestiona la interfaz de usuario, los formularios (Login, Registro, Tareas) y consume la API REST.

1. Instalación de Dependencias
Ejecuta este comando en la carpeta raíz del frontend (cd angular-app/):

npm install

2. Configuración de la URL de la API
Para que el frontend sepa dónde encontrar el backend, debes configurar la URL base.

Edita el archivo src/environments/environment.ts:

// src/environments/environment.ts
export const environment = {
  //  DEBE COINCIDIR CON LA RUTA DEL SERVIDOR SYMFONY
  urlBase: '[http://127.0.0.1:8000/api](http://127.0.0.1:8000/api)',
};

3. Iniciar el Servidor del Frontend
Ejecuta el servidor de desarrollo de Angular. Por defecto, se inicia en el puerto 4200:

ng serve

El frontend estará disponible en http://localhost:4200/.
