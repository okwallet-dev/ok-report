import { MfsUtilityService } from 'src/app/services/mfs-utility.service';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/_services';
import { first } from 'rxjs/operators';
import { ReportUtilityService } from 'src/app/services/report/report-utility.service';
import { MfsSettingService } from '../../../../services/mfs-setting.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-chid-merchant',
  templateUrl: './chid-merchant.component.html',
  styleUrls: ['./chid-merchant.component.css']
})
export class ChidMerchantComponent implements OnInit {

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
  summaryTypeList: any;
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
    this.typeList = [
      { label: 'Outlet Details Transaction Report', value: 'ODTR' },
      { label: 'Outlet Summary Transaction Report', value: 'OSTR' },
      //{ label: 'Outlet To Parent Transaction Report', value: 'OTPTR' },
      { label: 'Daily Summary  Report', value: 'DSR' }
    ];
    this.summaryTypeList = [
      { label: 'Transaction Date', value: 'TD' },
      { label: 'Outlet', value: 'O' }
    ];
    console.log("Child mer");
  }
  getReportParam() {
    if (this.validate()) {
      var obj: any = {};
      obj.fromDate = this.mfsUtilityService.renderDate(this.model.fromDate, true);
      obj.toDate = this.mfsUtilityService.renderDate(this.model.toDate, true);
      obj.mphone = this.model.mphone;
      //obj.selectedReportType = this.model.selectedReportType;
      this.reportObject.reportOption = JSON.stringify(obj);
      return true;
    }
    else {
      var obj: any = {};
      obj.isNotValidated = true;
    }
  }

  generateReport() {
    if (this.getReportParam()) {
      if (this.model.selectedReportType === 'ODTR') {
        this.isLoading = true;
        this.reportUtilityService.generateReport(this.setting.reportApiServer + '/Report/OutletDetailsTransReport', this.reportObject).pipe(first())
          .subscribe(
            data => {
              if (data !== 'NOTM') {
                this.pdf.source = data;
                this.pdf.ext = this.reportObject.fileType;
                this.pdf.fileName = 'Account Statement';
                this.isLoading = false;
                this.pdfViewer.refreshReport();
              }
              else {
                this.isLoading = false;
                this.messageService.add({ severity: 'error', summary: 'Warning', detail: 'Put a merchant account' });
              }

            },
            error => {
              this.isLoading = false;
            });
      }
      if (this.model.selectedReportType === 'OSTR' && this.model.selectedReportTypeOption === 'TD') {
        this.isLoading = true;
        this.reportUtilityService.generateReport(this.setting.reportApiServer + '/Report/OutletSumTransReportByTranDate', this.reportObject).pipe(first())
          .subscribe(
            data => {
              if (data !== 'NOTM') {
                this.pdf.source = data;
                this.pdf.ext = this.reportObject.fileType;
                this.pdf.fileName = 'Account Statement';
                this.isLoading = false;
                this.pdfViewer.refreshReport();
              }
              else {
                this.isLoading = false;
                this.messageService.add({ severity: 'error', summary: 'Warning', detail: 'Put a merchant account' });
              }

            },
            error => {
              this.isLoading = false;
            });
      }
    }
  }

  validate(): any {
    if (!this.model.fromDate || !this.model.toDate || !this.model.mphone || !this.model.selectedReportType) {
      return false;
    }
    else {
      return true;
    }
  }

}
