import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TombolaCoreModule } from '../../../../libs/tombola-core/src/lib/tombola-core.module';
import { TombolaUiModule } from "@tombola/tombola-ui"

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, TombolaUiModule, TombolaCoreModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
