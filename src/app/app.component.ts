import { Component, ChangeDetectorRef, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Menu } from './models/general/menu';
import { UserInfo } from './models/user/user-info';
import { AuthenticationService } from './services/general/authentication.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  public title = 'financial-house';
  public mobileQuery: MediaQueryList;
  public currentUser: UserInfo;
  public form: FormGroup;

  private mobileQuerylistener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher,
              private readonly router: Router,
              private readonly formBuilder: FormBuilder,
              private authenticationService: AuthenticationService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQuerylistener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this.mobileQuerylistener);
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

  }

  public ngOnDestroy() {
    this.mobileQuery.removeEventListener('change', this.mobileQuerylistener);
  }

}
