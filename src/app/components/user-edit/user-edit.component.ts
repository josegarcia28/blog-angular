import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})

export class UserEditComponent implements OnInit {
  public page_title: string;
  public status: string;
  public user: User;
  public identity;
  public token;
  public url;

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
        url: global.url+'user/upload',
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
  

  constructor(private _userService: UserService) {
    this.page_title = 'Ajustes de usuario';
    this.user = new User(1,'', '', 'ROLE_USER', '', '', '','');
    this.identity = this._userService.getIdentity();
    this.token = this._userService.gettoken();
    this.url = global.url;

    // rellenar campos
    this.user = new User(
      this.identity.id,
      this.identity.name,
      this.identity.surname,
      this.identity.role,
      this.identity.email,'',
      this.identity.description,
      this.identity.image
     );
    
  }

  ngOnInit(): void {
    
  }

  onSubmit(form){
    this._userService.update(this.token, this.user).subscribe(
      resp => {
        if(resp && resp.status){
          this.status = 'success'
          // Actualizr los cambios en sesion
          if(resp.changes.name){
            this.user.name = resp.changes.name;
          }
          if(resp.changes.surname){
            this.user.surname = resp.changes.surname;
          }
          if(resp.changes.email){
            this.user.email = resp.changes.email;
          }
          if(resp.changes.description){
            this.user.description = resp.changes.description;
          }
          if(resp.changes.image){
            this.user.image = resp.changes.image;
          }
          this.identity = this.user;
          localStorage.setItem('identity', JSON.stringify(this.identity));

          
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

  avatarUpload(datos){
    let data = JSON.parse(datos.response);
    this.user.image = data.image;
  }
}
