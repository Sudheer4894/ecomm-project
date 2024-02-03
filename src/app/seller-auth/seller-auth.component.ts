import { Component } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { Login, SignUp } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {


  authError:string = '';
  constructor(private seller: SellerService, private router:Router){}

  showLogin=false;


  ngOnInit() {
    this.seller.reloadSeller();
  }

  signUp(data: SignUp):void {
    // console.log(data); 
    this.seller.userSignUp(data);
    // this.seller.userSignUp(data).subscribe((result)=>{
    //   if (result) {
    //     this.router.navigate(['seller-home']);
    //   }
    // });
  }

  login(data: Login): void{
    // console.log(data);
    this.authError = '';
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((isError)=>{
      if(isError){
        this.authError= "Email and passwor not mached!";
      }
    })
  }

  openLogin() {
    this.showLogin = true;
  }

  openSignUp(){
    this.showLogin = false;
  }
}
