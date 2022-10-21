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

  @Output() EmpDetail:EventEmitter<any> = new EventEmitter();
  @Input() Employee:any;
  count =0;
  constructor
  (
    private _service:RegistrationService
  ) {}
  ngOnInit() {
  }
  formEmpDetail(empDetail:any)
  {
    this.EmpDetail.emit(empDetail);
  } 
}
