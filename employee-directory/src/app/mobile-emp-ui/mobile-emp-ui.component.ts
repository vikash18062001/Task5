import { Component, OnInit } from '@angular/core';
import { FiltersComponent } from '../filters/filters.component';
import { Router } from '@angular/router';
import { RegistrationService } from '../services/registration.service';
import { ApplicationService } from '../services/application.service';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
@Component({
  selector: 'app-mobile-emp-ui',
  templateUrl: './mobile-emp-ui.component.html',
  styleUrls: ['./mobile-emp-ui.component.css'],
})

export class MobileEmpUiComponent extends FiltersComponent implements OnInit {
  toShowForm = false;
  toShowFormTwo = true;
  toDisplay = false;
  deleteMobileFirstScreen = true;
  showForm = false;
  empDetails: undefined;
  formShow = true;
  showFilter = false;
  dropDownFilter: String[] = [];
  filters: String[] = [];
  employee: any = [];
  @Output() showdrawer: EventEmitter<boolean> = new EventEmitter();
  @Input() filteredEmployee !: Object;
  constructor(
    public route: Router,
    public reg: RegistrationService,
    public app: ApplicationService) {
    super(reg, app, route);
  }
  override ngOnInit(): void {
    this.getAllEmp();
    this.getFilters();
    this.dropDownFilter = this.filtersName;
  }
  ngOnChanges(): void {
    this.employee = this.filteredEmployee;
  }
  getAllEmp(): void {
    this.employee = this._regService.getAllEmployee();
  }
  getFilters(): void {
    for (let i = 0; i < 26; i++) {
      this.filters.push(String.fromCharCode(i + 65));
    }
    this.filters.push('#');
  }
  showfilter(): void {
    this.showFilter = !this.showFilter;
  }
  showDrawer(): void {
    this.showdrawer.emit();
  }
  onChangeMobileUi(): void 
  {
    this.onChange();
    this.employee = this.empToShow;
  }
  filterByChar(x: any): void {
    if (x == '#')
      this.employee = this._regService.getAllEmployee();
    else {
      this.filter(x, 'preferredName');
      this.employee = this.empToShow;
    }
  }
  getDetails(e: any): void {
    var formDetail = this._regService.getEmpDetail(e);
    this.empDetails = formDetail;
    this.showForm = !this.showForm;
  }
  deleteFun(): void {
    this.employee = this._regService.getAllEmployee();
    this.redoIt(false, false);
  }
  override addEmployee(): void {
    this.toShowFormTwo = !this.toShowFormTwo;
    this.toDisplay = !this.toDisplay;
  }
  newEmpRegistered(isEdit: any): void {
    this.employee = this._regService.getAllEmployee();
    this.redoIt(isEdit, true);
  }
  editFun(emp: any): void {
    this.toDisplay = true;
    this.empFormDetail = emp;
  }
  deleteOrRedoFirstPage(isEdit: any, newEmp: any): void {
    if (isEdit) {
      this.toShowFormTwo = true;
    }
    else {
      this.showForm = false;
    }
    if (newEmp) {
      this.toDisplay = !this.toDisplay;
    }
  }
  redoIt(isEdit: any, newEmp: any): void {
    this.deleteOrRedoFirstPage(isEdit, newEmp);
  }
  cancelForm(e: any): void {
    if (e == undefined) {
      this.toShowFormTwo = !this.toShowFormTwo;
      this.toDisplay = !this.toDisplay;
    }
    else {
      this.toShowFormTwo = true;
      this.showForm = false;
      this.toDisplay = !this.toDisplay;

    }
  }

}


