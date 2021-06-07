import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SignatureModule } from "@groupdocs.examples.angular/signature";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
    SignatureModule.forRoot("http://localhost:8080")],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
