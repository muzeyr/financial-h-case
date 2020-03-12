import { Component, OnInit, ChangeDetectorRef, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Menu } from 'src/app/models/general/menu';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthenticationService } from 'src/app/services/general/authentication.service';
import { UserInfo } from 'src/app/models/user/user-info';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

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
    { title: 'Logout', url: 'log-out', icon: 'power_settings_new' },
  ];
  public currentUser: UserInfo;
  public mobileQuery: MediaQueryList;
  public form: FormGroup;

  private mobileQuerylistener: () => void;
  @ViewChild('search')public  search: ElementRef;


  constructor(private authenticationService: AuthenticationService,
              media: MediaMatcher,
              private readonly formBuilder: FormBuilder,
              private readonly router: Router,
              changeDetectorRef: ChangeDetectorRef) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQuerylistener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this.mobileQuerylistener);
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.form = formBuilder.group({
      transaction: new FormControl()
    });
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
    if (event.key === 'Enter' && this.search.nativeElement.value !== '') {
            this.router.navigate(['/transaction/' + this.search.nativeElement.value.trim()]);
            this.search.nativeElement.value = '';

        }
    }

}
