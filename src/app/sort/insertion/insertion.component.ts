import { Component, OnInit, OnDestroy } from "@angular/core";
import { SortService } from "../sort.service";

@Component({
  selector: "app-insertion",
  templateUrl: "./insertion.component.html",
  styleUrls: ["./insertion.component.css", "../sort.style.css"],
})
export class InsertionComponent implements OnInit, OnDestroy {

  constructor(private sortService: SortService) {}

  ngOnInit() {
    this.sortService.populateArray();
    this.sortService.generateBars("insertion");
  }

  ngOnDestroy() {
    this.sortService.killAnimation();
  }
}
