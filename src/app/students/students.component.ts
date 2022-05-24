import { Component, OnInit } from '@angular/core';
import { Student } from '../student'

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  student: Student[] = [{
    id: 1,
    name: 'Gabriel Lima',
    age: 19,
    course: 'Análise e Desenvolvimento de Sistemas',
    semester: 3
  }]

  constructor() { }

  ngOnInit(): void {
  }

}
