import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pd-user-input',
  templateUrl: './user-input.html',
  styleUrls: ['./user-input.component.css']
})
export class UserInputComponent {
  @Input() favouriteButtonValue: any;
  @Output() searchTextEntered: EventEmitter<any> = new EventEmitter();
  @Output() updateFavourite: EventEmitter<any> = new EventEmitter();

  onShowButtonText(): string {
    return this.favouriteButtonValue ? 'Show All' : 'Show Favourites';
  }
}
