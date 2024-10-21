import { Component, OnInit, OnDestroy } from "@angular/core";
import { SearchSeervice } from "../search.service";

@Component({
  selector: "app-binary",
  templateUrl: "./binary.component.html",
  styleUrls: ["./binary.component.css", "../search.style.css"],
})
export class BinaryComponent implements OnInit, OnDestroy {

  constructor(private searchService: SearchSeervice) {}

  ngOnInit() {
    this.searchService.populateSortedArray();
    this.searchService.generateBoxes("binary");
  }

  ngOnDestroy() {
    this.searchService.killAnimation();
  }

}
