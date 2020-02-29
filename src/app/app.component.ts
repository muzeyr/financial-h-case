import { Component, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Menu } from './models/general/menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'financial-house';
  mobileQuery: MediaQueryList;
  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);
  public menus: Menu[] = [
    {title: 'Dashboard' , url: 'dashboard', icon: 'dashboard'},
    {title: 'Transaction Report' , url: 'transaction-report', icon: 'dehaze'},
    {title: 'Transaction Query' , url: 'transaction-query', icon: 'report'},
    {title: 'Transaction' , url: 'transaction', icon: 'dns'},
    {title: 'Logout' , url: 'logout', icon: 'power_settings_new'},
  ];
  private mobileQuerylistener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQuerylistener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this.mobileQuerylistener);

  }

  public ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this.mobileQuerylistener);
  }
}
