import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Student } from './student'
import { STUDENTS } from './mock-api'
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private studentsUrl = 'http://localhost:3000/students'

  private log(message: string) {
    this.messageService.add(`Student Service: ${message}`);
  }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.studentsUrl)
    .pipe(
      tap(_ => this.log('fetched students')),
      catchError(this.handleError<Student[]>('getStudents', []))
    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error)
      this.log(`${operation} failed: ${error.message}`)
      return of (result as T)
    }
  }

  getStudent(id: number): Observable<Student> {
    const url = `${this.studentsUrl}/${id}`
    return this.http.get<Student>(url).pipe(
      tap(_ => this.log(`fetched student ID = ${id}`)),
      catchError(this.handleError<Student>(`getStudent ID = ${id}`))
    )
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  updateStudent(student: Student): Observable<any> {
    return this.http.put(this.studentsUrl, student, this.httpOptions).pipe(
      tap(_ => this.log(`updated student ID = ${student.id}`)),
      catchError(this.handleError<any>(`updateStudent`))
    )
  }

  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.studentsUrl, student, this.httpOptions).pipe(
      tap((newStudent: Student) => this.log(`added student w/ ID = ${newStudent.id}`)),
      catchError(this.handleError<Student>('addStudent'))
    )
  }

  deleteStudent(id: number): Observable<Student> {
    const url = `${this.studentsUrl}/${id}`
    return this.http.delete<Student>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted student ID = ${id}`)),
      catchError(this.handleError<Student>('deleteStudent'))
    )
  }

  constructor(
    private messageService: MessageService,
    private http: HttpClient) { }
}
