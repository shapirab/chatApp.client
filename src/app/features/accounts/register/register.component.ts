import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

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
  }

}
