import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pd-photo',
  templateUrl: './photo.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent {
  @Input() displayPhoto: string;
  @Output() favouriteClick: EventEmitter<any> = new EventEmitter();
}
