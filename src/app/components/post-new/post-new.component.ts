import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { Post } from '../../models/post';
import { global } from '../../services/global';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styles: [
  ]
})
export class PostNewComponent implements OnInit {

  public page_title: string;
  public identity;
  public token;
  public status;
  public post: Post;
  public categories;
  public is_edit = false;

  public froalaOptions: Object = {
    charCounterCount: true,
    language: 'es',
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat']
  };

  public afuConfig = { 
    multiple: false,
    formatsAllowed: ".jpg,.png,.gif,.jpeg",
    maxSize: "50",
    uploadAPI:  {
      url: global.url+'post/upload',
      method:"POST",
      headers: {
        "Authorization" : this._userService.gettoken()
      },
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    fileNameIndex: false,
    attachPinText: 'Presione para cargar Archivo',
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Attach Files...',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !',
      sizeLimit: 'Size Limit'
    }
};

  constructor(private _router: Router,
              private _userService: UserService,
              private _categoryService: CategoryService,
              private _postService: PostService) { 

    this.page_title = 'Crear una entrada'
    this.identity = this._userService.getIdentity();
    this.token = this._userService.gettoken();

  }

  ngOnInit(): void {
    this.post = new Post(1, this.identity.sub, 1, '', '', null, null, '');
    this.getCategories();
    //console.log(this.post);
  }

  onSubmit(form){
    this._postService.create(this.token, this.post).subscribe(
      resp=>{
        if(resp.status == 'success'){
          this.post = resp.post;
          this.status = 'success';
          this._router.navigate(['/inicio']);
          //console.log(this.post);
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

  getCategories(){
    this._categoryService.getCategories().subscribe(
      resp=>{
        if(resp.status == 'success'){
          this.categories = resp.categories;
          console.log(this.categories);
        }
      }, 
      error=>{
        this.status = 'error';
        console.log(<any>error);
      }
    );
  }

  imageUpload(data){
    let image_data = JSON.parse(data.response);
    this.post.image = image_data.image;
  }

}
