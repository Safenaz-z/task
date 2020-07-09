import { ToastrService } from 'ngx-toastr';

import { Component, NgZone } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'task';
  LoggedIn:string
  constructor(private toastr: ToastrService,private zone: NgZone,private router: Router) {
    this.LoggedIn= localStorage.getItem('isLoggedIn')
    console.log(this.LoggedIn)
    if( this.LoggedIn =="true"){
      this.router.navigate(['/dashboard']);

    }
    else{
      this.router.navigate(['/login']);

    }
  }
 
  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }
 
}
