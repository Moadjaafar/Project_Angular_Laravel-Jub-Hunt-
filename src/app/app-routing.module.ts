import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AddOfferComponent } from './add-offer/add-offer.component';
import { AllOffersComponent } from './Offer/all-offers/all-offers.component';
import { MyOffersComponent } from './Offer/my-offers/my-offers.component';
import { UpdateOfrComponent } from './update-ofr/update-ofr.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AuthService } from './shared/auth.service';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {path: '', component:LandingPageComponent},
  {path: 'Logout', component:LandingPageComponent,canActivate:[AuthGuard]},
  {path: 'Register', component:RegisterComponent},
  {path: 'Login', component:LoginComponent},
  {path: 'AddOffer', component:AddOfferComponent,canActivate:[AuthGuard]},
  {path: 'AllOffers', component:AllOffersComponent,canActivate:[AuthGuard]},
  {path: 'MyOffers', component:MyOffersComponent,canActivate:[AuthGuard]},
  {path: 'MyOffers/UpdateOfr/:articleId', component:UpdateOfrComponent,canActivate:[AuthGuard]}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
