import { Component, inject } from '@angular/core';
import { AccountService } from '../../core/services/account/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  accountService = inject(AccountService);
  private router = inject(Router);

  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

}
