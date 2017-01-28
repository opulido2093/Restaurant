import {Injectable} from '@angular/core';
import { Headers,Http, Response} from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';


@Injectable()
export class SaucerService{
    
    apiUrl = environment.API_URL //'https://stark-river-41252.herokuapp.com/api/';
    constructor(private http: Http){}

    getSaucers(restaurantId: string ){
       
        return this.http.get(this.apiUrl + 'restaurants/'+ restaurantId +'/saucers')
        .map((response: Response) => response.json())
        .toPromise();
    }

    getSaucer(saucerId: string){
        return this.http.get(this.apiUrl +'saucers/'+ saucerId)
        .map((response: Response) => response.json())
        .toPromise();
    }

    

}