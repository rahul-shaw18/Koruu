import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { IUser } from 'src/app/interface/user.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('inputElement') inputElement!: ElementRef;
  sortOrder!: string;
  userDetails: IUser[] = [];
  enableEditing = false;
  selectedUser: IUser[] = [];
  selectedAll = false;

  constructor(
    private apiService: ApiService,
    public dialog: MatDialog,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.apiService.getAllUsers().subscribe({
      next: (res: IUser[]) => {
        if (res) {
          this.userDetails = res.map((user: IUser) => {
            return { ...user, isSelected: false, enableEditing: false };
          });
        }
      },
      error: (err) => {
        console.log(err)
      },
    });
  }

  handleSelectAll(e: any) {
    const isChecked = e.target.checked;
    this.userDetails = this.userDetails.map((user: IUser) => ({
      ...user,
      isSelected:isChecked,
    }));
    this.selectedUser = isChecked ? [...this.userDetails] : [];
    this.checkIfAllUsersSelected();
  }

  handleUserSelect(e: any, userId: number) {
    const isChecked = e.target.checked;
    this.userDetails = this.userDetails.map((user: IUser) =>
      user.id === userId ? { ...user, isSelected:isChecked } : user
    );
    this.selectedUser = isChecked
      ? [
          ...this.selectedUser,
          this.userDetails.find((user) => user.id === userId)!,
        ]
      : this.selectedUser.filter((user) => user.id !== userId);
    this.checkIfAllUsersSelected();
  }

  checkIfAllUsersSelected() {
    this.selectedAll = this.selectedUser.length === this.userDetails.length;
  }

  handleDelete(userID: number) {
    this.openDialog((user: IUser) => user.id !== userID);
  }

  handleMultipleDelete() {
    this.openDialog((user: IUser) => user.isSelected == false);
  }

  handleEditing(userId: number) {
    this.userDetails = this.userDetails.map((user: IUser) => {
      if (user.id == userId) {
        setTimeout(() => this.inputElement.nativeElement.focus());
        return {...user, enableEditing:true}
      } else {
        return user
      }
    })
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

  openDialog(filterFunction: (user: IUser) => boolean) {
    const dialogRef = this.dialog.open(DialogComponent, {
      height: '100px',
      width: '300px',
      disableClose: false,
      backdropClass: 'backdrop',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userDetails = this.userDetails.filter(filterFunction);
        this.selectedUser = this.selectedUser.filter(filterFunction);
        this.selectedAll = false;
        this.snackbarService.openSnackBar('Deleted');
      }
    });
  }
}
