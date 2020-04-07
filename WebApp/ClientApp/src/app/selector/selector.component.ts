import { Component } from '@angular/core';
import {DateService} from '../shared/date.service';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css']
})
export class SelectorComponent {

  constructor(private dateService: DateService) { }

  change(dir: number) {
    this.dateService.changeMonth(dir);
  }
}
