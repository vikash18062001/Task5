export class User
{
    dept!:string;
    email!:string;
    preferredName!:string;
    lastName!:string;
    firstname!:string;
    jobTitle!:string;
    office!:string;
    phoneNumber!:string;
    skype!:string;
    constructor(emp:any)
    {
        this.dept = emp.dept;
        this.email = emp.email;
        this.preferredName = emp.preferredName;
        this.lastName = emp.lastName;
        this.firstname = emp.firstname;
        this.jobTitle = emp.jobTitle;
        this.office = emp.office;
        this.phoneNumber = emp.phoneNumber;
        this.skype = emp.skype;
    }
}