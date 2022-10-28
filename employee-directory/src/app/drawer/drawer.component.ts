import { Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { ApplicationService } from '../services/application.service';
import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';
import { EmployeeServiceService } from '../services/employee-service.service';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css']
})
export class DrawerComponent implements OnInit {
  end =5;
  MoreOrLess = "View More";
  isVisible = true;
  left = 0;
  isMobileResolution!: boolean;
  showDrawer = true;
  freqMap = new Map();
  departements: String[] = [];
  offices: String[] = [];
  jobTitles: String[] = [];
  @Output() giveDetails: EventEmitter<any> = new EventEmitter();
  @Input() toShowDrawer: any;
  constructor(
    private _empService: EmployeeServiceService,
    private _regService: RegistrationService,
    private _empDetail: EmployeeDetailsComponent,
    private _appService: ApplicationService) {
  }

  ngOnInit(): void {
    this.isMobileResolution = this._appService.getMobileResolution();
    this.departements = this._empService.getDepartements();
    this.offices = this._empService.getOffices();
    this.jobTitles = this._empService.getJobTitles();
    this.freqMap = this._regService.countNode;
  }

  ngOnChanges(): void {
    this.show();
    this.freqMap = this._regService.countNode;
  }

  filter(component: any, dept: any): void {
    var x = this._regService.searchFilter(component, dept);
    this.giveDetails.emit(x);
  }

  viewMore() : void{
    if(this.MoreOrLess === "View More")
    {
      this.end = this.jobTitles.length;
      this.MoreOrLess ="View Less";
    }
    else{
      this.MoreOrLess = "View More";
      this.end = 5;
    }
  }
  show(): void {
    this.left = this.left == 0 ? -540 : 0;
    this.isVisible = !this.isVisible;
  }

}
