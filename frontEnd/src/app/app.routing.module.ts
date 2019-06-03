import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './components/contact/contact.component';
import { ListComponent } from './views/list/list.component';


const routes: Routes = [
    { path: '', component: ListComponent },
    { path: 'contact', component: ContactComponent }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
