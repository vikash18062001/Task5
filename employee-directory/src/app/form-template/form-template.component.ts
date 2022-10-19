import { Component, OnInit } from '@angular/core';
import { EmployeeServiceService } from '../employee-service.service';
import { RegistrationService } from '../registration.service';
import { ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { SimpleChange } from '@angular/core';

@Component({
  selector: 'app-form-template',
  templateUrl: './form-template.component.html',
  styleUrls: ['./form-template.component.css']
})
export class FormTemplateComponent implements OnInit {
  isTrue=false;
  firstName:any;
  lastName:any;
  dept:any;
  office:any;
  preferredName:any;
  jobTitle:any;
  email:any;
  phoneNumber:any;
  departements:any;
  offices:any;
  jobTitles:any;
  skypeId:any;
  toShow=true;

  constructor(private _empService:EmployeeServiceService,private _newEmp:RegistrationService,private elementRef:ElementRef,private empDetail:EmployeeDetailsComponent) {
    this.office = "India";
    this.dept = "IT";
    this.jobTitle = 'SharePoint Practice Head';
   }
  @Output() newEmpRegister:EventEmitter<any> = new EventEmitter();
  @Output() hideForm:EventEmitter<any> = new EventEmitter();
  @Input() detail:any;
  isEdit = false;
  lastPreferName:any;

  ngOnInit(): void {
    this.departements = this._empService.getDepartements();
    this.offices = this._empService.getOffices();
    this.jobTitles = this._empService.getJobTitles();
   
  }
  ngOnChanges(change:SimpleChange)
  {
    console.log(change);
    this.toShow = (!this.toShow);
    this.initializeForm();
  }
  
  addEmployee(form: { value: any; })
  {
    if(!this.isEdit)
    {
    this._newEmp.registerNewEmployee(form.value);
    this.cancel();
    this.newEmpRegister.emit();
    }
    else
    {
      this._newEmp.editEmployee(form.value,this.lastPreferName);
      this.cancel();
      this.newEmpRegister.emit();

    }
  }
  cancel()
  {
    this.clearFields();
    this.toShow = true;
    this.hideForm.emit();
    //value true
  }
  initializeForm()
  {
    if(this.detail)
    {
    this.firstName = this.detail.firstname;
    this.lastName = this.detail.lastName;
    this.preferredName = this.detail.preferredName;
    this.skypeId = this.detail.skype;
    this.email = this.detail.email;
    this.jobTitle = this.detail.jobTitle;
    this.dept = this.detail.dept;
    this.phoneNumber = this.detail.phoneNumber;
    this.office = this.detail.office;
    this.isEdit =true;
    this.lastPreferName = this.detail.preferredName;
    }
  }
  clearFields()
  {
    this.firstName = '';
    this.lastName = '';
    this.preferredName = '';
    this.skypeId = '';
    this.email = '';
    this.jobTitle = '';
    this.dept = '';
    this.phoneNumber = '';
    this.office = '';
    this.isEdit =false;
    this.lastPreferName = '';
  }


  
}

