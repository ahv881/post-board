import { NoteModel } from './note.model';
import { Observable } from 'rxjs';

export interface NotesDialogModel<T> {
  note: NoteModel;
  actions: T;
}

export interface NotesDialogViewActions {
  edit: () => NoteAction;
  remove: () => NoteAction;
}

export interface NotesDialogEditActions {
  save: (editedNode: NoteModel) => NoteAction;
}

export type NoteAction = () => Observable<boolean>;
