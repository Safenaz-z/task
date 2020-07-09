import { Component, OnInit, Inject } from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  AbstractControl,
  FormControl
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {
  editForm: FormGroup;
  user_edit: any={}; 
  imgURL: any;
  public message: string;
  userImageUploads: any = []
  public imagePath;
  fileToUpload: File = null;
  imageChangedEvent: any = '';
  user_image: any
userName:any
userPhone:any
userEmail:any
userImageChanged:any
  constructor( private formBuilder: FormBuilder, public dialogRef: MatDialogRef < EditModalComponent > ,
    @Inject(MAT_DIALOG_DATA) public dialougeData: any, private toastr: ToastrService) { 
    this.editForm = this.formBuilder.group({
      mobile: ['', Validators.compose([Validators.required, Validators.pattern('^[0]1[0-2|5]{1}[0-9]{8}|^[1][0-2|5]{1}[0-9]{8}')])],
      email: ['', Validators.pattern('[A-Za-z0-9._%+-]{1,}@[a-zA-Z]{2,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})')],
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
    
    }, {
      updateOn: 'submit'
    })


    this.editForm = new FormGroup(this.editForm.controls, {
      updateOn: 'submit'
    });
    console.log(dialougeData);
    this.user_edit = this.dialougeData;
  }

  ngOnInit() {
  }
  fileChangeEvent(files: FileList) {
    console.log('files');
    console.log(files);

    var userImage: {
      profilePic: File,
      img_name: string
    } = {
      profilePic: null,
      img_name: this.user_edit.id+'_'+'car'
    };
    console.log(this.userImageUploads)
    if (files.length === 0)
      return;
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
      this.user_edit.image = this.imgURL
      this.fileToUpload = files.item(0);
      console.log(this.fileToUpload)
      this.imageChangedEvent = event;
      this.user_image = this.user_edit.id+'_'+'driver';

      userImage.img_name = this.user_image
      userImage.profilePic = this.fileToUpload

      let index = this.userImageUploads.findIndex((img) =>
        img.img_name == this.user_image
      )
      console.log(index)
      console.log(this.user_image)
      console.log(this.userImageUploads)


      if (index == -1) {
        this.userImageUploads.push(userImage)
        console.log(this.userImageUploads)
      } else {
        this.userImageUploads[index].profilePic = this.fileToUpload
        console.log(this.userImageUploads)
      }
     // console.log(this.userImageUploads)
      userImage.profilePic = this.fileToUpload
      //  this.userImageUploads.push(userImage)
     //   console.log(this.userImageUploads)
      } 
      console.log(this.userImageUploads)

    
    this.imageChangedEvent = event;

  }
  nameChange(inputchange) {
    console.log(inputchange)
this.userName=inputchange
  }
  mobileChange(mobile){
    this.userPhone=mobile

  }
  emailChange(email){
    this.userEmail=email

  }
  saveData(){
    var editdata: any = []

    if (this.editForm.invalid == true) {
      this.markFormGroupTouched(this.editForm);
    } 
   /*    if (this.user_edit.mobile[0] == '0') {
        this.user_edit.mobile = this.user_edit.mobile.substring(1);
        console.log(this.user_edit.mobile);
      } */
else{
  this.dialogRef.close({newData:this.user_edit});
}

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  private markFormGroupTouched(formGroup: FormGroup) {
    ( < any > Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);

      }
    });

  }
}
