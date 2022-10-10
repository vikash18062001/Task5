import { Component, OnInit } from '@angular/core';
import { FiltersComponent } from '../filters/filters.component';
import { Router } from '@angular/router';
import { RegistrationService } from '../registration.service';
import { ApplicationService } from '../application.service';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { transform } from 'typescript';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@Component({
  selector: 'app-mobile-emp-ui',
  templateUrl: './mobile-emp-ui.component.html',
  styleUrls: ['./mobile-emp-ui.component.css'],
  
  
})

export class MobileEmpUiComponent extends FiltersComponent implements OnInit{
  toShowForm=false;
  toDisplay=false;

  constructor(public  route:Router,public reg:RegistrationService,public  app:ApplicationService) { 
    super(reg,app,route);
  }
  @Output() giveDetails:EventEmitter<any> = new EventEmitter();
  @Output() showdrawer:EventEmitter<any> = new EventEmitter();
  
  show:any;
  data:any;
  empDetails:any;
  
  showFilter  =false;
  dropDownFilter:any = [];
  filters :any =[];
  employee :any = [];
  override ngOnInit(): void {
    this.getAllEmp();
    this.getFilters();
    this.dropDownFilter = this.filtersName;
  }
  getAllEmp()
  {
    this.employee = this._regService.getAllEmployee();
  }
  getFilters()
  {
    for(let i=0;i<26;i++)
    {
      this.filters.push(String.fromCharCode(i+65));
    }
    this.filters.push('#');
  }
  showfilter()
  {
    this.showFilter = !this.showFilter;
  }
  showDrawer()
  {
    this.showdrawer.emit();
  }
  onChangeMobileUi() //done
  {
    this.onChange();
    this.employee = this.empToShow;
  }
  filterByChar(x:any)
  {
    if(x=='#')
      this.employee = this._regService.getAllEmployee();
    else
    {
    this.filter(x,'preferredName');
    this.employee = this.empToShow;
    }
  }
  getDetails(e:any)
  {
    var formDetail = this._regService.getEmpDetail(e);
    this.empDetails = formDetail;
  }
  deleteFun()
  {
    this.employee = this._regService.getAllEmployee();
  }
  override addEmployee(): void {
    this.toDisplay = !this.toDisplay;
  }
  newEmpRegistered()
  {
    this.employee = this._regService.getAllEmployee();
  }
  editFun(emp:any)
  {
    this.toDisplay = !this.toDisplay;
    this.empFormDetail = emp;
  }
 
  
}


