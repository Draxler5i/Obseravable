import { Observable, Subscriber } from 'rxjs';
import axios from 'axios';
import axiosCancel from 'axios-cancel';
// adds cancel prototype method

axiosCancel( axios );
class AxiosSubscriber extends Subscriber {
    constructor( observer ) {
        super( observer );
        // create sample request id
        this.requestId = Math.random() + '-xhr-id';
        // XHR complete pointer
        this.completed = false;
        // make axios request on subscription
        axios.get( 'https://jsonplaceholder.typicode.com/users', {
            requestId: this.requestId
        } )
        .then( ( response ) => {
            observer.next( response.data );
            this.completed = true;
            observer.complete();
        } )
        .catch( ( error ) => {
            this.completed = true;
            observer.error( error );
        } );
    }
    unsubscribe() {
        super.unsubscribe();
        
        // cancel XHR
        if( this.completed === false ) {
            axios.cancel( this.requestId );
            this.completed = true;
        }
    }
}
let observable$ = new Observable( ( observer ) => {
    return new AxiosSubscriber( observer );
} );
let subscription = observable$.subscribe( console.log );

export default AxiosSubscriber;