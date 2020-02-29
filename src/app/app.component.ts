import { Component, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Menu } from './models/general/menu';
import { UserInfo } from './models/user/user-info';
import { AuthenticationService } from './services/general/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  public title = 'financial-house';
  mobileQuery: MediaQueryList;
  currentUser: UserInfo;

  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);
  public menus: Menu[] = [
    {title: 'Dashboard' , url: 'dashboard', icon: 'dashboard'},
    {title: 'Transaction Report' , url: 'transaction-report', icon: 'dehaze'},
    {title: 'Transaction Query' , url: 'transaction-query', icon: 'report'},
    {title: 'Transaction' , url: 'transaction', icon: 'dns'},
    {title: 'Logout' , url: 'logout', icon: 'power_settings_new'},
  ];
  private mobileQuerylistener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher,
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
