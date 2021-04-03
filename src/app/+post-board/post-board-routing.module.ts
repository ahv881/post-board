import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostBoardContainerComponent } from './post-board-container.component';

const routes: Routes = [
  {
    path: '',
    component: PostBoardContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostBoardRoutingModule {
}
