import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../services/account/account.service';

export const loginGuard: CanActivateFn = (route, state) => {
  let accountService = inject(AccountService);
  let router = inject(Router);

  console.log('loginGuard:: currentUser: ', accountService.currentUser());
  if(accountService.currentUser()){
    return true;
  }
  else{
    router.navigateByUrl('');
    return false;
  }
};
