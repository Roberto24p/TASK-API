import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderAdm } from './components/header-adm/header-adm';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { TableTask } from './components/table-task/table-task';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderAdm, DynamicDialogModule, TableTask],
  templateUrl: './app.html',
  styleUrl: './app.sass',
  providers: [DialogService]
})
export class App {
  protected readonly title = signal('task-front');
}
