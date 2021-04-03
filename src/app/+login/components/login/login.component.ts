import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientModel } from '../../../core/client/client.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  public form: FormGroup;

  @Output() public signIn: EventEmitter<ClientModel> = new EventEmitter<ClientModel>();

  constructor(
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.setForm();
  }

  public handleSignIn(): void {
    this.signIn.emit(this.form.getRawValue());
  }

  private setForm(): void {
    this.form = this.fb.group({
      login: this.fb.control(null, Validators.required),
      password: this.fb.control(null, Validators.required),
    });
  }

}
