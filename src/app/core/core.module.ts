import { NgModule } from '@angular/core';
import { StoreService } from './store/store.service';
import { ClientService } from './client/client.service';
import { DialogModule } from './dialog/dialog.module';

@NgModule({
  imports: [
    DialogModule.forRoot(),
  ],
  providers: [
    StoreService,
    ClientService,
  ],
})
export class CoreModule {
}
