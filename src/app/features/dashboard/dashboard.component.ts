import { Component, inject } from '@angular/core';
import { AccountService } from '../../core/services/account/account.service';
import { Router } from '@angular/router';
import { ChatItemToReturnDto } from '../../core/models/chatItem/chatItemToReturnDto';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  accountService = inject(AccountService);
  selectedChatRoom?: ChatItemToReturnDto;
  chatRooms:ChatItemToReturnDto[] = [];

  private router = inject(Router);

  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

}
