import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NoteModel } from '../../models/note.model';

@Component({
  selector: 'app-post-board-note',
  templateUrl: './post-board-note.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostBoardNoteComponent {
  @Input() note: NoteModel;

  @Output() remove: EventEmitter<void> = new EventEmitter<void>();
  @Output() noteClick: EventEmitter<void> = new EventEmitter<void>();

  public handleRemove(event: Event): void {
    this.remove.emit();
    event.preventDefault();
    event.stopPropagation();
  }
}
