import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app.routing";

import { AppComponent } from "./app.component";
import { NavComponent } from "./nav/nav.component";
import { SelectionComponent } from "./sort/selection/selection.component";
import { BubbleComponent } from "./sort/bubble/bubble.component";
import { InsertionComponent } from "./sort/insertion/insertion.component";
import { QuickComponent } from "./sort/quick/quick.component";

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SelectionComponent,
    BubbleComponent,
    InsertionComponent,
    QuickComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
