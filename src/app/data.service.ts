import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Student } from './student'
import { Teacher } from './teacher';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  studentsUrl = 'http://localhost:3000/students'
  teachersUrl = 'http://localhost:3000/teachers'

  private log(message: string) {
    this.messageService.add(`Data Service: ${message}`);
  }

  //GET methods

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.studentsUrl)
    .pipe(
      tap(_ => this.log('fetched students')),
      catchError(this.handleError<Student[]>('getStudents', []))
    )
  }

  getStudent(id: number): Observable<Student> {
    const url = `${this.studentsUrl}/${id}`
    return this.http.get<Student>(url).pipe(
      tap(_ => this.log(`fetched student ID = ${id}`)),
      catchError(this.handleError<Student>(`getStudent ID = ${id}`))
    )
  }

  getTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.teachersUrl)
    .pipe(
      tap(_ => this.log('fetched teachers')),
      catchError(this.handleError<Teacher[]>('getTeachers', []))
    )
  }

  getTeacher(id: number): Observable<Teacher> {
    const url = `${this.teachersUrl}/${id}`
    return this.http.get<Teacher>(url).pipe(
      tap(_ => this.log(`fetched teacher ID = ${id}`)),
      catchError(this.handleError<Teacher>(`getTeacher ID = ${id}`))
    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error)
      this.log(`${operation} failed: ${error.message}`)
      return of (result as T)
    }
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  //PUT methods

  updateStudent(student: Student): Observable<any> {
    const url = `${this.studentsUrl}/${student.id}`
    return this.http.put<Student>(url, student).pipe(
      tap(_ => this.log(`updated student ID = ${student.id}`)),
      catchError(this.handleError<any>(`updateStudent`))
    )
  }

  updateTeacher(teacher: Teacher): Observable<any> {
    const url = `${this.teachersUrl}/${teacher.id}`
    return this.http.put<Teacher>(url, teacher).pipe(
      tap(_ => this.log(`updated teacher ID = ${teacher.id}`)),
      catchError(this.handleError<any>('updateTeacher'))
    )
  }

  //POST methods

  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.studentsUrl, student, this.httpOptions).pipe(
      tap((newStudent: Student) => this.log(`added student w/ ID = ${newStudent.id}`)),
      catchError(this.handleError<Student>('addStudent'))
    )
  }

  addTeacher(teacher: Teacher): Observable<Teacher> {
    return this.http.post<Teacher>(this.teachersUrl, teacher, this.httpOptions).pipe(
      tap((newTeacher: Teacher) => this.log(`added teacher w/ID = ${newTeacher.id}`)),
      catchError(this.handleError<Teacher>('addTeacher'))
    )
  }

  //DELETE methods

  deleteStudent(id: number): Observable<Student> {
    const url = `${this.studentsUrl}/${id}`
    return this.http.delete<Student>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted student ID = ${id}`)),
      catchError(this.handleError<Student>('deleteStudent'))
    )
  }

  deleteTeacher(id: number): Observable<Teacher> {
    const url = `${this.teachersUrl}/${id}`
    return this.http.delete<Teacher>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted teacher ID = ${id}`)),
      catchError(this.handleError<Teacher>('deleteTeacher'))
    )
  }

  constructor(
    private messageService: MessageService,
    private http: HttpClient) { }
}
