import { Injectable } from '@angular/core';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(msg:string) {
    this._snackBar.openFromComponent(SnackbarComponent, {
      data:msg,
      duration: 500000,
      horizontalPosition: 'right',
      verticalPosition:'bottom'
    });
  }
}
