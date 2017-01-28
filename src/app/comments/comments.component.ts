import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Subscription} from "rxjs/Rx";
import { SaucerService} from '../saucers/saucer.service';
import {CommentService} from './comment.service';
//import { RestaurantService} from '../restaurants/restaurant.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
  //providers: [CommentService, SaucerService, RestaurantService]
  providers: [CommentService, SaucerService ]
})
export class CommentsComponent implements OnInit, OnDestroy {

private saucerId: string = '';
private subscription: Subscription;
//private restaurantId: string = '';
//private restaurant = {};
private saucer = {};
private comments = [];
data = {};
private Success : boolean;
private Danger : boolean;

  constructor(private route: ActivatedRoute,
  private commentService: CommentService,
    private saucerService: SaucerService
    //private restaurantService: RestaurantService
    
  ) { }

  ngOnInit() {

    this.subscription = this.route.params.subscribe(
      (params: any ) => {
        //this.restaurantId = params.restaurantId;
       this.saucerId = params.id;
       
      //this.restaurantService.getRestaurant(this.restaurantId).then(response => this.restaurant = response);
     	
       
       this.commentService.getComments(this.saucerId).then(response => this.comments = response);

      this.saucerService.getSaucer(this.saucerId).then(response => this.saucer = response);

      }
    );

  }

  ngOnDestroy(){
  this.subscription.unsubscribe();
  }

  sendComment(e){
    this.commentService.sendComment(this.saucerId, this.data)
    .then(response => {
      this.comments.push(response);
      this.data = {};
      this.Success = true;
      this.Danger = false;
    }).catch(response => {
        this.Success = false;
      this.Danger = true;
    });
  }

}
