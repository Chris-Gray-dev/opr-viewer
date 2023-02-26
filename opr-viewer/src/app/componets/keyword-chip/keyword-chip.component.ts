import { Component, Input } from '@angular/core';
import { Keyword, KeywordDisplay } from 'src/app/models/keyword';
import { MatDialog } from '@angular/material/dialog';
import { KeywordChipDialogComponent } from '../keyword-chip-dialog/keyword-chip-dialog.component';

@Component({
  selector: 'app-keyword-chip',
  templateUrl: './keyword-chip.component.html',
  styleUrls: ['./keyword-chip.component.scss'],
})
export class KeywordChipComponent {
  constructor(public dialog: MatDialog) {}
  openDialog() {
    this.dialog.open(KeywordChipDialogComponent, {
      data: { keyword: this.keyword },
    });
  }
  @Input() keyword: KeywordDisplay | null = null;
}
