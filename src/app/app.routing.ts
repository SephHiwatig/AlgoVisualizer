import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SelectionComponent } from "./sort/selection/selection.component";
import { BubbleComponent } from "./sort/bubble/bubble.component";
import { InsertionComponent } from "./sort/insertion/insertion.component";
import { QuickComponent } from "./sort/quick/quick.component";
import { LinearComponent } from "./search/linear/linear.component";
import { BinaryComponent } from "./search/binary/binary.component";
import { JumpComponent } from "./search/jump/jump.component";
import { DijkstraComponent } from "./path/dijkstra/dijkstra.component";
import { AstarComponent } from "./path/astar/astar.component";

const routes: Routes = [
  { path: "", redirectTo: "sort/selection", pathMatch: "full"},
  {
    path: "sort",
    children: [
      { path: "selection", component: SelectionComponent },
      { path: "bubble", component: BubbleComponent },
      { path: "insertion", component: InsertionComponent },
      { path: "quick", component: QuickComponent },
    ],
  },
  {
    path: "search",
    children: [
      { path: "linear", component: LinearComponent },
      { path: "binary", component: BinaryComponent },
      { path: "jump", component: JumpComponent },
    ],
  },
  {
    path: "path",
    children: [
      { path: "dijkstra", component: DijkstraComponent },
      { path: "astar", component: AstarComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
