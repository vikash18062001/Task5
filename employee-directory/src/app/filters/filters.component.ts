import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationService } from '../application.service';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  @Input() empToShow:any;
  isMobileResolution:any;
  selectedFilter:any;
  empFormDetail:any;
  searchKeyWord:any;
  toShow=false;
  visible=false;
  filtersName =[
    'Preferred Name',
    'First Name',
    'Last Name',
    'Email',
    'Job Title',
    'Office',
    'Skype Id',
    'Departement',
    'Phone Number'
  ]
  constructor(public _regService:RegistrationService,public _appService:ApplicationService,public router:Router) {
    this.isMobileResolution = this._appService.getMobileResolution();
    this.selectedFilter="Preferred Name";
   }
  filtersByName:any=[];
  
  ngOnInit(): void {
    for(let i=0;i<26;i++)
    {
      this.filtersByName.push(String.fromCharCode(i+65));
    }
  }
  addEmployee()
  {
    this.empFormDetail = '';
    console.log(this.toShow);
    this.toShow= !this.toShow;
    console.log("Add Clicked")
  }
  addEmployeeVisible()
  {
    return false;
  }
  previousValue:any;
  filter(value:any,basis:any)
  {
    if(this.previousValue===value)
    {
      var y = this._regService.getAllEmployee();
      this.empToShow = y;
      this.previousValue='';
    }
    else
    {
      var x =this._regService.searchFilterByFirstName(value,basis);
      this.empToShow = x;
      this.previousValue=value;
    }
  }
  onChange()
  {
    var x = this._regService.searchBasedOnSearchFilter(this.searchKeyWord,this.selectedFilter);
    this.empToShow = x;
  }
  onFilterChange(e:any)
  {
    this.selectedFilter = e.target.value;
    this.clear();
  }
  clear()
  {
    this.searchKeyWord="";
    this.empToShow = this._regService.getAllEmployee();
  }
  newEmpRegister()
  {
    this.empToShow = this._regService.getAllEmployee();
  }
  sendFormData(emp:any)
  {
    this.empFormDetail = emp;
    this.toShow = !this.toShow;
    return true;
  }
  formDetail()
  {
    return this.empFormDetail;
  }
  hideForm()
  {
    this.toShow = false;
  }
  


}
