import {Promise} from 'es6-promise';
import 'whatwg-fetch';

export class API {

  constructor( baseUrl ) {
    this.baseUrl = baseUrl;
  }

  get( endPoint ) {
    return $.ajax(this.fullURL(endPoint))
            .catch( this.parseResponse );
  }

  post( endPoint, data ) {
      let postbody = {...data};

    return fetch( this.fullURL(endPoint), {
      method: 'POST',
      body: JSON.stringify(postbody)
    })
    .then( (response) => response.json() )
    .then( this.parseResponse )

  }

  parseResponse( response ) {
    //Because json is bad formatted
    try {
        response.data = JSON.parse(response.responseText);
    } catch(e) {
        if ((response.readyState == 4) && (response.status == 200)) {
            let str = response.responseText;
            while ((str[0] != '\n') && (str.length)) {
                str = str.slice(1, str.length);
            }
            str = str.slice(1, str.length);
            response.data = JSON.parse(str);
        }
    }

    if( response.data ) {
      return Promise.resolve({success: true, data: response.data});
    }
    else {
      return Promise.reject({ success: false, data: response.meta.error});
    }
  }

  fullURL( endPoint ) {
    return this.baseUrl + endPoint;
  }

}

class LocalStore {
    save( key, value ) {
        try {
          localStorage.setItem(key, JSON.stringify(value));
          return true;
        } catch(e) { return false; }
    }

    remove( key ) {
        if (this.read(key)) {
          localStorage.removeItem(key);
          return true;
        } else return false;
    }

    read( key ) {
        return JSON.parse(localStorage.getItem( key ));
    }
}
