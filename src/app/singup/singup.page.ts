import {Component, OnInit} from '@angular/core';
import {FireService} from "../services/firebase/fire.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-singup',
  templateUrl: './singup.page.html',
  styleUrls: ['./singup.page.scss'],
})
export class SingupPage {
  registreForm!: FormGroup;

  constructor(
    public router: Router,
    public fireService: FireService,
    private _formBuilder: FormBuilder,
  ) {
    this.registreForm = this._formBuilder.group({
      uid: ['', []],
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$")]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get registreF() {
    return this.registreForm.controls;
  }

  signup() {
    this.fireService.signup(this.registreForm.value).then((res: any) => {
      if (res.user.uid) {
        this.registreForm.get('uid')?.setValue(res.user.uid);
        this.fireService.sendVerificationEmail();
        this.fireService.saveDetails(this.registreForm.value).then((res: any) => {
          alert('¡Cuenta creada!');
          this.router.navigateByUrl('/login')
        }, (err: any) => {
          console.log(err);
        })
      }
    }, (err: any) => {
      alert(err.message);
      console.log(err);
    })
  }

}
