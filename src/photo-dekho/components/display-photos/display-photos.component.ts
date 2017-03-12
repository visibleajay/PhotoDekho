import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pd-display-photos',
  templateUrl: './display-photos.html',
  styleUrls: ['./display-photos.component.css']
})
export class DisplayPhotosComponent {
  @Input() imageData;
  @Output() favouritePhotoClick: EventEmitter<any> = new EventEmitter();
}
