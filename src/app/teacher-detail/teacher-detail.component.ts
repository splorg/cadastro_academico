import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Teacher } from '../teacher';
import { TeacherService } from '../teacher-service';

@Component({
  selector: 'app-teacher-detail',
  templateUrl: './teacher-detail.component.html',
  styleUrls: ['./teacher-detail.component.css']
})
export class TeacherDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private teacherService: TeacherService,
    private location: Location
  ) { }

  @Input() teacher?: Teacher

  ngOnInit(): void {

    this.getTeacher()

  }

  getTeacher(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.teacherService.getTeacher(id)
      .subscribe(teacher => this.teacher = teacher)

  }

  goBack(): void {

    this.location.back()

  }

}
