import {
  Component,
  OnInit,
  Inject
} from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  AbstractControl,
  FormControl
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material';
import {
  ToastrService
} from 'ngx-toastr';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.scss']
})
export class AddUserModalComponent implements OnInit {
  userForm: FormGroup;
  imgURL: any;
  public message: string;
  public imagePath;
  fileToUpload: File = null;
  imageChangedEvent: any = '';
  account: {
    password: string,
    name: string,
    phone: string,
    email: string,
    image: any
  } = {
    password: '',
    name: '',
    phone: '',
    email: '',
    image: ''
  };
  error_messages = {

    'password': [
      { type: 'required', message: 'password is required.' },
      { type: 'minlength', message: 'password length.' },
      { type: 'maxlength', message: 'password length.' }
    ],
    'confirmpassword': [
      { type: 'required', message: 'password is required.' },
      { type: 'minlength', message: 'password length.' },
      { type: 'maxlength', message: 'password length.' }
    ],
  }
  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef < AddUserModalComponent > ,
    @Inject(MAT_DIALOG_DATA) public dialougeData: any, private toastr: ToastrService) {
    this.userForm = this.formBuilder.group({
      phone: ['Mobile Number', Validators.compose([Validators.required, Validators.pattern('^(^[0]1[0-2|5]{1}[0-9]{8}|^[1][0-2|5]{1}[0-9]{8})$')])],
      email: ['', Validators.pattern('[A-Za-z0-9._%+-]{1,}@[a-zA-Z]{2,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})')],
      name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(25), Validators.pattern('^[أ-يa-zA-Z ]*$')])],
      //At least 8 characters in length
      //Lowercase letters
      //Uppercase letters
      //Numbers
      //Special characters  
    /*   password: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(25),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
      ])],
      confirmPassword: ['', Validators.required] */
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'),

        Validators.minLength(6),
        Validators.maxLength(30)
      ])),
      confirmpassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ]))
    }, {
      updateOn: 'submit',
      validators: this.password.bind(this)
    })


  }
  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmpassword');
    return password === confirmPassword ? null : { message:' Password do not match' };
  }
  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPassword').value;
console.log(pass === confirmPass)
    return pass === confirmPass ? null : {
      notSame: true
    }
  }
  private markFormGroupTouched(formGroup: FormGroup) {
    ( < any > Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
  goToConfirm() {

    // this.navCtrl.push(ConfirmAccountPage);
    if (this.userForm.invalid == true) {
      this.toastr.error("Error!", " please try again")
      this.markFormGroupTouched(this.userForm);
    } else {
      console.log(this.account)
      this.dialogRef.close({
        newData: this.account
      });

    }
  }
  addNewImage(files: FileList) {
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
      // console.log(i)
      this.account.image = this.imgURL

      this.fileToUpload = files.item(0);
      console.log(this.fileToUpload)
      this.imageChangedEvent = event;


    }
    this.imageChangedEvent = event;

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {}

}
