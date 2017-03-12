import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { PhotoDekhoModule } from './photo-dekho/photo-dekho.module';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(PhotoDekhoModule);
