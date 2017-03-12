import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'displayPhotoPipe' })
export class DisplayPhotoPipe implements PipeTransform {
    transform(imageData) {
        if (!imageData) {
            return imageData;
        }
        if (imageData.get('favourite')) {
            return imageData.get('photos').filter(photo => photo.get('favourite'));
        }
        return imageData.get('photos');
    }
}
