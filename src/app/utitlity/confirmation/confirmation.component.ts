import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  templateUrl: "./confirmation.component.html"
})
export class ConfirmationDialogComponent {
  public message: string;

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Confirmation
  ) {
    this.message = this.data.message;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface Confirmation {
  message: string;
}
