import { Injectable } from '@angular/core';
import { ClientModel } from './client.model';
import { StoreService } from '../store/store.service';
import { Observable, of, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

const CLIENT_NAME = 'client';

@Injectable()
export class ClientService {
  constructor(
    private store: StoreService,
  ) {
  }

  public isLoggedIn(): boolean {
    return !!this.getClient();
  }

  public signIn(client: ClientModel): Observable<boolean> {
    if (client.password !== '123456') {
      return throwError('wrong credentials, try \'123456\'');
    }
    return of(true).pipe(
      tap(() => {
        this.setClient(client);
      }),
    );
  }

  public signOut(): Observable<boolean> {
    return of(true).pipe(
      tap(() => {
        this.removeClient();
      }),
    );
  }

  private setClient(client: ClientModel): void {
    this.store.setItem(CLIENT_NAME, client);
  }

  private getClient(): ClientModel {
    return this.store.getItem(CLIENT_NAME);
  }

  private removeClient(): void {
    this.store.removeItem(CLIENT_NAME);
  }
}
