import { Component, OnInit } from '@angular/core';
import { FiltersComponent } from '../filters/filters.component';
import { RegistrationService } from '../registration.service';
@Component({
  selector: 'app-mobile-emp-ui',
  templateUrl: './mobile-emp-ui.component.html',
  styleUrls: ['./mobile-emp-ui.component.css']
})
export class MobileEmpUiComponent implements OnInit{

  constructor(private _regService:RegistrationService,private _filter:FiltersComponent) { }
  showFilter  =false;
  selectedFilter:any;
  dropDownFilter:any = [];
  filters :any =[];
  employee :any = [];
  ngOnInit(): void {
    this.getAllEmp();
    this.getFilters();
    this.dropDownFilter = this._filter.filtersName;
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
  onFilterChange()
  {
    console.log("Filter Changed");
  }

}
