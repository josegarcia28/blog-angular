import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { Post } from '../../models/post';
import { global } from '../../services/global';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: '../post-new/post-new.component.html',
  styles: [
  ]
})
export class PostEditComponent implements OnInit {

  public page_title: string;
  public identity;
  public token;
  public status;
  public post: Post;
  public categories;
  public is_edit = true;
  public dire: string;

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
  }

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _userService: UserService,
              private _categoryService: CategoryService,
              private _postService: PostService) { 

    this.page_title = 'Editar una entrada'
    this.identity = this._userService.getIdentity();
    this.token = this._userService.gettoken();
    this.dire = global.url;
  }

  ngOnInit(): void {
    this.post = new Post(1, this.identity.sub, 1, '', '', null, null, '');
    this.getCategories();
    this.getPost();
  }

  onSubmit(form){
    this._postService.update(this.token, this.post, this.post.id).subscribe(
      resp=>{
        if(resp.status == 'success'){
          this.status = 'success';
          this._router.navigate(['/entrada', this.post.id]);
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
          //console.log(this.categories);
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
              if(this.post.user_id != this.identity.sub){
                this._router.navigate(['/inicio']);
              }
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
