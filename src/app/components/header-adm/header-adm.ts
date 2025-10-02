import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ModalTask } from '../modal-task/modal-task';
import {MatDialog } from  '@angular/material/dialog';
import { ModalUser } from '../modal-user/modal-user';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header-adm',
  imports: [Button, ModalTask, ModalUser, CommonModule],
  templateUrl: './header-adm.html',
  styleUrl: './header-adm.sass',
})
export class HeaderAdm {
  isAuthenticated$ : Observable<boolean>;

    constructor(public dialogService: DialogService,
      private dialog: MatDialog,
      private authService: AuthService
    ) {
      this.isAuthenticated$ = this.authService.isAuthenticated$
    }

  openNewTask(){
    this.dialog.open(ModalTask, {data: {mode: 'create'}})
  }

  openAuth() {
    this.dialog.open(ModalUser);
  }

  logout(): void {
    this.authService.logout();
  }
}
