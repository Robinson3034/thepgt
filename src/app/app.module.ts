import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { CustomerProfileModule } from './main/content/pages/customer-profile/customer-profile.module';
import { CustomerProfileComponent } from './main/content/pages/customer-profile/customer-profile.component';
import { FexsharedModule } from './shared/fexshared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    CustomerProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FexsharedModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule

  ],
  providers: [{ provide: Router }],
  bootstrap: [AppComponent]

})
export class AppModule { }
