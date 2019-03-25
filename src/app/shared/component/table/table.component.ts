import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  @Input() data: Array<any>;
  @Input() settings: boolean;
  @Output() eventOutput: EventEmitter<any> = new EventEmitter();

  public pag = 1;

  constructor() { }

}
