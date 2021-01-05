import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Category } from '../../models/category';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.css']
})
export class CategoryNewComponent implements OnInit {
  public page_title: string;
  public identity;
  public token;
  public category: Category;
  public status: string;

  constructor(private _userService: UserService,
              private _route: ActivatedRoute,
              private _router: Router,
              private _categoryService: CategoryService) { 
    this.page_title = 'Crear nueva Categoria';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.gettoken();
    this.category = new Category(1, '');
  }

  ngOnInit(): void {
  }

  onSubmit(form){
    this._categoryService.create(this.category, this.token).subscribe(
      resp=>{
        if(resp.status == 'success'){
          this.category = resp.category;
          this.status = 'success';
          this._router.navigate(['/inicio']);
        } else {
          this.status = 'error';
        }
      },
      error=>{
        this.status = 'error';
        console.log(<any>error);
      }
    );
  }
}
