import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ApplicationService } from '../application.service';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isMobileResolution:boolean;
  constructor(private _regService:RegistrationService,private _appService:ApplicationService) { 
    this.isMobileResolution = this._appService.getMobileResolution();
    console.log(this.isMobileResolution);
  }
  getEmpDetails:any []=[];
  ngOnInit(): void {
    this.getEmpDetails = this._regService.getAllEmployee();
  }
  empDetails(emp:any)
  {
    this.getEmpDetails = emp;
  }
  loadPage()
  {
    window.location.reload();
  }


}
