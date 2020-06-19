import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SelectionComponent } from "./sort/selection/selection.component";
import { BubbleComponent } from "./sort/bubble/bubble.component";
import { InsertionComponent } from "./sort/insertion/insertion.component";
import { QuickComponent } from "./sort/quick/quick.component";

const routes: Routes = [
  {
    path: "sort",
    children: [
      { path: "selection", component: SelectionComponent },
      { path: "bubble", component: BubbleComponent },
      { path: "insertion", component: InsertionComponent },
      { path: "quick", component: QuickComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
