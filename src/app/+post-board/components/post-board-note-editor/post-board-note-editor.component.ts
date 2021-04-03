import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotesDialogEditActions, NotesDialogModel } from '../../models/notes-dialog.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-board-note-editor',
  templateUrl: './post-board-note-editor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostBoardNoteEditorComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<PostBoardNoteEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NotesDialogModel<NotesDialogEditActions>,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  public saveNote(): void {
    if (!this.form.get('date').value) {
      this.form.patchValue({
        date: new Date().getTime(),
      });
    }
    this.dialogRef.close(this.data.actions.save(this.form.getRawValue()));
  }

  public close(): void {
    this.dialogRef.close(null);
  }

  private initForm(): void {
    this.form = this.fb.group({
      date: this.fb.control(this.data.note?.date ?? null),
      content: this.fb.control(this.data.note?.content ?? null, [Validators.required]),
      author: this.fb.control(this.data.note?.author ?? null, [Validators.required]),
    });
  }

}
