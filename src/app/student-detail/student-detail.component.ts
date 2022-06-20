import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Student } from '../student'
import { DataService } from '../data.service';
import { ModalModule } from '../modal/modal.module';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private location: Location
  ) { }

  @Input() student?: Student

  ngOnInit(): void {

    this.getStudent()
    
  }

  getStudent(): void {
    
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.dataService.getStudent(id)
      .subscribe(student => this.student = student)

  }

  goBack(): void {

    this.location.back()

  }

  save(): void {

    if (this.student) {
      this.dataService.updateStudent(this.student)
      .subscribe(() => this.goBack())
    }

  }

}
