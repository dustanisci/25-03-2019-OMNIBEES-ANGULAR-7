import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Crud } from '../../enum/crud';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  @Input() data: Array<any>;
  @Input() settings: boolean;
  @Output() eventOutput: EventEmitter<any> = new EventEmitter();
  public actionCrud = Crud;

  public pag = 1;

  constructor() { }

}
