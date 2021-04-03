import { ModuleWithProviders, NgModule } from '@angular/core';
import { DialogService } from './dialog.service';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatDialogModule,
  ],
})
export class DialogModule {
  static forRoot(): ModuleWithProviders<DialogModule> {
    return {
      ngModule: DialogModule,
      providers: [DialogService],
    };
  }
}
