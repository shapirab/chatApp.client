import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterUser } from '../../../core/models/user/register';
import { AccountService } from '../../../core/services/account/account.service';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private accountService = inject(AccountService);

  registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    displayName: ['', Validators.required],
    line1: [''],
    line2: [''],
    city: [''],
    state: [''],
    country: [''],
    postalCode: [''],
  });

  onSubmit(){
    console.log('registerComponent::onSubmit(). Value: ', this.registerForm.value);
    let register: RegisterUser = {
      email: this.registerForm.value.email ?? '',
      password: this.registerForm.value.password ?? '',
      firstName: this.registerForm.value.firstName ?? '',
      lastName: this.registerForm.value.lastName ?? '',
      displayName: this.registerForm.value.displayName ?? '',
      address: {
        line1: this.registerForm.value.line1 ?? '',
        line2: this.registerForm.value.line2 ?? '',
        city: this.registerForm.value.city ?? '',
        state: this.registerForm.value.state ?? '',
        country: this.registerForm.value.country ?? '',
        postalCode: this.registerForm.value.postalCode ?? ''
      }
    };

    this.accountService.register(register).subscribe();
  }

}
