import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
})
export class PasswordDialogComponent {
  password: string = ''; // Ajoutez la propriété password ici

  constructor(public dialogRef: MatDialogRef<PasswordDialogComponent>) {}

  closeDialog() {
    this.dialogRef.close(this.password); // Passez le mot de passe saisi lors de la fermeture du dialogue
  }
}
