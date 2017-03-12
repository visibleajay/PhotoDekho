
import { fromJS } from 'immutable';

import {
    TEXT_ENTERED, UPDATE_APP_DISPLAY, FETCHING_IMAGES_REQUEST,
    FETCHING_IMAGES_SUCCESS, UPDATE_FAVOURITE, UPDATE_PHOTO_FAVOURITE
} from './photo-dekho-actions';


export interface IPhotoMetaData {
    id: string;
    owner: string;
    secret: string;
    server: string;
    farm: number;
    title: string;
    ispublic: number;
    isfriend: number;
    isfamily: number;
}

export interface IPhoto {
    id: number;
    url: string;
    favourite: boolean;
}

export interface IHttpRequestInfo {
    method: string;
    api_key: string;
    content_type: string;
    format: string;
    nojsoncallback: string;
}

export interface IImageData {
    metaData: IPhotoMetaData[];
    photos: IPhoto[];
    display: string;
    favourite: boolean;
    httpRequestInfo: IHttpRequestInfo;
}

export interface IPhotoDekhoState {
    display: string;
    searchText: string;
    imageData: IImageData;
}

export const InitialState = fromJS({
    display: 'initial',
    searchText: '',
    imageData: {
        metaData: [],
        photos: [],
        display: '',
        favourite: false,
        httpRequestInfo: {
            method: 'flickr.photos.search',
            api_key: '6f498bba8cc614f878264d14812fca9d',
            content_type: '1',
            format: 'json',
            nojsoncallback: '1'
        }
    }
});

export function PhotoDekhoReducer(state = InitialState, action) {
    switch (action.type) {
        case TEXT_ENTERED:
            return state.set('searchText', action.payload);
        case UPDATE_APP_DISPLAY:
            return state.set('display', action.payload);
        case FETCHING_IMAGES_REQUEST:
            return state.updateIn(['imageData', 'display'], (data) => data = action.payload);
        case FETCHING_IMAGES_SUCCESS:
            return state.updateIn(['imageData'], (imageData) => imageData.mergeDeep(action.payload));
        case UPDATE_FAVOURITE:
            return state.updateIn(['imageData', 'favourite'], ( value ) => value = !value);
        case UPDATE_PHOTO_FAVOURITE:
            return state.updateIn(['imageData', 'photos', action.payload, 'favourite'], (value) => value = !value);
        default:
            return state;
    }
}
