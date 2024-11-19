import { Component } from '@angular/core';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle, } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dialog-conf-email',
  standalone: true,
  imports: [MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle, MatButtonModule, TranslateModule],
  templateUrl: './dialog-conf-email.component.html',
  styleUrl: './dialog-conf-email.component.scss'
})
export class DialogConfEmailComponent {
  constructor(public dialogRef: MatDialogRef<DialogConfEmailComponent>) { }
  onNoClick(): void {
    this.dialogRef.close();
  }

} 
