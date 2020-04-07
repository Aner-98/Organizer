import { Component, OnInit } from '@angular/core';
import {DateService} from '../shared/date.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MyTask, MyTasksService} from '../shared/my-tasks.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.css']
})
export class OrganizerComponent implements OnInit {
  form: FormGroup;
  tasks: MyTask[] = [];

  constructor(private dateService: DateService, private myTasksService: MyTasksService) {
  }

  ngOnInit() {
    this.dateService.date.pipe(
      switchMap(value => this.myTasksService.load(value))
    ).subscribe(tasks => {
      this.tasks = tasks;
    });

    this.form = new FormGroup({
      title: new FormControl('', Validators.required)
    });
  }

  submit() {
    const {title} = this.form.value;

    const myTask: MyTask = {
      title,
      date: this.dateService.date.value.format('DD-MM-YYYY')
    };

    this.myTasksService.create(myTask).subscribe(task => {
      this.tasks.push(myTask);
      this.form.reset()
    }, err => console.error(err))
  }

  remove(task: MyTask) {
    this.myTasksService.remove(task).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== task.id)
    }, err => console.error(err))
  }
}
