import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ApplicationService } from '../application.service';
import { RegistrationService } from '../registration.service';
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit ,OnDestroy{
  isMobileResolution:boolean;
  mediaSub:Subscription | undefined;
  show=false;
  getEmpDetails!:Object;

  constructor(
    private _regService:RegistrationService,
    private _appService:ApplicationService) { 
    this.isMobileResolution = this._appService.getMobileResolution();
  }
  ngOnInit(): void {
    this.getEmpDetails = this._regService.getAllEmployee();
  }
  ngOnDestroy(): void {
      
  }
  empDetails(emp:Object)
  {
    this.getEmpDetails = emp;
  }
  loadPage()
  {
    window.location.reload();
  }
  showdraw(bool:boolean)
  {
    this.show = !this.show;
  }


}
