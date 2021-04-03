import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsLoggedInGuard } from './shared/guards/is-logged-in.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'post-board',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./+login/login.module').then(({ LoginModule }) => LoginModule),
  },
  {
    path: 'post-board',
    loadChildren: () => import('./+post-board/post-board.module').then(({ PostBoardModule }) => PostBoardModule),
    canActivate: [IsLoggedInGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
