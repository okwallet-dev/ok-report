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
  isMasterWallet: boolean = false;
  isDistributor: boolean = false;
  isMerchant: boolean = false;
  isLoading: boolean = false;
  showBalanceModal: boolean = false;
  constructor(private authenticationService: AuthenticationService, private reportService: ReportServiceService) {
    this.authenticationService.currentUser.subscribe(x => {
      this.currentUserModel = x;
    });
  }

  ngOnInit() {
    this.getMerchantKycInfoByMphone();
    if (this.currentUserModel) {
      if (this.currentUserModel.user.mtype === 'MW') {
        this.isMasterWallet = true;
        this.getCurrentBalance();      
      }
      if (this.currentUserModel.user.mtype === 'D') {
        this.isDistributor = true;
        this.getAllDsrBalance();
        this.getDistPortalInfo();
        this.getComissionBalance();
      }
      if (this.currentUserModel.user.mtype === 'I' || this.currentUserModel.user.mtype === 'PM' || this.currentUserModel.user.mtype === 'CM') {
        this.isMerchant = true;        
      }
    }
  }
  openModal(event) {
    switch (event) {
      case 'blnc-rpt':
        this.showBalanceModal = true;
        break;
     
      default:
        break;
    }
  }
  getDistPortalInfo() {
    this.isLoading = true;
    this.reportService.getDistPortalInfo(this.currentUserModel.user.mobileNo).pipe(first())
      .subscribe(
        data => {
          if (data) {
            this.dashboardModel.DsrCount = data.DsrCount;
            this.dashboardModel.DsrBalance = data.DsrBalance;
            this.dashboardModel.AgentCount = data.AgentCount;
            this.dashboardModel.AgentBalance = data.AgentBalance;
            this.isLoading = false;
          }
          else {
            this.isLoading = false;
          }

        },
        error => {
          this.isLoading = false;
          console.log(error)
        });
  }
  getAllDsrBalance() {
    this.isLoading = true;
    this.reportService.getCurrentBalance(this.currentUserModel.user.mobileNo).pipe(first())
      .subscribe(
        data => {
          if (data) {
            this.dashboardModel.balance = data;
            this.isLoading = false;
          }
          else {
            this.isLoading = false;
          }

        },
        error => {
          this.isLoading = false;
          console.log(error)
        });
  }
  getCurrentBalance() {
    this.isLoading = true;
      this.reportService.getCurrentBalance(this.currentUserModel.user.mobileNo).pipe(first())
        .subscribe(
          data => {
            if (data) {
              this.dashboardModel.balance = data;
              this.isLoading = false;
            }
            else {
              this.isLoading = false;
            }

          },
          error => {
            this.isLoading = false;
            console.log(error)
          });
  }
  getComissionBalance() {
    this.isLoading = true;
    this.reportService.getComissionBalance(this.currentUserModel.user.mobileNo).pipe(first())
      .subscribe(
        data => {
          if (data) {
            this.dashboardModel.comBalance = data;
            this.isLoading = false;
          }
          else {
            this.isLoading = false;
          }

        },
        error => {
          this.isLoading = false;
          console.log(error)
        });
  }
  getMerchantKycInfoByMphone() {
    this.isLoading = true;
    this.reportService.getMerchantKycInfoByMphone(this.currentUserModel.user.mobileNo).pipe(first())
      .subscribe(
        data => {
          if (data) {
            this.dashboardModel.companyName = data.CompanyName;
            this.isLoading = false;
          }
          else {
            this.isLoading = false;
          }

        },
        error => {
          this.isLoading = false;
          console.log(error)
        });
  }


}
