import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TmBuilderComponent } from './tm-builder/tm-builder.component';
import { TmTemplateComponent } from './tm-template/tm-template.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TmValidationComponent } from './tm-validation/tm-validation.component';

@NgModule({
  declarations: [
    AppComponent,
    TmBuilderComponent,
    TmTemplateComponent,
    LoginpageComponent,
    TmValidationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
