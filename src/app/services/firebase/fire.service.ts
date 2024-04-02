import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class FireService {
  constructor(
    public firestore: AngularFirestore,
    public auth: AngularFireAuth
  ) {
  }

  loginWithEmail({email, password}: { email: string, password: string }) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signup({email, password}: { email: string, password: string }) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  saveDetails({uid, ...data}: { uid: string, name: string, email: string, password: string }) {
    return this.firestore.collection("users").doc(uid).set(data);
  }

  sendVerificationEmail() {
    this.auth.currentUser.then(res => {
      res?.sendEmailVerification();
    });
  }
}
