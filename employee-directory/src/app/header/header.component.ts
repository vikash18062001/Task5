import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ApplicationService } from '../services/application.service';
import { RegistrationService } from '../services/registration.service';
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit ,OnDestroy{
  isMobileResolution !: boolean;
  mediaSub:Subscription | undefined;
  show=false;
  getEmpDetails!:Object;

  constructor(
    private _regService:RegistrationService,
    private _appService:ApplicationService) { 
  }
  ngOnInit(): void {
    this.isMobileResolution = this._appService.getMobileResolution();
    this.getEmpDetails = this._regService.getAllEmployee();
  }
  ngOnDestroy(): void {
      
  }
  empDetails(emp:Object): void
  {
    this.getEmpDetails = emp;
  }
  loadPage() :void 
  {
    window.location.reload();
  }
  showdraw(bool:boolean) : void
  {
    this.show = !this.show;
  }


}
