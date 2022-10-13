import { animate, state, style, transition, trigger } from '@angular/animations';
import { SimpleChanges } from '@angular/core';
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
  imageUrl:any;
  user_image:any;
  image_source:any;
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
  @Output() newEmpRegister:EventEmitter<any> = new EventEmitter();
  @Output() cancelForm:EventEmitter<any> = new EventEmitter();
  @Input() detail:any;
  @Input() showMobileEmpForm:any;
  @Input() empFormDetail:any;
  isEdit = false;
  lastPreferName:any;

  ngOnInit(): void {
    this.departements = this._empService.getDepartements();
    this.offices = this._empService.getOffices();
    this.jobTitles = this._empService.getJobTitles();
  }
  ngOnChanges(changes:SimpleChanges)
  {
    if(this.showMobileEmpForm)
      this.showEmpMobileForm(event);
    if(this.empFormDetail)
      this.fillFormDetail(this.empFormDetail);
  }
  loadImage()
  {
    console.log("hello")
  }
  addEmployee(form: { value: any; })
  {
    
    if(!this.isEdit)
    {
    form.value.imageurl = this.user_image;
    this._newEmp.registerNewEmployee(form.value);
    console.log("new",!this.isEdit);
    this.newEmpRegister.emit(!this.isEdit);
    this.isEdit = this.isEdit;

    }
    else
    {
      form.value.imageurl = this.user_image;
      console.log("edit",this.isEdit);
      this._newEmp.editEmployee(form.value,this.lastPreferName);
      this.newEmpRegister.emit(!this.isEdit);
      this.isEdit = !this.isEdit;
    }
    // this.isEdit = false;
    this.showMobileForm = !this.showMobileForm;
    this.clearInput();
    this.empFormDetail=undefined;
    this.imageUrl='';
  }
  showEmpMobileForm(e:any)
  {
    this.clearInput();
    this.showMobileForm = !this.showMobileForm;
  }
  cancelEmpMobileForm(e:any)
  {
    this.showMobileForm = !this.showMobileForm;
    this.clearInput();
    this.cancelForm.emit(this.empFormDetail);
    this.empFormDetail=undefined;

    
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
    this.lastPreferName = emp.preferredName;
    this.imageUrl = emp.imageurl;
    }
  }
  selectedImage(e:any)
  {
    if(e.target.files)
    {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload=(event:any)=>{
      this.imageUrl = event.target.result;
      this.user_image = this.imageUrl;
    }
    }

  }
}
