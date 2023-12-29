import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
  
export class DashboardComponent implements OnInit {
  @ViewChild('inputElement') inputElement!: ElementRef;
  sortOrder!: string;
  userDetails: any;
  enableEditing = false;

  constructor(
    private apiService: ApiService,
    public dialog: MatDialog,
    private snackbarService: SnackbarService,
  ) {}

  ngOnInit(): void {
    this.apiService.getAllUsers().subscribe({
      next: (res: any) => {
        if (res) {
          this.userDetails = res.map((user:any) => {
           return {...user,
            isSelected: false,
            enableEditing:false}
          });
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }


  handleSelectAll() {
    this.userDetails.forEach((user: any) => {
      user.isSelected = !user.isSelected;
    });
  }

  handleUserSelect(e: any, userId: number) {
    this.userDetails.forEach((user: any) => {
      if (user.id == userId) {
        user.isSelected = e.target.checked;
      }
    });
  }

  handleDelete(userID: number) {
    this.openDialog((user: any) => user.id !== userID);
  }

  handleMultipleDelete() {
    this.openDialog((user: any) => user.isSelected == false);
  }

  handleEditing(userId: number) {
    this.userDetails.forEach((user: any) => {
      if (user.id == userId) {
        user.enableEditing = true;
        setTimeout(() => this.inputElement.nativeElement.focus());
      } else {
        user.enableEditing = false;
      }
    });
  }

  handleSort(sortBy: string) {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';

    this.userDetails = this.userDetails.sort((a: any, b: any) => {
      const user1 = a[sortBy].toLowerCase();
      const user2 = b[sortBy].toLowerCase();

      if (this.sortOrder === 'asc') {
        return user1.localeCompare(user2);
      } else {
        return user2.localeCompare(user1);
      }
    });
  }

  drop(event: CdkDragDrop<any>) {
    moveItemInArray(this.userDetails, event.previousIndex, event.currentIndex);
  }

  openDialog(filterFunction: (user:any)=> boolean) {
    const dialogRef = this.dialog.open(DialogComponent, {
      height: '100px',
      width: '300px',
      disableClose: false,
      backdropClass: 'backdrop',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userDetails = this.userDetails.filter(filterFunction);
        this.snackbarService.openSnackBar('Deleted');
      }
    });
  }
}
