import { Component, OnInit, AfterViewInit, OnDestroy } from "@angular/core";
import { SortService } from "../sort.service";

@Component({
  selector: "app-bubble",
  templateUrl: "./bubble.component.html",
  styleUrls: ["./bubble.component.css", "../sort.style.css"],
})
export class BubbleComponent implements OnInit, OnDestroy {
  constructor(private sortService: SortService) {}

  ngOnInit() {
    this.sortService.populateArray();
    this.sortService.generateBars("bubble");
  }

  ngOnDestroy() {
    this.sortService.killAnimation();
  }
}
