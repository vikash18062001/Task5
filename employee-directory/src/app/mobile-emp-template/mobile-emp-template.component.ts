import { EventEmitter, Output } from '@angular/core';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mobile-emp-template',
  templateUrl: './mobile-emp-template.component.html',
  styleUrls: ['./mobile-emp-template.component.css']
})
export class MobileEmpTemplateComponent implements OnInit {
  name:any;
  @Output() giveForm:EventEmitter<any> = new EventEmitter();
  @Input() emp:any;
  imageUrl:any;
  constructor() { }

  ngOnInit(): void {
    this.updateList();
  }
  updateList()
  {
    this.imageUrl = this.emp.imageurl;
    this.name=this.emp.preferredName;
  }
  showDetail(emp:any)
  {
    var search =(emp.currentTarget.children[1].innerText);
    this.giveForm.emit(search);
  }

}
