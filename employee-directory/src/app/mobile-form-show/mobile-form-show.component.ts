import { ChangeDetectorRef, Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { User } from '../model';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-mobile-form-show',
  templateUrl: './mobile-form-show.component.html',
  styleUrls: ['./mobile-form-show.component.css']
})
export class MobileFormShowComponent implements OnInit {
  @Input() emp_Detail: any;
  @Output() deleteFun: EventEmitter<any> = new EventEmitter();
  @Output() editFunc: EventEmitter<Object> = new EventEmitter();
  @Output() redoFirstPage: EventEmitter<boolean> = new EventEmitter();
  @Input() showMobileForm !: boolean;
  top = -1000;
  imageUrl!: String;
  user_name!: String;
  user_jobtitle!: String;
  user_departement!: String;
  user_office!: String;
  user_mobileno!: String;
  user_skypeid!: String;
  user_emailid!: String;
  empDetail: any;
  user:any;
  constructor(public _regService: RegistrationService, private cd: ChangeDetectorRef) { }
  ngOnInit(): void {
    // this.user = new User();
    // console.log(this.user);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.emp_Detail) {
      this.fillDetails();
    }
    if (this.showMobileForm)
      this.showDetail();
    if (this.emp_Detail)
      this.imageUrl = this.emp_Detail.imageurl;
  }
  fillDetails(): void {
    this.user_name = this.emp_Detail.preferredName;
    this.user_jobtitle = this.emp_Detail.jobTitle;
    this.user_departement = this.emp_Detail.dept;
    this.user_office = this.emp_Detail.office;
    this.user_mobileno = this.emp_Detail.phoneNumber;
    this.user_emailid = this.emp_Detail.email;
    this.user_skypeid = this.emp_Detail.skype;
  }
  showDetail(): void {
    this.top = this.top == 0 ? -1000 : 0;
  }
  deleteEmp(): void {
    this._regService.deleteAnEmployee(this.emp_Detail);
    this.deleteFun.emit();
    this.top = -1000;
  }
  editEmp(emp: any): void {
    this.empDetail = this._regService.getEmpDetail(emp);
    this.showDetail();
    this.editFunc.emit(this.empDetail);
  }
  redoAction(e: any): void {
    this.redoFirstPage.emit(false);
  }
  clickCross(): void {
    this.showDetail();
    this.redoAction(true);
  }

}
