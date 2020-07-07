import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, AuthenticationService } from '../../../shared/_services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: []
})
export class LoginComponent implements OnInit {

  description: string;
  loginModel: any;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  invalidCredentials: boolean = false;

  failedAttemptsCount: number = 0;
  fixedUserName: boolean = false;
  lockDownState: boolean = false;
  forceLocklockDownState: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private elementRef: ElementRef) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }

  }

  ngOnInit() {
    this.loginModel = {};
  }

  onSignIn() {
    this.loading = true;
    this.authenticationService.login(this.loginModel)
      .pipe(first())
      .subscribe(
        data => {
          if (data.isAuthenticated) {
            location.reload();
          }
          else {
            this.loading = false;
            if (data.user.pstatus == 'L') {
              this.loginModel.fullName = data.user.name;
              this.lockDownState = true;
              this.invalidCredentials = false;
            }
            else if (data.user.logInStatus == 'N') {
              this.loginModel.fullName = data.user.name;
              this.forceLocklockDownState = true;
              this.invalidCredentials = false;
            }
            else {
              this.invalidCredentials = true;
              //this.proceedToLockout(data);
            }
          }

        },
        error => {
          this.loading = false;
          console.log(error);
          this.invalidCredentials = true;
        });
  }

}
