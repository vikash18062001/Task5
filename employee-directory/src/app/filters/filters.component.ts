import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationService } from '../services/application.service';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  @Input() empToShow !: Object;
  isMobileResolution !: boolean;
  selectedFilter ='Preferred Name';
  empFormDetail !: Object;
  searchKeyWord !: String;
  toShow = false;
  visible = false;
  filtersName = [
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
  filtersByName: String[] = [];
  constructor(
    public _regService: RegistrationService,
    public _appService: ApplicationService,
    public router: Router
  ) {
    
  }

  ngOnInit(): void {
    this.isMobileResolution = this._appService.getMobileResolution();
    this.selectedFilter = "Preferred Name";
    for (let i = 0; i < 26; i++) {
      this.filtersByName.push(String.fromCharCode(i + 65));
    }
  }
  addEmployee(): void {
    this.empFormDetail = '';
    this.toShow = !this.toShow;
  }
  addEmployeeVisible(): boolean {
    return false;
  }
  filter(value: String, basis: String): void {
    if (this.previousValue === value) {
      var y = this._regService.getAllEmployee();
      this.empToShow = y;
      this.previousValue = '';
    }
    else {
      var x = this._regService.searchFilterByFirstName(value, this.selectedFilter);
      this.empToShow = x;
      this.previousValue = value;
    }
  }
  onChange() {
    var x = this._regService.searchBasedOnSearchFilter(this.searchKeyWord, this.selectedFilter);
    this.empToShow = x;
  }
  onFilterChange(e: any): void {
    this.selectedFilter = e.target.value;
    this.clear();
  }
  clear(): void {
    this.searchKeyWord = "";
    this.empToShow = this._regService.getAllEmployee();
  }
  newEmpRegister(): void {
    this.empToShow = this._regService.getAllEmployee();
  }
  sendFormData(emp: any): boolean {
    this.empFormDetail = emp;
    this.toShow = !this.toShow;
    return true;
  }
  formDetail(): Object {
    return this.empFormDetail;
  }
  hideForm(): void {
    this.toShow = false;
    this.empToShow = this._regService.getAllEmployee();
  }
}
