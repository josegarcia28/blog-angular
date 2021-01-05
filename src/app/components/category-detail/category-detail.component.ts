import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from '../../services/category.service';
import { global } from '../../services/global';
import { Post } from '../../models/post';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';


@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styles: [
  ]
})
export class CategoryDetailComponent implements OnInit {
  public page_title: string;
  public url: string;
  public category: Category;
  public posts: Post;
  public status: string
  public identity;
  public token;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _categoryService: CategoryService,
              private _userService: UserService,
              private _postService: PostService) {
    this.url = global.url;
    this.identity = _userService.getIdentity();
    this.token = _userService.gettoken();
  }

  ngOnInit(): void {
    this.getPostsByCategory();
  }

  getPostsByCategory(){
    this._route.params.subscribe( resp=> {
      let id = +resp['id'];

      this._categoryService.getCategory(id).subscribe( resp=> {
        if(resp.status == 'success'){
          this.category = resp.category;
          this._categoryService.getPosts(id).subscribe(resp=>{
            if (resp.status == 'success'){
              this.posts = resp.posts;
              console.log(this.posts);
            } else {
              this.status = 'error';
              this._router.navigate(['/inicio']);
            }  
          }, error=> {
            console.log(error);
          });
          this.status = 'success';
        } else {
          this.status = 'error';
          this._router.navigate(['/inicio']);
        }
      }, error => {
        this.status = 'error';
        console.log(<any>error);
      });
    });
  }

  deletePost(id){
    this._postService.delete(this.token, id).subscribe(
      resp => {
        if(resp.status == 'success'){
          this.getPostsByCategory();
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
