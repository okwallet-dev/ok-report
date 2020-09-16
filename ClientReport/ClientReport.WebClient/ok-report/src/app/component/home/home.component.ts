import { Component, OnInit } from '@angular/core';
import { ReportServiceService } from '../../services/report/report-service.service';
import { AuthenticationService } from 'src/app/shared/_services';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUserModel: any = {};
  dashboardModel: any = {};
  constructor(private authenticationService: AuthenticationService, private reportService: ReportServiceService) {
    this.authenticationService.currentUser.subscribe(x => {
      this.currentUserModel = x;
    });
  }

  ngOnInit() {
    this.getMerchantKycInfoByMphone();
  }
  getMerchantKycInfoByMphone() {
    this.reportService.getMerchantKycInfoByMphone(this.currentUserModel.user.mobileNo).pipe(first())
      .subscribe(
        data => {
          if (data) {
            this.dashboardModel.companyName = data.CompanyName;
          }
          else {
           
          }

        },
        error => {
          console.log(error)
        });
  }


}
