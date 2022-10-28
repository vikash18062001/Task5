import { animate, state, style, transition, trigger } from '@angular/animations';
import { SimpleChanges } from '@angular/core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EmployeeServiceService } from '../services/employee-service.service';
import { RegistrationService } from '../services/registration.service';

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
  valid = true;
  imageUrl!: String;
  user_image!: String;
  image_source!: String;
  isTrue = false;
  firstName!: String;
  lastName!: String;
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
  showMobileForm !: boolean;

  @Output() newEmpRegister: EventEmitter<boolean> = new EventEmitter();
  @Output() cancelForm: EventEmitter<Object> = new EventEmitter();
  @Input() detail !: Object;
  @Input() showMobileEmpForm !: Boolean;
  @Input() empFormDetail !: Object;
  isEdit = false;
  lastPreferName !: String;
  constructor(
    private _empService: EmployeeServiceService,
    private _newEmp: RegistrationService,
  ) {
    
  }

  ngOnInit(): void {
    this.office = 'IT';
    this.dept = "India";
    this.jobTitle = "SharePoint Practise Head";
    this.departements = this._empService.getDepartements();
    this.offices = this._empService.getOffices();
    this.jobTitles = this._empService.getJobTitles();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.office = 'India';
    this.dept = 'IT';
    this.jobTitle = "SharePoint Practice Head";
    if (this.showMobileEmpForm)
      this.showEmpMobileForm();
    if (this.empFormDetail) {
      this.fillFormDetail(this.empFormDetail);
    }
  }
  addEmployee(form: { value: any; }): void {
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
      form.value.imageurl = this.user_image;
      this._newEmp.registerNewEmployee(form.value);
      this.newEmpRegister.emit(!this.isEdit);
      this.isEdit = this.isEdit;

    }
    else {
      if (this.user_image)
        form.value.imageurl = this.user_image;
      this._newEmp.editEmployee(form.value, this.lastPreferName);
      this.newEmpRegister.emit(!this.isEdit);
      this.isEdit = !this.isEdit;
    }
    this.showMobileForm = !this.showMobileForm;
    this.clearInput();
    this.empFormDetail = '';
    this.user_image = '';
    this.imageUrl = '';
  }
  }
  emailValidation(): boolean{
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email))
     {
       return (true)
     }
       return (false)
 }
  showEmpMobileForm(): void {
    this.clearInput();
    this.showMobileForm = !this.showMobileForm;
  }
  cancelEmpMobileForm(): void {
    this.showMobileForm = !this.showMobileForm;
    this.clearInput();
    this.cancelForm.emit(this.empFormDetail);
    this.empFormDetail = '';
  }
  clearInput(): void {
    this.firstName = '';
    this.lastName = '';
    this.skypeId = '';
    this.email = '';
    this.phoneNumber = '';
    this.preferredName = '';
  }
  fillFormDetail(emp: any): void {
    if (emp) {
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
      this.lastPreferName = emp.preferredName;
      this.imageUrl = emp.imageurl;
    }
  }
  selectedImage(e: any): void {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.imageUrl = event.target.result;
        this.user_image = this.imageUrl;
      }
    }
  }
}
