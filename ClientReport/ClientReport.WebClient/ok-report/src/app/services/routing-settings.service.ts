import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoutingSettingsService {
  constructor() { }
  IsRoutingAllow(mtype: any, path: string) {
    if (path == 'home' || path == 'login') {
      return true;
    }
    else if (path === 'app-merchant-report' && mtype === 'I') {
      return true;
    }
    else if (path === 'app-chid-merchant' && mtype === 'CM') {
      return true;
    }
    else if (path === 'app-chain-merchant' && mtype === 'PM') {
      return true;
    }
    else if (path === 'app-pathao-dash' && mtype === 'MW') {
      return true;
    }
    else if (path === 'app-agent-dsr-list' && mtype === 'D') {
      return true;
    }
    else if (path === 'app-blnc-rpt' && mtype === 'D') {
      return true;
    }
    else if (path === 'app-cust-reg' && mtype === 'D') {
      return true;
    }
    else if (path === 'app-dps-details' && mtype === 'LB') {
      return true;
    }
    else {
      return false;
    }
  }
}
