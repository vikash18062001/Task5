import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Component, OnInit ,Input} from '@angular/core';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  constructor(private _service:RegistrationService) { }
  @Output() EmpDetail:EventEmitter<any> = new EventEmitter();
  @Input() Employee:any;
  count =0;
  filter:any;
  emp:any;
  ngOnInit() {
  }
  formEmpDetail(empDetail:any)
  {
    this.EmpDetail.emit(empDetail);
  } 

  
  

}
