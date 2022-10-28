import { Component, OnInit } from '@angular/core';
import { EmployeeServiceService } from '../services/employee-service.service';
import { RegistrationService } from '../services/registration.service';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { SimpleChange } from '@angular/core';
import { User } from '../model';

@Component({
  selector: 'app-form-template',
  templateUrl: './form-template.component.html',
  styleUrls: ['./form-template.component.css']
})
export class FormTemplateComponent implements OnInit {
  empUser = new User({});
  addOrEdit = "Add Employee"
  isTrue = false;
  firstName !: String;
  lastName !: String;
  dept!: String;
  office!: String;
  preferredName!: String;
  jobTitle!: String;
  email!: string;
  phoneNumber!: String;
  departements: String[] = [];
  offices: String[] = [];
  jobTitles: String[] = [];
  skypeId !: String;
  toShow = true;
  del = false;
  @Output() newEmpRegister: EventEmitter<User> = new EventEmitter();
  @Output() hideForm: EventEmitter<boolean> = new EventEmitter();
  @Input() detail: any;
  isEdit = false;
  lastPreferName !: String;
  valid = true;

  constructor(private _empService: EmployeeServiceService, private _newEmp: RegistrationService) {
  }


  ngOnInit(): void {
    this.office = "India";
    this.dept = "IT";
    this.jobTitle = 'SharePoint Practice Head';
    this.departements = this._empService.getDepartements();
    this.offices = this._empService.getOffices();
    this.jobTitles = this._empService.getJobTitles();

  }
  ngOnChanges(change: SimpleChange): void {
    this.toShow = (!this.toShow);
    this.initializeForm();
  }

  addEmployee(form: { value: any; }): void {
    this.initializeObject(form.value);
    if(this.emailValidation())
    {
      this.valid = true;
    }
    else
    {
      this.valid = false;
    }

    if(this.emailValidation())
    {
    if (!this.isEdit) {
      this._newEmp.registerNewEmployee(this.empUser);
      this.cancel();
      this.newEmpRegister.emit();
    }
    else {
      this._newEmp.editEmployee(this.empUser, this.lastPreferName);
      this.cancel();
      this.newEmpRegister.emit();

    }
  }
  }
  initializeObject(emp:any) :void 
  {
    this.empUser = new User(emp);
  }

  emailValidation(): boolean{
     if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email))
      {
        return (true)
      }
        return (false)
  }
  deleteEmployee() : void
  {
    if(this.detail)
    this._newEmp.deleteAnEmployee(this.detail);
    this.clearFields();
    this.hideForm.emit();
    
  }
  cancel(): void {
    this.clearFields();
    this.toShow = true;
    this.hideForm.emit();
  }
  initializeForm(): void {
    if (this.detail) {
      this.firstName = this.detail.firstname;
      this.lastName = this.detail.lastName;
      this.preferredName = this.detail.preferredName;
      this.skypeId = this.detail.skype;
      this.email = this.detail.email;
      this.jobTitle = this.detail.jobTitle;
      this.dept = this.detail.dept;
      this.phoneNumber = this.detail.phoneNumber;
      this.office = this.detail.office;
      this.isEdit = true;
      this.lastPreferName = this.detail.preferredName;
      this.addOrEdit = "Edit Employee";
      this.del = true;
    }
  }
  clearFields(): void {
    this.firstName = '';
    this.lastName = '';
    this.preferredName = '';
    this.skypeId = '';
    this.email = '';
    this.jobTitle = '';
    this.dept = '';
    this.phoneNumber = '';
    this.office = '';
    this.isEdit = false;
    this.lastPreferName = '';
  }

}

