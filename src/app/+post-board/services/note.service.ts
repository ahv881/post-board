import { Injectable } from '@angular/core';
import { StoreService } from '../../core/store/store.service';
import { NoteModel } from '../models/note.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

const NOTES_NAME = 'notes';

@Injectable()
export class NoteService {
  private notesSubject: BehaviorSubject<NoteModel[]>;

  constructor(
    private storeService: StoreService,
  ) {
    this.initNotes();
  }

  public getSortedNotes(): Observable<NoteModel[]> {
    return this.getNotesList().pipe(
      map((notes: NoteModel[]) => notes.sort((a: NoteModel, b: NoteModel) => b.date - a.date)),
    );
  }

  public addNote(note: NoteModel): Observable<boolean> {
    return of(true).pipe(
      tap(() => {
        const actualNotes: NoteModel[] = this.notesSubject.getValue();
        this.saveNotes([...actualNotes, note]);
      }),
    );
  }

  public removeNote(index: number): Observable<boolean> {
    return of(true).pipe(
      tap(() => {
        const actualNotes: NoteModel[] = this.notesSubject.getValue();
        const notesWithoutDeleted: NoteModel[] = [...actualNotes.slice(0, index), ...actualNotes.slice(index + 1)];
        this.saveNotes(notesWithoutDeleted);
      }),
    );
  }

  public updateNote(note: NoteModel, index: number): Observable<boolean> {
    return of(true).pipe(
      tap(() => {
        const actualNotes: NoteModel[] = this.notesSubject.getValue();
        const notesWithUpdated: NoteModel[] = [
          ...actualNotes.slice(0, index),
          note,
          ...actualNotes.slice(index + 1),
        ];
        this.saveNotes(notesWithUpdated);
      }),
    );
  }

  private getNotesList(): Observable<NoteModel[]> {
    return this.notesSubject.asObservable();
  }

  private saveNotes(notes: NoteModel[]): void {
    this.notesSubject.next(notes);
    this.storeService.setItem(NOTES_NAME, notes);
  }

  private initNotes(): void {
    const notes: NoteModel[] = this.storeService.getItem<NoteModel[]>(NOTES_NAME) ?? [];
    this.notesSubject = new BehaviorSubject<NoteModel[]>(notes);
  }
}
