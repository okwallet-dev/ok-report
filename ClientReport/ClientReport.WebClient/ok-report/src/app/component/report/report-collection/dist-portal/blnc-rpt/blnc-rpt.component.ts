import { MfsUtilityService } from 'src/app/services/mfs-utility.service';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/_services';
import { first } from 'rxjs/operators';
import { ReportUtilityService } from 'src/app/services/report/report-utility.service';
import { MfsSettingService } from '../../../../../services/mfs-setting.service';
import { MessageService } from 'primeng/api';
import { GenericGridComponent } from 'src/app/shared/directives/generic-grid/generic-grid.component';
import { GridSettingService } from '../../../../../services/grid-setting.service';


@Component({
  selector: 'app-blnc-rpt',
  templateUrl: './blnc-rpt.component.html',
  styleUrls: ['./blnc-rpt.component.css']
})
export class BlncRptComponent implements OnInit {

  @ViewChild('mfsPdfViewer') pdfViewer;
  @ViewChild('form') childForm;
  gridConfig: any;
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
  @ViewChild(GenericGridComponent) child: GenericGridComponent;
  constructor(private authenticationService: AuthenticationService,
    private reportUtilityService: ReportUtilityService,
    private mfsUtilityService: MfsUtilityService,
    private router: Router,
    private route: ActivatedRoute,
    private mfsSettingService: MfsSettingService,
    private messageService: MessageService,
    private gridSettingService: GridSettingService) {
    this.gridConfig = {};
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
    this.initialiseGridConfig();
  }
  initialiseGridConfig(): any {
    this.gridConfig.dataSource = [];
    this.gridConfig.gridName = 'Balance Info';
    this.gridConfig.gridIconClass = 'fas fa-list';
    this.gridConfig.customFilterOptionPath = this.mfsSettingService.reportApiServer + '/DistributorPortal/GetFilteringListForDdl';
    this.gridConfig.dataSourcePath = this.mfsSettingService.reportApiServer + '/DistributorPortal/GetBalanceInformation?mphone=' + this.currentUserModel.user.mobileNo +'&filterId=';
    this.gridConfig.autoUpdateDataSource = true;
    this.gridConfig.showUniversalFilter = true;
    this.gridConfig.reportName = 'Balance Info';
    this.gridConfig.columnList = [
      { field: 'MPHONE', header: 'A/C No', width: '10%' },
      { field: 'NAME', header: 'Name', width: '10%', filter: this.gridSettingService.getDefaultFilterable() },
      { field: 'PMPHONE', header: 'Distributor No', width: '10%', filter: this.gridSettingService.getDefaultFilterable() },
      { field: 'BALANCE', header: 'Balance', width: '7%', filter: this.gridSettingService.getFilterableNone() }
    ];
  };
}
