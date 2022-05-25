import { Injectable } from '@angular/core';
import { Student } from './student'
import { STUDENTS } from './mock-api'
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  getStudents(): Observable<Student[]> {
    
    const students = of(STUDENTS)
    this.messageService.add('Student Service: fetched students')
    return students

  }

  getStudent(id: number): Observable<Student> {

    const student = STUDENTS.find(s => s.id === id)!
    this.messageService.add(`Student Service: fetched student ID = ${id}`)
    return of(student)

  }

  constructor(private messageService: MessageService) { }
}
