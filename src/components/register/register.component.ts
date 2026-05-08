import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-register',
  imports: [CommonModule,
  FormsModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatSelectModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username = '';
  password = '';
  role = 'User';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register(): void {

    const user = {
      username: this.username,
      password: this.password,
      role: this.role
    };

    this.authService.register(user)
      .subscribe({

        next: () => {

          alert('Registration Successful');

          this.router.navigate(['/login']);
        },

        error: (err) => {

          console.log(err);

          alert('Registration Failed');
        }
      });
  }
}
