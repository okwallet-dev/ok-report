import { MfsUtilityService } from 'src/app/services/mfs-utility.service';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/_services';
import { first } from 'rxjs/operators';
import { ReportUtilityService } from 'src/app/services/report/report-utility.service';
import { MfsSettingService } from '../../../../../services/mfs-setting.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-agent-dsr-list',
  templateUrl: './agent-dsr-list.component.html',
  styleUrls: ['./agent-dsr-list.component.css']
})
export class AgentDsrListComponent implements OnInit {
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
    this.model.ReportName = 'Agent Dsr List Report';
  }
  getReportParam() {
    if (this.validate()) {
      var obj: any = {};
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
      this.reportUtilityService.generateReport(this.setting.reportApiServer + '/DistributorPortal/GetAgentDsrListByPmphone', this.reportObject).pipe(first())
        .subscribe(
          data => {
            if (data) {
              var today = new Date();
              this.pdf.source = data;
              this.pdf.ext = this.reportObject.fileType;
              this.pdf.fileName = 'Agent Dsr List' + today;
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
    if (!this.model.mphone) {
      return false;
    }
    return true;
  }
  cancel() {
    window.history.back();
  }
}
