import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../service/student.service';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { StudentFormComponent } from '../student-form/student-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-student-list',
  imports: [  CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    StudentFormComponent],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
// export class StudentListComponent implements OnInit {
//   students: any[] = [];

//   isAdmin = false;

//   showForm = false;

//   constructor(
//     private studentService: StudentService,
//     private authService: AuthService
//   ) {}

//   ngOnInit(): void {

//     this.loadStudents();

//     this.loadCurrentUser();
//   }

//   loadCurrentUser(): void {

//   this.authService
//     .getCurrentUser()
//     .subscribe({

//       next: (user: any) => {

//         console.log(user);

//         this.authService.currentUser = user;

//         this.isAdmin =
//           user.role?.trim().toLowerCase() === 'admin';

//         console.log(this.isAdmin);
//       },

//       error: (err) => {

//         console.log(err);

//         this.isAdmin = false;
//       }
//     });
// }

//   loadStudents(): void {

//     this.studentService
//       .getAll()
//       .subscribe({

//         next: (response: any) => {

//           this.students = response;

//           this.showForm = false;
//         },

//         error: (error) => {

//           console.log(error);
//         }
//       });
//   }

//   reload(): void {

//     this.loadStudents();
//   }

//   deleteStudent(id: number): void {

//     if(confirm('Are you sure to delete?')) {

//       this.studentService
//         .delete(id)
//         .subscribe({

//           next: () => {

//             this.loadStudents();
//           },

//           error: (error) => {

//             console.log(error);
//           }
//         });
//     }
//   }

//   logout(): void {

//     this.authService
//       .logout()
//       .subscribe({

//         next: () => {

//           window.location.href = '/';
//         },

//         error: (error) => {

//           console.log(error);
//         }
//       });
//   }
// }
export class StudentListComponent implements OnInit {

  students: any[] = [];

  isAdmin = false;

  showForm = false;

  editMode = false;

  selectedStudent: any = {};

  displayedColumns: string[] = [];

  constructor(
    private studentService: StudentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {

    this.loadStudents();

    this.loadCurrentUser();
  }

  loadCurrentUser(): void {

    this.authService
      .getCurrentUser()
      .subscribe({

        next: (user: any) => {

          this.authService.currentUser = user;

          this.isAdmin =
            this.authService.isAdmin();

          this.displayedColumns =
            this.isAdmin
              ? ['name', 'age', 'marks', 'grade', 'actions']
              : ['name', 'age', 'marks', 'grade'];
        },

        error: (error) => {

          console.log(error);
        }
      });
  }

  loadStudents(): void {

    this.studentService
      .getAll()
      .subscribe({

        next: (response: any) => {

          this.students = response;
        },

        error: (error) => {

          console.log(error);
        }
      });
  }

  openAddForm(): void {

    this.editMode = false;

    this.selectedStudent = {

      studentName: '',
      studentAge: '',
      studentMarks: ''
    };

    this.showForm = true;
  }

  editStudent(student: any): void {

    this.editMode = true;

    this.selectedStudent = {

      ...student
    };

    this.showForm = true;
  }

  deleteStudent(id: number): void {

    if(confirm('Delete student?')) {

      this.studentService
        .delete(id)
        .subscribe({

          next: () => {

            this.loadStudents();
          },

          error: (error) => {

            console.log(error);
          }
        });
    }
  }

  onSaved(): void {

    this.loadStudents();

    this.closeForm();
  }

  closeForm(): void {

    this.showForm = false;
  }

  logout(): void {

    this.authService
      .logout()
      .subscribe({

        next: () => {

          window.location.href = '/';
        },

        error: (error) => {

          console.log(error);
        }
      });
  }
}