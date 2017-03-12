
import { PhotoDekhoComponent } from './photo-dekho.component';
import { DisplayPhotosComponent } from './components/display-photos/display-photos.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { PhotoComponent } from './components/photo/photo.component';
import { UserInputComponent } from './components/user-input/user-input.component';
import { DisplayPhotoPipe } from './components/display-photos/display-photos.pipe';

export const AppComponents = [
  PhotoDekhoComponent,
  DisplayPhotosComponent,
  LandingPageComponent,
  PhotoComponent,
  UserInputComponent,
  DisplayPhotoPipe
];

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { NgReduxModule } from '@angular-redux/store';
// import { ImageLazyLoadModule } from 'ng2-image-lazy-load';

export const AppModules = [
  BrowserModule,
  FormsModule,
  HttpModule,
  NgReduxModule,
  MaterialModule,
  // ImageLazyLoadModule
];
