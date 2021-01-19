import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/security/login/login.component';
import { ReportDetailsComponent } from './component/report/report-details/report-details.component';
import { AuthGuard } from './shared/_guards';
import { MerchantReportComponent } from './component/report/report-collection/merchant-report/merchant-report.component';
import { ChidMerchantComponent } from './component/report/report-collection/chid-merchant/chid-merchant.component';
import { ChainMerchantComponent } from './component/report/report-collection/chain-merchant/chain-merchant.component';
import { PathaoDashComponent } from './component/report/report-collection/pathao-dash/pathao-dash.component';
import { AgentDsrListComponent } from './component/report/report-collection/dist-portal/agent-dsr-list/agent-dsr-list.component';
import { BlncRptComponent } from './component/report/report-collection/dist-portal/blnc-rpt/blnc-rpt.component';
import { CustRegComponent } from './component/report/report-collection/dist-portal/cust-reg/cust-reg.component';
import { DpsDetailsComponent } from './component/report/report-collection/lanka/dps-details/dps-details.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]  },
  { path: 'login', component: LoginComponent},
  { path: 'report-details', component: ReportDetailsComponent },
  { path: 'app-merchant-report', component: MerchantReportComponent, canActivate: [AuthGuard] },
  { path: 'app-chid-merchant', component: ChidMerchantComponent, canActivate: [AuthGuard] },
  { path: 'app-chain-merchant', component: ChainMerchantComponent, canActivate: [AuthGuard] },
  { path: 'app-pathao-dash', component: PathaoDashComponent, canActivate: [AuthGuard] },
  { path: 'app-agent-dsr-list', component: AgentDsrListComponent, canActivate: [AuthGuard] },
  { path: 'app-blnc-rpt', component: BlncRptComponent, canActivate: [AuthGuard] },
  { path: 'app-cust-reg', component: CustRegComponent, canActivate: [AuthGuard] },
  { path: 'app-dps-details', component: DpsDetailsComponent, canActivate: [AuthGuard] },
  {
    path: "",
    pathMatch: "full",
    redirectTo: "home"
  },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      useHash: true,
      enableTracing: false,
      scrollPositionRestoration: 'enabled'
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
