import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule ,UrlSegment } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DrawerComponent } from './drawer/drawer.component';
import { FiltersComponent } from './filters/filters.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeDetailTemplateComponent } from './employee-detail-template/employee-detail-template.component';
import { FormTemplateComponent } from './form-template/form-template.component';
import { EmployeeServiceService } from './employee-service.service';
import { FormsModule } from '@angular/forms';
import { RegistrationService } from './registration.service';
import { MobileEmpUiComponent } from './mobile-emp-ui/mobile-emp-ui.component';
import { MobileEmpTemplateComponent } from './mobile-emp-template/mobile-emp-template.component';
// import { MobileFormTemplateComponent } from './mobile-form-template/mobile-form-template.component';
import { MobileFormShowComponent } from './mobile-form-show/mobile-form-show.component';
import { MobileEmpFormTemplateComponent } from './mobile-emp-form-template/mobile-emp-form-template.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DrawerComponent,
    FiltersComponent,
    EmployeeDetailsComponent,
    EmployeeDetailTemplateComponent,
    FormTemplateComponent,
    MobileEmpUiComponent,
    MobileEmpTemplateComponent,
    MobileFormShowComponent,
    MobileEmpFormTemplateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [EmployeeServiceService,RegistrationService,EmployeeDetailsComponent,DrawerComponent,FormTemplateComponent,FiltersComponent],
  bootstrap: [AppComponent]

})
export class AppModule { }
