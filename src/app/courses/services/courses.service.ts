import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import { delay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {

  private readonly API = 'api/courses'

  constructor(private httpCliente: HttpClient) {}

  list() {
    return this.httpCliente.get<Course[]>(this.API).pipe(
      delay(500),
      tap(courses => console.log(courses))
    );
  }
}
