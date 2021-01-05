import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { global } from '../../services/global';
import { Post } from 'src/app/models/post';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  public url;
  public posts: Array<Post>;
  public identity;
  public status: string
  public token;
  public id;
  public user: User;

  constructor(private _postService: PostService,
              private _userService: UserService,
              private _route: ActivatedRoute) {
    this.url = global.url;
    this.identity = _userService.getIdentity();
    this.token = _userService.gettoken();
  }

  ngOnInit(): void {
   this.getProfile();
  }

  getProfile(){
     // sacar el id del post
     this._route.params.subscribe( 
      params=> {
        this.id = params['id'];
        this.getPosts(this.id);
        this.getUser(this.id);
      });
  }

  getUser(userId){
    this._userService.getUser(userId).subscribe(
      resp=>{
        if(resp.status == 'success'){
          this.user = resp.user;
          this.status = 'success';
        }
      },
      error=>{
        this.status = 'error';
        console.log(<any>error);
      }
    );
  }

  getPosts(userId){
    //peticion ajax para sacar los datos del post
    this._userService.getPosts(userId).subscribe(
      resp=>{
        if(resp.status == 'success'){
          this.posts = resp.posts;
          this.status = 'success';
        }
      },
      error=>{
        this.status = 'error';
        console.log(<any>error);
      }
    );
  }

  deletePost(id){
    this._postService.delete(this.token, id).subscribe(
      resp => {
        if(resp.status == 'success'){
          this.getPosts(this.id);
          this.status = 'success';
        } else {
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      }
    );
  }

}
