import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';
import { FormTemplateComponent } from '../form-template/form-template.component';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-employee-detail-template',
  templateUrl: './employee-detail-template.component.html',
  styleUrls: ['./employee-detail-template.component.css']
})
export class EmployeeDetailTemplateComponent implements OnInit {
  @Input() empDetail:any;
  @Output() formDet:EventEmitter<any> = new EventEmitter();
  constructor(private empDetails:EmployeeDetailsComponent,private _formTmp:FormTemplateComponent,private _regService:RegistrationService) { }
  
  empName:any;
  empJobTitle:any;
  empDepartement:any;
  ngOnInit(): void {
    this.empName = this.empDetail.preferredName;
    this.empJobTitle = this.empDetail.jobTitle;
    this.empDepartement = this.empDetail.dept;
  }
  showForm(emp:any)
  {
    var name = emp.currentTarget.children[1].children[0].innerText
    var formDetail = this._regService.getEmpDetail(name);
    this.formDet.emit(formDetail);
  }

}
