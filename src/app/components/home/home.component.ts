import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { global } from '../../services/global';
import { Post } from 'src/app/models/post';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public page_title: string;
  public url;
  public posts: Array<Post>;
  public identity;
  public status: string
  public token;

  constructor(private _postService: PostService,
              private _userService: UserService) {
    this.page_title = 'home';
    this.url = global.url;
    this.identity = _userService.getIdentity();
    this.token = _userService.gettoken();
  }

  ngOnInit(): void {
    this.getPosts(); 
  }

  getPosts(){
    this._postService.getPosts().subscribe(
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
    )
  }

  deletePost(id){
    this._postService.delete(this.token, id).subscribe(
      resp => {
        if(resp.status == 'success'){
          this.getPosts();
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
