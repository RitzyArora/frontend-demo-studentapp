import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import {FormsModule} from '@angular/forms'
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-login',
  imports: [FormsModule,RouterLink ,CommonModule,
  RouterModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 username = '';
  password = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

 login() {

  this.auth.login({
    username: this.username,
    password: this.password
  }).subscribe({

    next: () => {

      this.auth.loadCurrentUser();

      this.router.navigate(['/students']);

    },

    error: () => {

      alert('Invalid credentials');

    }
  });
}
}
