import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  public isMobileResolution : boolean;
  constructor() 
  {
    if(window.innerWidth<768)
    this.isMobileResolution = true;
    else
    this.isMobileResolution = false;
  }
  public getMobileResolution()
  {
    return this.isMobileResolution;
  }
}
