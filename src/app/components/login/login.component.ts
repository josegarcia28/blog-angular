import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public page_title: string;
  public user: User;
  public status: string;
  public token;
  public identity;

  constructor( private _userService: UserService,
               private _router: Router,
               private _route: ActivatedRoute) { 
    this.page_title = 'Identificate';
    this.user = new User(1,'', '', 'ROLE_USER', '', '', '', '');
  }

  ngOnInit(): void {
    // solo se ejecuta cuando le llega el paramatro por la url
    this.logout();
  }

  onSubmit(form){
    this._userService.singup(this.user).subscribe(
      resp => {
        // TOKEN
        if(resp.status != 'error'){
          this.status = 'success';
          this.token = resp;
          // OBJETO USUARIO IDENTIFICADO
          this._userService.singup(this.user, true).subscribe(
            resp => {
              this.identity = resp;
              console.log(this.token);
              console.log(this.identity);

              /// PERSISTIR DATOS DEL USUARIO
              localStorage.setItem('token', this.token);
              localStorage.setItem('identity', JSON.stringify(this.identity));

              // Redireccion 
              this._router.navigate(['inicio']);

              form.reset();
            }, 
            error => {
              this.status = 'error';
              console.log(<any>error);
            }
          );
        } else {
          this.status = 'error';
          console.log(resp);
        }
      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      }
    );
  }

  logout(){
    this._route.params.subscribe(resp => {
      let logout = +resp['sure'];

      if(logout == 1){
        localStorage.removeItem('identity');
        localStorage.removeItem('token');

        this.identity = null;
        this.token = null;

        // Redireccion 
        this._router.navigate(['inicio']);
      }
    });
  }
}
