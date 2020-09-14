import { Component, OnInit } from '@angular/core';
import { ReportServiceService } from '../../services/report/report-service.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private reportService: ReportServiceService) { }

  ngOnInit() {
  }

}
