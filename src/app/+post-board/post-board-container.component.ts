import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NoteService } from './services/note.service';
import { Observable } from 'rxjs';
import { NoteModel } from './models/note.model';
import { DialogService } from '../core/dialog/dialog.service';
import { PostBoardNoteDetailsComponent } from './components/post-board-note-details/post-board-note-details.component';
import { filter, first, switchMap } from 'rxjs/operators';
import { NoteAction, NotesDialogEditActions, NotesDialogModel, NotesDialogViewActions } from './models/notes-dialog.model';
import { PostBoardNoteEditorComponent } from './components/post-board-note-editor/post-board-note-editor.component';
import { MatDialogConfig } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/overlay';

@Component({
  selector: 'app-post-board-container',
  template: `
    <app-post-board-layout>
      <app-post-board-note
        (noteClick)="onAddNote()"
      ></app-post-board-note>
      <app-post-board-note
        *ngFor="let note of (notes$ | async); let i = index; trackBy: trackByIndex"
        [note]="note"
        (remove)="onRemoveNote(i)"
        (noteClick)="onViewNote(note, i)"
      >
      </app-post-board-note>
    </app-post-board-layout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostBoardContainerComponent implements OnInit {
  public notes$: Observable<NoteModel[]>;

  public trackByIndex = (index: number): number => index;

  constructor(
    private noteService: NoteService,
    private dialogService: DialogService,
  ) {
  }

  public ngOnInit(): void {
    this.setNotes();
  }

  public onRemoveNote(index): void {
    this.removeNote(index).subscribe();
  }

  public onViewNote(note: NoteModel, index: number): void {
    const data: NotesDialogModel<NotesDialogViewActions> = {
      note,
      actions: {
        edit: () => () => this.editNote(note, index),
        remove: () => () => this.removeNote(index),
      },
    };
    this.openNoteDialog<PostBoardNoteDetailsComponent, NotesDialogViewActions>(PostBoardNoteDetailsComponent, data).subscribe();
  }

  public onAddNote(): void {
    const data: NotesDialogModel<NotesDialogEditActions> = {
      note: null,
      actions: {
        save: (editedNode: NoteModel) => () => this.createNote(editedNode),
      },
    };
    this.openNoteDialog(PostBoardNoteEditorComponent, data).subscribe();
  }

  private editNote(note: NoteModel, index: number): Observable<boolean> {
    const data: NotesDialogModel<NotesDialogEditActions> = {
      note,
      actions: {
        save: (editedNode: NoteModel) => () => this.updateNote(editedNode, index),
      },
    };
    return this.openNoteDialog(PostBoardNoteEditorComponent, data);
  }

  private openNoteDialog<T, K>(
    component: ComponentType<any>,
    data: NotesDialogModel<K>,
    params?: MatDialogConfig<NotesDialogModel<K>>,
  ): Observable<boolean> {
    return this.dialogService.openDialog<T, NotesDialogModel<K>, NoteAction>(component, data, params)
      .pipe(
        first(),
        filter(Boolean),
        switchMap((action: NoteAction) => action()),
      );
  }

  private removeNote(index: number): Observable<boolean> {
    return this.noteService.removeNote(index);
  }

  private createNote(note: NoteModel): Observable<boolean> {
    return this.noteService.addNote(note);
  }

  private updateNote(note: NoteModel, index: number): Observable<boolean> {
    return this.noteService.updateNote(note, index);
  }

  private setNotes(): void {
    this.notes$ = this.noteService.getSortedNotes();
  }
}
