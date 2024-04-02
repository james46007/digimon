import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {FireService} from "../services/firebase/fire.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm!: FormGroup;

  constructor(
    public router: Router,
    public fireService: FireService,
    private _formBuilder: FormBuilder,
  ) {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$")]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get loginF() {
    return this.loginForm.controls;
  }

  login() {
    if (this.loginForm.invalid) {
      return alert('Campos invalidos');
    }
    this.fireService.loginWithEmail(this.loginForm.value).then((res: any) => {
      localStorage.setItem('currentUser', JSON.stringify(res.user));
      if (!res.user.emailVerified) {
        return alert('Verifica correo para iniciar sesion.');
      }

    }).catch((err: any) => {
      alert('Credenciales incorrectas');
    });
  }

  signup(): void {
    this.router.navigateByUrl('/singup');
  }
}
