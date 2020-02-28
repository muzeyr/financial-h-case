import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/general/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logut',
  templateUrl: './logut.component.html'
})
export class LogutComponent implements OnInit {

  constructor(private readonly authenticationService: AuthenticationService,
              private readonly router: Router) {
   }

  ngOnInit(): void {
    this.authenticationService.logout();
    this.router.navigateByUrl('/login');
  }

}
