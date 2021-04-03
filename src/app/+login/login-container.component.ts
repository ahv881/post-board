import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ClientService } from '../core/client/client.service';
import { ClientModel } from '../core/client/client.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-container',
  template: `
    <app-login
      (signIn)="onSignIn($event)"
    >
    </app-login>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginContainerComponent {

  constructor(
    private clientService: ClientService,
    private router: Router,
  ) {
  }

  public onSignIn(client: ClientModel): void {
    this.clientService.signIn(client).subscribe(
      () => {
        this.router.navigate(['post-board']);
      },
      (error) => {
        alert(error);
      },
    );
  }

}
