import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  name = 'Angular';
  public isCollapsed = true;
  public menus: any[] = [
    { name: 'Balance Account', link: '/wallet/create/account' },
    { name: 'Credit Account', link: '/wallet/credit/account' },
    { name: 'Debit Account', link: '/wallet/debit/account' },
    { name: 'Transaction History', link: '/wallet/transaction/history' },
  ];
  constructor() {}

  ngOnInit(): void {}
}
