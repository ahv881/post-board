import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotesDialogModel, NotesDialogViewActions } from '../../models/notes-dialog.model';
import { NoteModel } from '../../models/note.model';

@Component({
  selector: 'app-post-board-note-details',
  templateUrl: './post-board-note-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostBoardNoteDetailsComponent implements OnInit {
  public note: NoteModel;

  constructor(
    private dialogRef: MatDialogRef<PostBoardNoteDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) private data: NotesDialogModel<NotesDialogViewActions>,
  ) {
  }

  public ngOnInit(): void {
    this.note = this.data.note;
  }

  public close(): void {
    this.dialogRef.close(null);
  }

  public remove(): void {
    this.dialogRef.close(this.data.actions.remove());
  }

  public edit(): void {
    this.dialogRef.close(this.data.actions.edit());
  }

}
