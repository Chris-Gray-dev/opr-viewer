import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { KeywordDisplay } from 'src/app/models/keyword';

@Component({
  selector: 'app-keyword-chip-dialog',
  templateUrl: './keyword-chip-dialog.component.html',
  styleUrls: ['./keyword-chip-dialog.component.scss'],
})
export class KeywordChipDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { keyword: KeywordDisplay }
  ) {}
}
