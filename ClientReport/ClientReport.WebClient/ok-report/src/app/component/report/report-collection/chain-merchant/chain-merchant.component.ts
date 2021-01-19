import { MfsUtilityService } from 'src/app/services/mfs-utility.service';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/_services';
import { first } from 'rxjs/operators';
import { ReportUtilityService } from 'src/app/services/report/report-utility.service';
import { MfsSettingService } from '../../../../services/mfs-setting.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-chain-merchant',
  templateUrl: './chain-merchant.component.html',
  styleUrls: ['./chain-merchant.component.css']
})
export class ChainMerchantComponent implements OnInit {
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
    this.model.ReportName = 'Chain Merchant Transaction Report';
    this.typeList = [
      { label: 'Outlet Details Transaction Report', value: 'ODTR' },
      { label: 'Outlet Summary Transaction Report', value: 'OSTR' },
      { label: 'Outlet To Parent Transaction Report', value: 'OTPTR' }, 
      { label: 'Daily Summary  Report', value: 'DSR' }
    ];
    this.reportTypeList = [
      { label: 'Transaction Date', value: 'TD' },
      { label: 'Outlet', value: 'O' }  
    ];
    this.dateTypeList = [
      { label: 'Transaction Date', value: 'TD' },
      { label: 'EOD Date', value: 'EOD' }
    ];
  }
  onSelectReportType() {
    if (this.model.selectedReportType === 'OSTR' || this.model.selectedReportType === 'OTPTR') {
      this.isReportTypeView = false;
    }
    else {
      this.isReportTypeView = true;
      this.model.selectedReportTypeOption = null;
    }
  }
  getReportParam() {
    if (this.validate()) {
      var obj: any = {};
      obj.fromDate = this.mfsUtilityService.renderDate(this.model.fromDate, true);
      obj.toDate = this.mfsUtilityService.renderDate(this.model.toDate, true);
      obj.mphone = this.model.mphone;
      obj.reportType = this.model.selectedReportType;
      obj.reportViewType = this.model.selectedReportTypeOption;
      obj.dateType = this.model.selectedDateType;
      if (this.model.outletAccNo) {
        obj.outletAccNo = this.model.outletAccNo;
      }
      else {
        obj.outletAccNo = '';
      }
      if (obj.outletCode = this.model.outletCode) {
        obj.outletCode = this.model.outletCode;
      }
      else {
        obj.outletCode = '';
      }
      
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
        this.isLoading = true;
      this.reportUtilityService.generateReport(this.setting.reportApiServer + '/Report/ChainMerchantReport', this.reportObject).pipe(first())
          .subscribe(
            data => {
              if (data !== 'NOTM') {
                var today = new Date();
                this.pdf.source = data;
                this.pdf.ext = this.reportObject.fileType;
                this.pdf.fileName = 'Account Statement' + today;
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

  validate(): any {
    if (!this.model.fromDate || !this.model.toDate || !this.model.mphone || !this.model.selectedReportType) {
      return true;
    }
    else {
      return true;
    }
  }
  cancel() {
    window.history.back();
  }

}
