import { Component, OnInit, ChangeDetectorRef, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Menu } from 'src/app/models/general/menu';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthenticationService } from 'src/app/services/general/authentication.service';
import { UserInfo } from 'src/app/models/user/user-info';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {

  public menus: Menu[] = [
    { title: 'Dashboard', url: 'dashboard', icon: 'dashboard' },
    { title: 'Transaction Report', url: 'transaction-report', icon: 'dehaze' },
    { title: 'Transaction Query', url: 'transaction-query', icon: 'report' },
    { title: 'Logout', url: 'logout', icon: 'power_settings_new' },
  ];
  public currentUser: UserInfo;
  public mobileQuery: MediaQueryList;
  private mobileQuerylistener: () => void;
  @ViewChild('search')public  search: ElementRef;


  constructor(private authenticationService: AuthenticationService,
              media: MediaMatcher,
              private readonly router: Router,
              changeDetectorRef: ChangeDetectorRef) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQuerylistener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this.mobileQuerylistener);
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

  }

  public ngOnInit(): void {
  }
  public ngOnDestroy() {
    this.mobileQuery.removeEventListener('change', this.mobileQuerylistener);
  }
  public logout(): void {
    this.authenticationService.logout();
    this.router.navigateByUrl('/login');

  }

  public onKeydown(event: any): void {
    if (event.key === 'Enter') {
        if ( this.search.nativeElement.value !== '') {
            this.router.navigate(['/transaction/' + this.search.nativeElement.value.trim()]);
            this.search.nativeElement.value = '';

        }
    }
  }

}
