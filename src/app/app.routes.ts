import { Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { FormComponent } from '../form/form.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'form', component: FormComponent }
];
 
