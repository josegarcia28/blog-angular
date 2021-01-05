import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { ActivatedRoute, Router } from '@angular/router';
import { global } from '../../services/global';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styles: [
  ]
})
export class PostDetailComponent implements OnInit {

  public post: Post;
  public url;
  public identity;

  constructor(private _postService: PostService,
              private _route: ActivatedRoute,
              private _router: Router,
              private _userService: UserService) { }

  ngOnInit(): void {
    this.url = global.url;
    this.getPost();
    this.identity = this._userService.getIdentity();
  }
  
  getPost(){
    // sacar el id del post
    this._route.params.subscribe( 
      params=> {
        let id = params['id'];
        //peticion ajax para sacar los datos del post
        this._postService.getPost(id).subscribe(
          resp=> {
            if(resp.status == 'success'){
              this.post = resp.posts;  
              console.log(this.post);
            } else {
              this._router.navigate(['/inicio']);
            }
          },
          error => {
            console.log(<any>error);
            this._router.navigate(['/inicio']);
          }
        );
      });
  }

}
