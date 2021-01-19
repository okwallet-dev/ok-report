import { MfsUtilityService } from 'src/app/services/mfs-utility.service';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/_services';
import { first } from 'rxjs/operators';
import { ReportUtilityService } from 'src/app/services/report/report-utility.service';
import { MfsSettingService } from '../../../../services/mfs-setting.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-pathao-dash',
  templateUrl: './pathao-dash.component.html',
  styleUrls: ['./pathao-dash.component.css']
})
export class PathaoDashComponent implements OnInit {
  @ViewChild('mfsPdfViewer') pdfViewer;
  @ViewChild('form') childForm;
  isLoading: boolean = false;
  pdf: any;
  currentUserModel: any = {};
  entityId: any;
  reportObject: any;
  fileOptionList: any;
  model: any;
  typeList: any;
  reportTypeList: any;
  dateTypeList: any;
  isReportTypeView: boolean = true;
  isTransNoExist: boolean = false;
  constructor(private authenticationService: AuthenticationService,
    private reportUtilityService: ReportUtilityService,
    private mfsUtilityService: MfsUtilityService,
    private router: Router,
    private route: ActivatedRoute,
    private setting: MfsSettingService,
    private messageService: MessageService) {
    this.authenticationService.currentUser.subscribe(x => {
      this.currentUserModel = x;
    });

    this.pdf = {};
    this.reportObject = {};
    this.model = {};
    this.reportObject.fileType = 'PDF';
    this.fileOptionList = reportUtilityService.getFileExtensionList();
    this.model.mphone = this.currentUserModel.user.mobileNo;
  }

  ngOnInit() {
    this.model.ReportName = 'Pathao Account Transaction Report';
  }
  getReportParam() {
    if (this.validate()) {
      var obj: any = {};
      if (this.model.fromDate && this.model.toDate) {
        obj.fromDate = this.mfsUtilityService.renderDate(this.model.fromDate, true);
        obj.toDate = this.mfsUtilityService.renderDate(this.model.toDate, true);
        obj.transNo = null;
      }
      else {
        obj.fromDate = null;
        obj.toDate = null;
      }
      if (this.model.transNo) {
        obj.transNo = this.model.transNo;
      }
      else {
        obj.transNo = null;
      }
      obj.mphone = this.model.mphone;
      //if (this.model.transNo) {
      //  obj.transNo = this.model.transNo;
      //}
      //else {
      //  obj.transNo = '';
      //}    
      this.reportObject.reportOption = JSON.stringify(obj);
      return true;
    }
    else {
      var obj: any = {};
      obj.isNotValidated = true;
    }
  }
  disabledDatepicker() {
    if (this.model.transNo) {
      this.isTransNoExist = true;
      this.model.toDate = null;
      this.model.fromDate = null;

    }
    else {
      this.isTransNoExist = false;
    }
  }
  generateReport() {
    if (this.getReportParam()) {
      this.isLoading = true;
      this.reportUtilityService.generateReport(this.setting.reportApiServer + '/MasterWallet/MasterWalletStatement', this.reportObject).pipe(first())
        .subscribe(
          data => {
            if (data) {
              var today = new Date();
              this.pdf.source = data;
              this.pdf.ext = this.reportObject.fileType;
              this.pdf.fileName = 'Account Statement' + today;
              this.isLoading = false;
              this.pdfViewer.refreshReport();
            }
            else {
              this.isLoading = false;
            }

          },
          error => {
            this.isLoading = false;
          });

    }
  }

  validate(): any {
    if ((!this.model.fromDate || !this.model.toDate) && this.model.transNo) {
      return true;
    }
    if ((this.model.fromDate && this.model.toDate) && !this.model.transNo) {
      var gapDays = 0;
      gapDays = this.mfsUtilityService.diffBetweenDate(this.mfsUtilityService.renderDate(this.model.fromDate, true), this.mfsUtilityService.renderDate(this.model.toDate, true));
      if (gapDays > 31) {
        this.messageService.add({ severity: 'warn', summary: 'Long Date Interval', sticky: true, detail: 'Please Dont select the range more than One Month' });
        return false;
      }
      return true;
    }
    if (!this.model.fromDate || !this.model.toDate || !this.model.transNo) {
      return false;
    }
    else if (this.model.transNo && (this.model.fromDate || this.model.toDate)) {
      this.model.fromDate = null;
      this.model.toDate = null;
      return false;
    }
    else {
      var gapDays = 0;
      gapDays = this.mfsUtilityService.diffBetweenDate(this.mfsUtilityService.renderDate(this.model.fromDate, true), this.mfsUtilityService.renderDate(this.model.toDate, true));
      if (gapDays > 31) {
        this.messageService.add({ severity: 'warn', summary: 'Long Date Interval', sticky: true, detail: 'Please Dont select the range more than One Month' });
        return false;
      }
      return true;
    }
  }
  cancel() {
    window.history.back();
  }

}
