import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/general/authentication.service';
import { userInfo } from 'os';
import { UserInfo } from 'src/app/models/user/user-info';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  constructor(private readonly formBuilder: FormBuilder,
              private readonly authenticationService: AuthenticationService) {
    this.form = formBuilder.group({
      email: ['demo@financialhouse.io', [Validators.required]],
      password: ['cjaiU8CV', [Validators.required]],
    });
  }

  public ngOnInit(): void {

  }
  public login(): void {
    const currentUser = this.authenticationService.currentUserValue;
    if (!currentUser) {
      const user = new UserInfo();
      user.email = this.form.value.email;
      user.password = this.form.value.password;
      this.authenticationService.login(user).subscribe(data => {
        data.email = user.email;
        if (data.status === 'APPROVED') {
          localStorage.setItem('currentUser', JSON.stringify(data));
          window.location.href = '/dashboard';
        }
      });
    }
  }
}
