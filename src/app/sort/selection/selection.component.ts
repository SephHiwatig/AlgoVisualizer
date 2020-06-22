import { Component, OnInit } from "@angular/core";
import { SortService } from "../sort.service";

@Component({
  selector: "app-selection",
  templateUrl: "./selection.component.html",
  styleUrls: ["./selection.component.css"],
})
export class SelectionComponent implements OnInit {
  constructor(private sortService: SortService) {}

  ngOnInit() {
    this.sortService.populateArray();
    this.sortService.generateBars("selection");
  }

  onSelectionSort() {
    this.sortService.onSelectionSort();
  }
}
