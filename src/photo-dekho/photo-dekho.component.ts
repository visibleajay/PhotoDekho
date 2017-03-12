import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs/Rx';

import { NgRedux, select } from '@angular-redux/store';
import { PhotoDekhoActions } from './redux/photo-dekho-actions';
import { IPhotoDekhoState, IPhoto } from './redux/photo-dekho-store';

@Component({
  selector: 'pd-root',
  templateUrl: './photo-dekho.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./photo-dekho.component.css']
})
export class PhotoDekhoComponent implements OnInit {

  @select((state) => state.get('imageData')) imageData$: Observable<IPhoto>;
  @select((state) => state.get('imageData').get('favourite')) favourite$: Observable<boolean>;
  constructor(
    private ngRedux: NgRedux<IPhotoDekhoState>,
    private photoDekhoActions: PhotoDekhoActions) {

  }

  ngOnInit() {
    this.ngRedux.subscribe(() => {
      console.log(this.ngRedux.getState());
    });
  }
}
