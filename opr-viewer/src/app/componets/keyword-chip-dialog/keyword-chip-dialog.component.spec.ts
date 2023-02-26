import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordChipDialogComponent } from './keyword-chip-dialog.component';

describe('KeywordChipDialogComponent', () => {
  let component: KeywordChipDialogComponent;
  let fixture: ComponentFixture<KeywordChipDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeywordChipDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeywordChipDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
