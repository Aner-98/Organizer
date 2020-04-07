import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})

export class MyTasksService {
  public _baseUrl: string;
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) { this._baseUrl = baseUrl }

  load(date: moment.Moment) : Observable<MyTask[]> {
      return this.http.get<MyTask[]>(this._baseUrl  +'task/' + date.format('DD-MM-YYYY'))
        .pipe(map(tasks => {
          if (!tasks) {
            return []
          }
          return tasks;
        }))
  }

  create(task: MyTask) {
    return this.http.post(this._baseUrl  + 'task/add', task);
  }

  remove(task: MyTask): Observable<void> {
    return this.http.delete<void>(this._baseUrl + 'task/delete/' + task.id);
  }
}

export interface MyTask {
  id?: string
  title: string
  date?: string
}
