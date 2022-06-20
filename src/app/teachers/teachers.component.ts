import { Component, OnInit } from '@angular/core';
import { Teacher } from '../teacher';
import { DataService } from '../data.service';
import { ModalModule } from '../modal/modal.module';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {

  teachers: Teacher[] = []

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getTeachers()
  }
  
  getTeachers(): void {
    this.dataService.getTeachers()
      .subscribe(teachers => this.teachers = teachers)
  }

  add(name: string, subject: string): void {
    name = name.trim()
    subject = subject.trim()
    if (!name || !subject) { return }
    this.dataService.addTeacher({ name, subject} as unknown as Teacher)
    .subscribe(teacher => {
      this.teachers.push(teacher)
    })
  }

  delete(teacher: Teacher): void {
    this.teachers = this.teachers.filter(s => s !== teacher)
    this.dataService.deleteTeacher(teacher.id).subscribe()
  }

}