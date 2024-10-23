import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// Routing
import { AppRoutingModule } from "./app.routing";

// Components
import { AppComponent } from "./app.component";
import { NavComponent } from "./nav/nav.component";
import { SelectionComponent } from "./sort/selection/selection.component";
import { BubbleComponent } from "./sort/bubble/bubble.component";
import { InsertionComponent } from "./sort/insertion/insertion.component";
import { QuickComponent } from "./sort/quick/quick.component";
import { LinearComponent } from "./search/linear/linear.component";
import { BinaryComponent } from "./search/binary/binary.component";
import { JumpComponent } from "./search/jump/jump.component";
import { DijkstraComponent } from "./path/dijkstra/dijkstra.component";
import { AstarComponent } from "./path/astar/astar.component";
import { BarsComponent } from "./sort/bars/bars.component";

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SelectionComponent,
    BubbleComponent,
    InsertionComponent,
    QuickComponent,
    LinearComponent,
    BinaryComponent,
    JumpComponent,
    DijkstraComponent,
    AstarComponent,
    BarsComponent
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
