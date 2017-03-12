import { NgModule } from '@angular/core';
import { AppComponents } from './photo-dekho.constants';
import { AppModules } from './photo-dekho.constants';

import { PhotoDekhoComponent } from './photo-dekho.component';

import { NgRedux, DevToolsExtension } from '@angular-redux/store';

import { PhotoDekhoActions } from './redux/photo-dekho-actions';
import { PhotoDekhoReducer, IPhotoDekhoState } from './redux/photo-dekho-store';

import { InitialState } from './redux/photo-dekho-store';

// import { WebWorkerService } from 'ng2-image-lazy-load';

// WebWorkerService.workerUrl = '../assets/js/xhrWorker';

// WebWorkerService.enabled = false;

@NgModule({
  declarations: [
    ...AppComponents
  ],
  imports: [
    ...AppModules//
  ],
  providers: [
    PhotoDekhoActions
  ],
  bootstrap: [PhotoDekhoComponent]
})
export class PhotoDekhoModule {
  constructor(
    ngRedux: NgRedux<IPhotoDekhoState>,
    devTools: DevToolsExtension) {

    const storeEnhancers = devTools.isEnabled() ? [devTools.enhancer()] : [];
    // console.log(WebWorkerService);
    ngRedux.configureStore(
      PhotoDekhoReducer,
      InitialState,
      [],
      storeEnhancers);
  }
}
