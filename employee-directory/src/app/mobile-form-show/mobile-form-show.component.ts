import { ChangeDetectorRef, Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { SimpleChange } from '@angular/core';
import { Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-mobile-form-show',
  templateUrl: './mobile-form-show.component.html',
  styleUrls: ['./mobile-form-show.component.css']
})
export class MobileFormShowComponent implements OnInit {
  @Input() emp_Detail: any;
  @Output() deleteFun: EventEmitter<any> = new EventEmitter();
  @Output() editFunc: EventEmitter<any> = new EventEmitter();
  @Output() redoFirstPage: EventEmitter<any> = new EventEmitter();
  @Input() showMobileForm :any;
  top = -1000;
  constructor(public _regService: RegistrationService,private cd: ChangeDetectorRef) { }
  user_name: any;
  user_jobtitle: any;
  user_departement: any;
  user_office: any;
  user_mobileno: any;
  user_skypeid: any;
  user_emailid: any;
  empDetail: any;
  ngOnInit(): void {
    console.log("SHow form ", this.showMobileForm)
  }

  ngOnChanges(changes:SimpleChanges) {
    console.log(changes);
    if (this.emp_Detail)
    {
      this.fillDetails();
    }
    if(this.showMobileForm)
      this.showDetail();
      console.log("mobileform",this.showMobileForm);
  }
  fillDetails() {
    this.user_name = this.emp_Detail.preferredName;
    this.user_jobtitle = this.emp_Detail.jobTitle;
    this.user_departement = this.emp_Detail.dept;
    this.user_office = this.emp_Detail.office;
    this.user_mobileno = this.emp_Detail.phoneNumber;
    this.user_emailid = this.emp_Detail.email;
    this.user_skypeid = this.emp_Detail.skype;
  }
  showDetail() {
    this.top = this.top == 0 ? -1000 : 0;
  }
  deleteEmp() {
    this._regService.deleteAnEmployee(this.emp_Detail);
    this.deleteFun.emit();
    this.top = -1000;
  }
  editEmp(emp: any) {
    this.empDetail = this._regService.getEmpDetail(emp);
    this.showDetail();
    this.editFunc.emit(this.empDetail);
  }
  redoAction(e:any)
  {
    // if(e)
    // this.redoFirstPage.emit(true);
    // else
    this.redoFirstPage.emit(false);
  }
  clickCross()
  {
    console.log("Click Cross")
    this.showDetail();
    this.redoAction(true);
  }

}
