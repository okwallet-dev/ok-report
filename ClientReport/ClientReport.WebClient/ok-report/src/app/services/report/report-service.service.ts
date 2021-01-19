import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MfsSettingService } from '../mfs-setting.service';


@Injectable({
  providedIn: 'root'
})
export class ReportServiceService {
  
  getDistPortalInfo(mobileNo: any) {
    return this.http.get<any>(this.settings.reportApiServer + '/DistributorPortal/getDistPortalInfo?mphone=' + mobileNo)
      .pipe(map(data => {
        return data;
      }));
  }
  getCurrentBalance(mobileNo: any) {
    return this.http.get<any>(this.settings.reportApiServer + '/Kyc/getCurrentBalance?mphone=' + mobileNo)
      .pipe(map(data => {
        return data;
      }));
  }
  getComissionBalance(mobileNo: any) {
    return this.http.get<any>(this.settings.reportApiServer + '/Kyc/getComissionBalance?mphone=' + mobileNo)
      .pipe(map(data => {
        return data;
      }));
  }
  constructor(private http: HttpClient, private settings: MfsSettingService) { }

  getMerchantKycInfoByMphone(mobileNo : string) {
    return this.http.get<any>(this.settings.reportApiServer + '/Kyc/getMerchantKycInfoByMphone?mphone='+mobileNo)
      .pipe(map(data => {
        return data;
      }));
  }
}
