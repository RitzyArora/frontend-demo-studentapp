import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

   constructor(private http: HttpClient) {}

  getAll() {

    return this.http.get(
      `${environment.api}/v1/Students`
    );
  }

  create(student: any) {

    return this.http.post(
      `${environment.api}/v1/Students`,
      student
    );
  }

  update(id: number, student: any) {

    return this.http.put(
      `${environment.api}/v1/Students/${id}`,
      student
    );
  }

  delete(id: number) {

    return this.http.delete(
      `${environment.api}/v1/Students/${id}`
    );
  }
}
