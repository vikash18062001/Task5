import { Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Component, OnInit ,Output} from '@angular/core';
import { ApplicationService } from '../application.service';
import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';
import { EmployeeServiceService } from '../employee-service.service';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css']
})
export class DrawerComponent implements OnInit {
  isVisible = true;
  left=0;
  isMobileResolution:boolean;
  showDrawer = true;
  freqMap = new Map();
  departements:any;
  offices:any;
  jobTitles:any;
  constructor(private _empService:EmployeeServiceService,private _regService:RegistrationService,private _empDetail:EmployeeDetailsComponent,private _appService:ApplicationService) { 
    this.isMobileResolution = this._appService.getMobileResolution();
  }
  @Output() giveDetails:EventEmitter<any> = new EventEmitter();
  @Input() toShowDrawer:any;
  ngOnInit(): void {
    this.departements = this._empService.getDepartements();
    this.offices = this._empService.getOffices();
    this.jobTitles = this._empService.getJobTitles();
    this.freqMap = this._regService.countNode;
  }
  ngOnChanges()
  {
    this.show();
    this.freqMap = this._regService.countNode;
  }
  filter(component:any ,dept:any)
  {
    var x = this._regService.searchFilter(component,dept);
    this.giveDetails.emit(x);
  }
  show()
  {
    this.left = this.left==0? -540 : 0;
    this.isVisible = !this.isVisible;
  }

}
