import { Component, OnInit, AfterViewInit } from "@angular/core";
import { SortService } from "../sort.service";

@Component({
  selector: "app-bubble",
  templateUrl: "./bubble.component.html",
  styleUrls: ["./bubble.component.css", "../sort.style.css"],
})
export class BubbleComponent implements OnInit, AfterViewInit {
  constructor(private sortService: SortService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.sortService.populateArray();
    this.sortService.generateBars("bubble");
  }
}
