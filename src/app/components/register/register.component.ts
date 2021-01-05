import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public page_title: string;
  public user: User;
  public status: string;

  constructor( private _userServices: UserService) { 
    this.page_title = 'Registrate';
    this.user = new User(1,'', '', 'ROLE_USER', '', '', '', '');
    //this.user = new User('', '', '', '');
  }

  ngOnInit(): void {
    console.log(this._userServices.test());
  }

  onSubmit(form){
    this._userServices.register(this.user).subscribe(
      resp => {
        if(resp.status == 'success'){
          this.status = resp.status;
          form.reset();
        } else {
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      }
    )

  }
}
