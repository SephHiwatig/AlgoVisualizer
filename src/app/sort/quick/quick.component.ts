import { Component, OnInit, OnDestroy } from "@angular/core";
import { SortService } from "../sort.service";

@Component({
  selector: "app-quick",
  templateUrl: "./quick.component.html",
  styleUrls: ["./quick.component.css", "../sort.style.css"],
})
export class QuickComponent implements OnInit, OnDestroy {

  constructor(private sortService: SortService) {}

  ngOnInit() {
    this.sortService.populateArray();
    this.sortService.generateBars("quick");
  }

  ngOnDestroy() {
    this.sortService.killAnimation();
  }
}
