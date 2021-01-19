import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AlertComponent } from './shared/_components';
import { ErrorComponent } from './shared/_components/error/error.component';
import { UppercaseDirective } from './shared/directives/uppercase.directive';
import { AuthorizeButtonComponent } from './shared/directives/authorize-button/authorize-button.component';
import { GenericFormActionComponent } from './shared/directives/generic-form-action/generic-form-action.component';
import { GenericGridComponent } from './shared/directives/generic-grid/generic-grid.component';
import { GenericStepperFormActionComponent } from './shared/directives/generic-stepper-form-action/generic-stepper-form-action.component';
import { MfsDatepickerComponent } from './shared/directives/mfs-datepicker/mfs-datepicker.component';
import { BdtCurrencyPipe } from './shared/filter-pipes/bdt-currency.pipe';
import { ClientCategoryPipe } from './shared/filter-pipes/client-category.pipe';
import { GenderCheckPipe } from './shared/filter-pipes/gender-check.pipe';
import { ReportTypePipe } from './shared/filter-pipes/report-type.pipe';
import { SecuredDataPipe } from './shared/filter-pipes/secured-data.pipe';
import { StatusCheckPipe } from './shared/filter-pipes/status-check.pipe';
import { YesNoPipe } from './shared/filter-pipes/yes-no.pipe';


import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

import { SlideMenuModule } from 'primeng/slidemenu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ChartModule } from 'primeng/chart';
import { TreeModule } from 'primeng/tree';
import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { MegaMenuModule } from 'primeng/megamenu';
import { StepsModule } from 'primeng/steps';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { FieldsetModule } from 'primeng/fieldset';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { KeyFilterModule } from 'primeng/keyfilter';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { PasswordModule } from 'primeng/password';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { TabViewModule } from 'primeng/tabview';
import { TabMenuModule } from 'primeng/tabmenu';
import { AccordionModule } from 'primeng/accordion';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { TreeTableModule } from 'primeng/treetable';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { CarouselModule } from 'primeng/carousel';
import { SidebarModule } from 'primeng/sidebar';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { CheckboxModule } from 'primeng/checkbox';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/security/login/login.component';
import { ReportListComponent } from './component/report/report-list/report-list.component';
import { ReportDetailsComponent } from './component/report/report-details/report-details.component';
import { MerchantReportComponent } from './component/report/report-collection/merchant-report/merchant-report.component';
import { GenericModalComponent } from './shared/directives/generic-modal/generic-modal.component';
import { JwtInterceptor, ErrorInterceptor } from './shared/_helpers';
import { MfsPdfViewerComponent } from './shared/directives/mfs-pdf-viewer/mfs-pdf-viewer.component';
import { LoaderComponent } from './shared/directives/loader/loader.component';
import { ChidMerchantComponent } from './component/report/report-collection/chid-merchant/chid-merchant.component';
import { ChainMerchantComponent } from './component/report/report-collection/chain-merchant/chain-merchant.component';
import { PathaoDashComponent } from './component/report/report-collection/pathao-dash/pathao-dash.component';
import { AgentDsrListComponent } from './component/report/report-collection/dist-portal/agent-dsr-list/agent-dsr-list.component';
import { BlncRptComponent } from './component/report/report-collection/dist-portal/blnc-rpt/blnc-rpt.component';
import { CustRegComponent } from './component/report/report-collection/dist-portal/cust-reg/cust-reg.component';
import { DpsDetailsComponent } from './component/report/report-collection/lanka/dps-details/dps-details.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ReportListComponent,
    ReportDetailsComponent,
    MerchantReportComponent,
    GenericModalComponent,
    MfsPdfViewerComponent,
    LoaderComponent,
    AlertComponent,
    ErrorComponent,
    UppercaseDirective,
    AuthorizeButtonComponent,
    GenericFormActionComponent,
    GenericGridComponent,
    GenericStepperFormActionComponent,
    MfsDatepickerComponent,
    BdtCurrencyPipe,
    ClientCategoryPipe,
    GenderCheckPipe,
    ReportTypePipe,
    SecuredDataPipe,
    StatusCheckPipe,
    YesNoPipe,
    ChidMerchantComponent,
    ChainMerchantComponent,
    PathaoDashComponent,
    AgentDsrListComponent,
    BlncRptComponent,
    CustRegComponent,
    DpsDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    SlideMenuModule,
    PanelMenuModule,
    ScrollPanelModule,
    ChartModule,
    TreeModule,
    MenubarModule,
    CardModule,
    InputTextModule,
    SplitButtonModule,
    TableModule,
    MegaMenuModule,
    MenuModule,
    StepsModule,
    PanelModule,
    FieldsetModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    InputMaskModule,
    KeyFilterModule,
    OverlayPanelModule,
    SliderModule,
    MultiSelectModule,
    ConfirmDialogModule,
    ToastModule,
    DialogModule,
    PasswordModule,
    InputTextareaModule,
    InputSwitchModule,
    MessageModule,
    MessagesModule,
    TabViewModule,
    TabMenuModule,
    AccordionModule,
    ProgressSpinnerModule,
    OrganizationChartModule,
    TreeTableModule,
    TieredMenuModule,
    CarouselModule,
    SidebarModule,
    TriStateCheckboxModule,
    ToggleButtonModule,
    CheckboxModule,
    HttpClientModule,
    NgbModule,
    PdfJsViewerModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
