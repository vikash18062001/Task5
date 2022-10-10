import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MobileEmpTemplateComponent } from './mobile-emp-template/mobile-emp-template.component';
import { MobileFormShowComponent } from './mobile-form-show/mobile-form-show.component';

const routes: Routes = [
  {path:'mobileform',component:MobileFormShowComponent},
  {path:'addemp',component:MobileEmpTemplateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
