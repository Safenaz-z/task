import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { AddUserModalComponent } from '../add-user-modal/add-user-modal.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
users:any=[]
showUsers:boolean=false
changedArray:any={}
LoggedIn:string;

  constructor(public dialog: MatDialog , private router: Router) {
    this.changedArray=localStorage.getItem('userData')
   console.log( this.changedArray)
   }
   ShowTable(){
this.showUsers= true
   }
   openEditDialog(object: any): void {
    const dialogRef = this.dialog.open(EditModalComponent
      , {
      width: '250px',
      data: object,
      panelClass: 'myapp-no-padding-dialog',
      disableClose: true

    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){
        console.log(result.newData);
        const index = this.users.indexOf(result.newData);
  
  this.users[index] = result.newData;
  console.log(this.users)
  this.changedArray=this.users
      }
   
    });
    localStorage.removeItem('userData');
    localStorage.setItem('userData', this.changedArray);

  }
  ngOnInit() {
    this.users=[{
      id:1,
      name:'ahmed',
      phone:'01021399098',
      email:'mh@gmail.com',
      image:'/assets/avatar.png'
    },
    {
      id:2,
      name:'ahmed',
      phone:'01021399098',
      email:'mh@gmail.com',
      image:'/assets/avatar.png'
    },
    {
      id:3,
      name:'ahmed',
      phone:'01021399098',
      email:'mh@gmail.com',
      image:'/assets/avatar.png'
    },
    {
      id:4,
      name:'ahmed',
      phone:'01021399098',
      email:'mh@gmail.com',
      image:'/assets/avatar.png'
    }
  ]
  localStorage.setItem('userData', this.users);
  }
  addNewUser(): void {

    const dialogRef = this.dialog.open(AddUserModalComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){
        console.log(result.newData);
this.users.push(result.newData)
      }
    });
  }
  logout(): void {
    console.log("Logout");
    this.LoggedIn= localStorage.getItem('isLoggedIn')
    console.log(this.LoggedIn)
     this.LoggedIn="false"
     localStorage.removeItem('isLoggedIn')
      this.router.navigate(['/login']);
 
  }
}
