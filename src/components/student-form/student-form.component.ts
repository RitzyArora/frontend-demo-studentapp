import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StudentService } from '../../service/student.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-student-form',
  imports: [FormsModule, CommonModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.css'
})
export class StudentFormComponent {
  @Input()
  student: any = {
    studentName: '',
    studentAge: '',
    studentMarks: ''
  };

  @Input()
  editMode = false;

  @Output()
  saved = new EventEmitter();

  @Output()
  closed = new EventEmitter();

  constructor(
    private studentService: StudentService
  ) {}

  saveStudent(): void {

    // UPDATE
    if (this.editMode) {

      this.studentService.update(
        this.student.studentId,
        this.student
      ).subscribe({

        next: () => {

          alert('Student Updated');

          this.saved.emit();
        },

        error: (error) => {

          console.log(error);
        }
      });

    }

    // CREATE
    else {

      this.studentService.create(
        this.student
      ).subscribe({

        next: () => {

          alert('Student Added');

          this.saved.emit();
        },

        error: (error) => {

          console.log(error);
        }
      });
    }
  }

  cancel(): void {

    this.closed.emit();
  }
}
