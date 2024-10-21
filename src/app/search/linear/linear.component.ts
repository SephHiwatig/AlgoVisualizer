import { Component, OnInit, OnDestroy } from "@angular/core";
import { SearchSeervice } from "../search.service";

@Component({
  selector: "app-linear",
  templateUrl: "./linear.component.html",
  styleUrls: ["./linear.component.css", "../search.style.css"],
})
export class LinearComponent implements OnInit, OnDestroy {
  
  constructor(private searchService: SearchSeervice) {}

  ngOnInit() {
    this.searchService.populateArray();
    this.searchService.generateBoxes("linear");
  }

  ngOnDestroy() {
    this.searchService.killAnimation();
  }
}
