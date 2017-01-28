import {Injectable} from '@angular/core';
import { Headers,Http, Response} from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';

@Injectable()
export class CommentService{
    
    //private apiUrl = 'https://stark-river-41252.herokuapp.com/api/saucers/';
    private apiUrl = environment.API_URL +'/saucers/';

constructor(private http: Http) { }

getComments(saucersId: string){
        return this.http.get(this.apiUrl + saucersId + '/comments')
        .map((response: Response) => response.json()).toPromise();    
    }

sendComment(saucerId: string, data){
    data.date = new Date().toUTCString();

    let body = JSON.stringify(data);

    return this.http.post(this.apiUrl + saucerId +'/comments', data)
    .map((response: Response) => response.json()).toPromise();
  }



}