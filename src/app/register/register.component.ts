import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  register() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
  
      const users = JSON.parse(localStorage.getItem('users') || '[]');
  
      users.push(formData);

      localStorage.setItem('users', JSON.stringify(users));
  
      console.log('Registration successful');
      this.router.navigate(['/login']); 
    }
  }
  

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
