import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Student } from '../student'
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private location: Location
  ) { }

  @Input() student?: Student

  ngOnInit(): void {

    this.getStudent()
    
  }

  getStudent(): void {
    
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.studentService.getStudent(id)
      .subscribe(student => this.student = student)

  }

  goBack(): void {

    this.location.back()

  }

  save(): void {

    if (this.student) {
      this.studentService.updateStudent(this.student)
      .subscribe(() => this.goBack())
    }

  }

}
