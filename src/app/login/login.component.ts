import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  imports: [FormsModule,ReactiveFormsModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    const { username, password } = this.loginForm.value;

    const users: { username: string, password: string }[] = JSON.parse(localStorage.getItem('users') || '[]');

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      // สร้าง token (ใช้ btoa ในการเข้ารหัสข้อมูล)
      const token = btoa(`${username}:${new Date().getTime()}`);

      // จัดเก็บ token ใน localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('currentUser', JSON.stringify({ username }));

      this.router.navigate(['/sidebar']); // เปลี่ยนเส้นทางไปหน้า sidebar
    } else {
      alert('Invalid username or password');
    }
  }

  register() {
    this.router.navigate(['/register']);
  }
}
