
import { MfsUtilityService } from 'src/app/services/mfs-utility.service';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/_services';
import { first } from 'rxjs/operators';
import { ReportUtilityService } from 'src/app/services/report/report-utility.service';
import { MfsSettingService } from '../../../../services/mfs-setting.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-merchant-report',
  templateUrl: './merchant-report.component.html',
  styleUrls: ['./merchant-report.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MerchantReportComponent implements OnInit {

  @ViewChild('mfsPdfViewer') pdfViewer;
  @ViewChild('form') childForm;
  isLoading: boolean = false;
  pdf: any;
  currentUserModel: any = {};
  entityId: any;
  reportObject: any;
  fileOptionList: any;
  model: any;

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
  }


  ngOnInit() {
  }
  getReportParam() {
    if (this.validate()) {
      var obj: any = {};
      obj.fromDate = this.mfsUtilityService.renderDate(this.model.fromDate, true);
      obj.toDate = this.mfsUtilityService.renderDate(this.model.toDate, true);
      obj.mphone = this.model.mphone;
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
      //console.log(this.reportObject);
      this.reportUtilityService.generateReport(this.setting.reportApiServer + '/Report/ClientReport', this.reportObject).pipe(first())
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

  validate(): any {
    if (!this.model.fromDate || !this.model.toDate || !this.model.mphone) {
      return false;
    }
    else {
      return true;
    }
  }
}
