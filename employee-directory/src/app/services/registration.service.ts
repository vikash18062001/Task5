import { Injectable } from '@angular/core';
import { EmployeeServiceService } from './employee-service.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  public isFilter = false;
  allEmployee:Object[]= [];
  database = new Map();
  filterEmployee:Object[]=[];
  data:any;
  countNode = new Map();
  constructor(private _empService:EmployeeServiceService) {
    this.initializeCountNode();
    this.countFreq();
    this.initializeDB();
  }
  initializeDB()
  {
    this.database.set('First Name','firstname');
    this.database.set('Preferred Name','preferredName');
    this.database.set('Last Name','lastName');
    this.database.set('Email','email');
    this.database.set('Job Title','jobTitle');
    this.database.set('Office','office');
    this.database.set('Skype Id','skypeId');
    this.database.set('Departement','dept');
    this.database.set('Phone Number','phoneNumber');
  }
  initializeCountNode()
  {
    for(let x of this._empService.departements)
    this.countNode.set(x,0);
    for(let x of this._empService.jobTitles)
    this.countNode.set(x,0);
    for(let x of this._empService.offices)
    this.countNode.set(x,0);
  }
  getAllEmployee()
  {
    var x =localStorage.getItem('employee');
    if(x)
    {
    this.data = JSON.parse(x);
    }
    return this.data; //JSON Parse does not accept null value so we first have to check the null condition.
  }
  registerNewEmployee(newEmployee:any)
  {
    var currentData =this.getAllEmployee();
    if(newEmployee.preferredName === undefined)
      newEmployee.preferredName=newEmployee.firstname+' '+newEmployee.lastName;
    
    if(currentData)
    {
      this.allEmployee=currentData;
    }

    this.allEmployee.push(newEmployee);
    localStorage.setItem('employee',JSON.stringify(this.allEmployee));
    this.initializeCountNode();
    this.countFreq();
  }
  countFreq()
  {
    var x = this.getAllEmployee();
    if(x)
    for(var newEmployee of x )
    {
    this.countNode.set(newEmployee.dept,this.countNode.get(newEmployee.dept)+1);
    this.countNode.set(newEmployee.office,this.countNode.get(newEmployee.office)+1);
    this.countNode.set(newEmployee.jobTitle,this.countNode.get(newEmployee.jobTitle)+1);
    }
  }
  searchFilter(value: any,basis: any)
  {
    var x =this.getAllEmployee();
    this.filterEmployee  =[];
    for(var y of x)
    {
      if(y[basis].toLowerCase()==value.toLowerCase())
        {
          this.filterEmployee.push(y);
        }
    }
    return this.filterEmployee;
  }
  searchFilterByFirstName(value:any ,basis:any)
  {
    var x =this.getAllEmployee();
    this.filterEmployee  =[];
    for(var y of x)
    {
      if(y[this.database.get(basis)].toLowerCase().indexOf(value.toLowerCase())==0)
        {
          this.filterEmployee.push(y);
        }
    }
    return this.filterEmployee;
  }
  searchBasedOnSearchFilter(value:any,basis:any)
  {
    var x =this.getAllEmployee();
    this.filterEmployee  =[];
    for(var y of x)
    {
      if(y[this.database.get(basis)].toLowerCase().indexOf(value.toLowerCase())>-1)
        {
          this.filterEmployee.push(y);
        }
    }
    return this.filterEmployee;
  }
  getEmpDetail(name:string)
  {
      var emp = this.getAllEmployee();
      var res;
      for(var y of emp)
      {
        if(y['preferredName'].toLowerCase()===name.toLowerCase())
        {
          res = y;
        }
      }
      return res;
  }
  editEmployee(emp:any,name:any)
  {
    var x = this.getAllEmployee();
    var newList ;
    newList  = x.map((e:any)=>{
      if(e['preferredName']==name)
      {
        if(emp.preferredName==='')
        emp.preferredName = emp.firstname + ' ' + emp.lastName;
        return emp;
      }
      else
      {
        return e;
      }
    })
    localStorage.setItem('employee',JSON.stringify(newList));
    this.initializeCountNode();
    this.countFreq();
  }
  deleteAnEmployee(emp:any)
  {
    var empDetail = this.getAllEmployee();
    var y = empDetail.filter((x:any)=>{
      if(emp.preferredName === x.preferredName)
        return false;
      else
        return true;
    })
    localStorage.setItem('employee',JSON.stringify(y));
    this.initializeCountNode();
    this.countFreq();
  }
}
