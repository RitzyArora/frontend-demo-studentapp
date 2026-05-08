import { Routes } from '@angular/router';
import { adminGuard } from '../guard/admin.guard';
import { LoginComponent } from '../components/login/login.component';
import { StudentListComponent } from '../components/student-list/student-list.component';
import { RegisterComponent } from '../components/register/register.component';

export const routes: Routes = [
      {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  },
    {
    path: 'login',
    component: LoginComponent
  },
  {
  path:'register',
  component:RegisterComponent
},

  {
    path: 'students',
    component: StudentListComponent
  },

  {
    path: 'admin',
    component: StudentListComponent,
    canActivate: [adminGuard]
  }
];
