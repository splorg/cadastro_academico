import { Injectable } from '@angular/core';
import { Teacher } from './teacher';
import { TEACHERS } from './mock-api';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  getTeachers(): Observable<Teacher[]> {
    
    const teachers = of(TEACHERS)
    this.messageService.add('Teacher Service: fetched teachers')
    return teachers

  }

  getTeacher(id: number): Observable<Teacher> {

    const teacher = TEACHERS.find(t => t.id === id)!
    this.messageService.add(`Teacher Service: fetched teacher ID = ${id}`)
    return of(teacher)

  }

  constructor(private messageService: MessageService) { }
}
