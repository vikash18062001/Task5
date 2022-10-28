import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {
  departements = ['IT','Human Resources','MD','Sales'];
  offices = ['Seattle','India'];
  jobTitles = ['SharePoint Practice Head','.Net Development Lead','Recruiting Expert','BI Developer','Business Analyst','Operations Manager' ,'Product Manager' , 'Lead Engineer','Software Engineer','UI Designer'];
  constructor() {}
  getDepartements()
  {
    return this.departements;
  
  }
  getOffices()
  {
    return this.offices;
  }
  getJobTitles()
  {
    return this.jobTitles;
  }
}
