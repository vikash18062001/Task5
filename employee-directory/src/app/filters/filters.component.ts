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
  @Input() empToShow !: Object;
  isMobileResolution : boolean;
  selectedFilter : String;
  empFormDetail !: Object;
  searchKeyWord !: String;
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
  previousValue !: String;
  filtersByName:String[]=[];
  constructor(
    public _regService:RegistrationService,
    public _appService:ApplicationService,
    public router:Router
    ) {
    this.isMobileResolution = this._appService.getMobileResolution();
    this.selectedFilter="Preferred Name";
    }
  
  ngOnInit(): void {
    for(let i=0;i<26;i++)
    {
      this.filtersByName.push(String.fromCharCode(i+65));
    }
  }
  addEmployee()
  {
    this.empFormDetail = '';
    this.toShow= !this.toShow;
  }
  addEmployeeVisible()
  {
    return false;
  }
  filter(value:String,basis:String)
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
