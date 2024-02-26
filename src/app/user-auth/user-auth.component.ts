import { Component } from '@angular/core';
import { Login, SignUp } from '../data-type';
import { UserService } from '../services/user.service';
import { faL } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {

  showLogin:boolean=true;

  constructor(private user: UserService){}

  ngOnInit(): void {
    this.user.userAuthReload();
  }

  signUp(data: SignUp){
    // console.log("Sign Up Data",data);
    this.user.userSignUp(data);
  }

  login(data: Login){
    this.user.userLogin(data);
    this.user.userAuthReload()
  }

  openLogin(){
    this.showLogin = true;
  }

  openSignUp(){
    this.showLogin = false;
  }
}
