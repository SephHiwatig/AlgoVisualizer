import { Component, OnInit, OnDestroy } from "@angular/core";
import { SortService } from "../sort.service";

@Component({
  selector: "app-selection",
  templateUrl: "./selection.component.html",
  styleUrls: ["./selection.component.css", "../sort.style.css"],
})
export class SelectionComponent implements OnInit, OnDestroy {
  constructor(private sortService: SortService) {}

  ngOnInit() {
    this.sortService.populateArray();
    this.sortService.generateBars("selection");
  }

  ngOnDestroy() {
    this.sortService.killAnimation();
  }
}
