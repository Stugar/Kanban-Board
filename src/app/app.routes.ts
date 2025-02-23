import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TaskComponent } from './task/task.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {path: 'register', component: RegisterComponent},
    {path: 'sidebar', component: SidebarComponent},
    {path: 'task', component: TaskComponent},
    { path: 'task/:boardName', component: TaskComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },

];
