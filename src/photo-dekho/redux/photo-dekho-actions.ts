
import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';

import { NgRedux } from '@angular-redux/store';
import { IPhotoDekhoState } from './photo-dekho-store';

export const TEXT_ENTERED = 'TEXT_ENTERED';
export const UPDATE_APP_DISPLAY = 'UPDATE_APP_DISPLAY';
export const FETCHING_IMAGES_REQUEST = 'FETCH_IMAGES_REQUEST';
export const FETCHING_IMAGES_SUCCESS = 'FETCHING_IMAGES_SUCCESS';
export const UPDATE_FAVOURITE = 'UPDATE_FAVOURITE';
export const UPDATE_PHOTO_FAVOURITE = 'UPDATE_PHOTO_FAVOURITE';

@Injectable()
export class PhotoDekhoActions {

    private url;

    constructor(public ngRedux: NgRedux<IPhotoDekhoState>,
        public http: Http) { }

    public async fetchImages(text: string) {
        await this.textEntered(text);
        await this.updateAppDisplay('entered');
        await this.fetchingImagesRequest('loading');
        this.url = `https://api.flickr.com/services/rest`;
        await this.fetchPhotosData();
    }

    private makeRequestParam() {
        const REQUEST_PARAM = JSON.parse(JSON.stringify(this.ngRedux.getState()))['imageData']['httpRequestInfo'];
        const PARAMS: URLSearchParams = new URLSearchParams();
        for (const key in REQUEST_PARAM) {
            if (REQUEST_PARAM.hasOwnProperty(key)) {
                PARAMS.set(key, REQUEST_PARAM[key]);
            }
        }
        PARAMS.set('text', JSON.parse(JSON.stringify(this.ngRedux.getState()))['searchText']);
        const REQUEST_OPTIONS = new RequestOptions();
        REQUEST_OPTIONS.search = PARAMS;
        return REQUEST_OPTIONS;
    }

    private fetchPhotosData() {
        this.http
            .get(this.url, this.makeRequestParam())
            // .catch(console.log('Error'));
            .map(value => value.json())
            .subscribe(value => {
                this.fetchingImagesSuccess(value.photos.photo);
            });
    }

    textEntered = (text: string) => {
        return this.ngRedux.dispatch({
            type: TEXT_ENTERED,
            payload: text
        });
    }

    updateAppDisplay(display: string) {
        return this.ngRedux.dispatch({
            type: UPDATE_APP_DISPLAY,
            payload: display
        });
    }

    fetchingImagesRequest(display: string) {
        return this.ngRedux.dispatch({
            type: FETCHING_IMAGES_REQUEST,
            payload: display
        });
    }

    private transformPhotoMetaData = (metaData) => {
        let counter = 0;
        return metaData.map((photo) => {
            return {
                id: counter++,
                url: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
                favourite: false
            };
        });
    }

    fetchingImagesSuccess(metaData) {
        const photos = this.transformPhotoMetaData(metaData);
        return this.ngRedux.dispatch({
            type: FETCHING_IMAGES_SUCCESS,
            payload: {
                photos,
                metaData,
                display: 'images'
            }
        });
    }

    updateFavourite() {
        return this.ngRedux.dispatch({
            type: UPDATE_FAVOURITE
        });
    }

    updatePhotoFavourite(url: string) {
        return this.ngRedux.dispatch({
            type: UPDATE_PHOTO_FAVOURITE,
            payload: url
        });
    }
}
