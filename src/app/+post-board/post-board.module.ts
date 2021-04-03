import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostBoardLayoutComponent } from './components/post-board-layout/post-board-layout.component';
import { PostBoardNoteComponent } from './components/post-board-note/post-board-note.component';
import { PostBoardNoteEditorComponent } from './components/post-board-note-editor/post-board-note-editor.component';
import { PostBoardNoteDetailsComponent } from './components/post-board-note-details/post-board-note-details.component';
import { PostBoardContainerComponent } from './post-board-container.component';
import { PostBoardRoutingModule } from './post-board-routing.module';
import { NoteService } from './services/note.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PostBoardContainerComponent,
    PostBoardLayoutComponent,
    PostBoardNoteComponent,
    PostBoardNoteEditorComponent,
    PostBoardNoteDetailsComponent,
  ],
  imports: [
    CommonModule,
    PostBoardRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
    NoteService,
  ],
})
export class PostBoardModule {
}
