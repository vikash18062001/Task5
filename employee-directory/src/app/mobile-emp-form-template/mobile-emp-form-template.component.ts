import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';
import { EmployeeServiceService } from '../employee-service.service';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-mobile-emp-form-template',
  templateUrl: './mobile-emp-form-template.component.html',
  styleUrls: ['./mobile-emp-form-template.component.css'],
  animations: [
    trigger('sidedrawer', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(100%)' }),
        animate(800)
      ]),
      transition('* => void', [
        animate(800, style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class MobileEmpFormTemplateComponent implements OnInit {

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
  showMobileForm: any;

  constructor(private _empService:EmployeeServiceService,private _newEmp:RegistrationService,private elementRef:ElementRef,private empDetail:EmployeeDetailsComponent) { }
  toShow=true;
  @Output() newEmpRegister:EventEmitter<any> = new EventEmitter();
  @Input() detail:any;
  @Input() showForm:any;
  @Input() empFormDetail:any;
  isEdit = false;
  lastPreferName:any;

  ngOnInit(): void {
    this.departements = this._empService.getDepartements();
    this.offices = this._empService.getOffices();
    this.jobTitles = this._empService.getJobTitles();
  }
  ngOnChanges()
  {
    this.toShow = (!this.toShow);
    // this.initializeForm();
    if(this.showForm)
      this.showEmpMobileForm();
    if(this.empFormDetail)
      this.fillFormDetail(this.empFormDetail);
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
      console.log(form.value);
      this.editEmployee(form.value,this.lastPreferName);
      // this._newEmp.editEmployee(form.value,this.lastPreferName);
      // this.cancel();
      // this.newEmpRegister.emit();
    }
    this.showMobileForm = !this.showMobileForm;
    this.clearInput();
  }
  editEmployee(firstValue:any,secondValue:any)
  {
    this._newEmp.editEmployee(firstValue,secondValue);
    this.cancel();
    this.newEmpRegister.emit();
  }
  cancel()
  {
    this.toShow = !this.toShow;
  }
  initializeForm()
  {
    if(this.detail)
    {
    this.firstName = this.detail.firstname;
    this.lastName = this.detail.lastName;
    this.preferredName = this.detail.preferredName;
    this.skypeId = this.detail.skypeId;
    this.email = this.detail.email;
    this.jobTitle = this.detail.jobTitle;
    this.dept = this.detail.dept;
    this.phoneNumber = this.detail.phoneNumber;
    this.office = this.detail.office;
    this.isEdit =true;
    this.lastPreferName = this.detail.preferredName;
    }
  }
  showEmpMobileForm()
  {
    this.showMobileForm = !this.showMobileForm;
  }
  clearInput()
  {
    this.firstName = '';
    this.lastName = '';
    this.skypeId = '';
    this.dept = '';
    this.office = '';
    this.jobTitle = '';
    this.email = '';
    this.phoneNumber = '';
    this.preferredName = '';
  }
  fillFormDetail(emp:any)
  {
    if(emp)
    {
    this.firstName = emp.firstname;
    this.lastName = emp.lastName;
    this.preferredName = emp.preferredName;
    this.email = emp.email;
    this.office = emp.office;
    this.jobTitle = emp.jobTitle;
    this.phoneNumber = emp.phoneNumber;
    this.dept = emp.dept;
    this.skypeId = emp.skype;
    this.isEdit = !this.isEdit;
    // this.editEmployee(form.value,emp.preferredName);
    }
    
    
  }
}
