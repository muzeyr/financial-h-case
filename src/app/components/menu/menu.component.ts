import { Component, OnInit } from '@angular/core';
import { Menu } from './../../models/general/menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public menus: Menu[] = [
    {title: 'Dashboard' , url: 'dashboard', icon: 'fa-home'},
    {title: 'Transaction Report' , url: 'transaction-report', icon: 'fa-filter'},
    {title: 'Transaction Query' , url: 'transaction-query', icon: 'fa-query'},
    {title: 'Logout' , url: 'log-out', icon: 'fa-quit'},
  ];

  constructor() { }


  public ngOnInit(): void {
  }

}
