import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ComponentType } from '@angular/cdk/overlay';

const BASE_MODAL_PARAMS: MatDialogConfig = {
  width: '600px',
  height: '50%',
};

@Injectable()
export class DialogService {
  constructor(
    private dialogRef: MatDialog,
  ) {
  }

  public openDialog<T, D, R>(component: ComponentType<T>, data: D, params: MatDialogConfig<D> = BASE_MODAL_PARAMS): Observable<R> {
    return this.dialogRef.open<T, D, R>(component, { ...params, data }).afterClosed();
  }
}
