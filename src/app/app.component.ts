import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';
import { global } from './services/global';
import { CategoryService } from './services/category.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck{
  public title = 'Blog de Angular';
  public identity;
  public token;
  public url;
  public categories;

  constructor( private _userService: UserService,
               private _categoryService: CategoryService){
    this.loadUser();
    this.url = global.url;
  }
    
  ngOnInit(): void {
    this.getCategories();
    
  }

  ngDoCheck(): void {
    
    this.loadUser();
  }

  loadUser(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.gettoken();
  }

  getCategories(){
    this._categoryService.getCategories().subscribe(
      resp=>{
        if(resp.status == 'success'){
          this.categories = resp.categories;
        }
      },
      error=>{
        console.log(<any>error);
      }
    )
  }
}
