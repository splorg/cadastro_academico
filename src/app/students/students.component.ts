import { Component, OnInit } from '@angular/core';
import { Student } from '../student'
import { DataService } from '../data.service';
import { MessageService } from '../message.service';
import { ModalModule } from '../modal/modal.module';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  students: Student[] = []

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getStudents()
  }
  
  getStudents(): void {
    this.dataService.getStudents()
      .subscribe(students => this.students = students)
  }

  add(name: string, age: any, course: string, semester: any): void {
    parseInt(age)
    parseInt(semester)
    name = name.trim()
    course = course.trim()
    if (!name || age < 1 || !course || semester < 1) { return }
    this.dataService.addStudent({ name, age, course, semester } as unknown as Student)
    .subscribe(student => {
      this.students.push(student)
    })
  }

  delete(student: Student): void {
    this.students = this.students.filter(s => s !== student)
    this.dataService.deleteStudent(student.id).subscribe()
  }

}
