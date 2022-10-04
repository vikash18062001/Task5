import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mobile-emp-template',
  templateUrl: './mobile-emp-template.component.html',
  styleUrls: ['./mobile-emp-template.component.css']
})
export class MobileEmpTemplateComponent implements OnInit {
  name="Vikash";
  @Input() emp:any;
  constructor() { }

  ngOnInit(): void {
    this.updateList();
  }
  updateList()
  {
    this.name=this.emp.firstname;
  }
  showDetail()
  {

  }

}
