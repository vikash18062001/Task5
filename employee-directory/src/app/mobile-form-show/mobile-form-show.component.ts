import { Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-mobile-form-show',
  templateUrl: './mobile-form-show.component.html',
  styleUrls: ['./mobile-form-show.component.css']
})
export class MobileFormShowComponent implements OnInit {
  @Input() emp_Detail:any;
  @Output() deleteFun:EventEmitter<any> = new EventEmitter();
  @Output() editFunc:EventEmitter<any> = new EventEmitter();
  showMobileForm=false;
  top=0;
  constructor(public _regService:RegistrationService) { }
  user_name:any;
  user_jobtitle:any;
  user_departement:any;
  user_office:any;
  user_mobileno:any;
  user_skypeid:any;
  user_emailid:any;
  empDetail:any;
  ngOnInit(): void {

  }
  ngOnChanges()
  {
    if(this.emp_Detail)
      this.fillDetails();
    this.showDetail();
    
  }
  fillDetails()
  {
    this.user_name = this.emp_Detail.preferredName;
    this.user_jobtitle = this.emp_Detail.jobTitle;
    this.user_departement = this.emp_Detail.dept;
    this.user_office = this.emp_Detail.office;
    this.user_mobileno = this.emp_Detail.phoneNumber;
    this.user_emailid = this.emp_Detail.email;
    this.user_skypeid = this.emp_Detail.skype;
  }
  showDetail()
  {
    this.showMobileForm = !this.showMobileForm;
    this.top = this.top==0?-700:0;
  }
  deleteEmp()
  {
    this._regService.deleteAnEmployee(this.emp_Detail);
    this.showDetail();
    this.deleteFun.emit();
  }
  editEmp(emp:any)
  {
    this.empDetail = this._regService.getEmpDetail(emp);
    this.editFunc.emit(this.empDetail);
  }
  
}
