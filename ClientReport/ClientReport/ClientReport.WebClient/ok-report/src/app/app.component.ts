import { Component, OnInit, ViewEncapsulation, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, style, animate, transition } from '@angular/animations';
import { AuthenticationService, AuditTrailService } from './shared/_services';
import { User } from './shared/_models';
import { MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { first } from 'rxjs/operators';
import { MfsUtilityService } from './services/mfs-utility.service';
import { GridSettingService } from './services/grid-setting.service';
import { UserIdleService } from 'angular-user-idle';
import { Subject } from 'rxjs';
import { ReportServiceService } from './services/report/report-service.service';
@Component({
  selector: 'app-root',
  animations: [
    trigger(
      'menu-annimation', [
        transition(':enter', [
          style({ transform: 'translateX(-120%)', opacity: 0.5 }),
          animate('400ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
        ]),
        transition(':leave', [
          style({ transform: 'translateX(0)', opacity: 1 }),
          animate('100ms ease-out', style({ transform: 'translateX(-60%)', opacity: 0.6 }))
        ])
      ]
    )
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentUser: any;
  leftMenuItems: MenuItem[] = [];
  settingItems: MenuItem[];
  showMenu: boolean;
  menuObj: any = {};

  promptChangePasswordModal: boolean;
  changePasswordModel: any;
  invalidCredentials: boolean;
  globalSearchModal: boolean;

  firstTimeChange: boolean;
  display: boolean;

  searchOptions: any = [];
  criteriaList: any = [];
  searchModel: any;
  searchGridConfig: any;
  isGridLoading: boolean = false;
  href: string;
  url: string;
  menuName: any;
  categoryName: any;
  userName: any;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private messageService: MessageService,
    private mfsUtilityService: MfsUtilityService,
    private gridSettingService: GridSettingService,
    private auditTrailService: AuditTrailService,
    private userIdle: UserIdleService,
    private reportService: ReportServiceService
  ) {

    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x;
      this.generateLeftMenu();
      if (this.currentUser && this.currentUser.user.pstatus == 'N') {
        this.firstTimeChange = true;
        this.promptChangePassword();
      }
    });
  }
  ngOnInit() {
    this.changePasswordModel = {};
    if (this.currentUser.user.mtype === 'I') {
      this.leftMenuItems = [
        {
          label: 'Report',
          icon: 'fas fa-file-archive',
          items: [
            { label: 'Transaction Report', icon: 'fa fa-file', routerLink: 'app-merchant-report' }
          ]
        }
      ];
    }
    else if (this.currentUser.user.mtype === 'CP') {
      this.leftMenuItems = [
        {
          label: 'Report',
          icon: 'fas fa-file-archive',
          items: [
            { label: 'Chain Merchant Report', icon: 'fa fa-file', routerLink: 'app-chain-merchant' }
          ]
        }
      ];
    }
    else {
      this.leftMenuItems = [
        {
          label: 'Report',
          icon: 'fas fa-file-archive',
          items: [
            { label: 'Child Merchant Report', icon: 'fa fa-file', routerLink: 'app-chid-merchant' }
          ]
        }
      ];

    }

  }
  logout() {
    this.leftMenuItems = [];
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
  generateLeftMenu(): any {

  }
  findMenuCategory(menuLabel) {
    var ret = this.leftMenuItems.find(function (obj) {
      return obj.label.trim() == menuLabel;
    });
    return ret;
  }
  promptChangePassword(): any {
    this.promptChangePasswordModal = true;
  }

  
  confirmPasswordChange() {
    this.changePasswordModel.ApplicationUserId = this.currentUser.user.id;
    this.authenticationService.changePassword(this.changePasswordModel).pipe(first())
      .subscribe(
        data => {
          if (data == 'Old Password is Invalid') {
            this.invalidCredentials = true;
          }
          else {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: this.currentUser.user.name + ' password changed Successfully' });
            this.promptChangePasswordModal = false;
            this.logout();
          }
        },
        error => {
          console.log(error);
          this.messageService.add({ severity: 'error', summary: 'Warning', detail: this.currentUser.user.name + ' password change unsuccessful' });
        });
  }
}
