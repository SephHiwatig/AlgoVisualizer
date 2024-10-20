import { Component, OnInit, OnDestroy } from "@angular/core";
import { SearchSeervice } from "../search.service";

@Component({
  selector: "app-jump",
  templateUrl: "./jump.component.html",
  styleUrls: ["./jump.component.css", "../search.style.css"],
})
export class JumpComponent implements OnInit, OnDestroy {

  constructor(private searchService: SearchSeervice) {}

  ngOnInit() {
    this.searchService.populateSortedArray();
    this.searchService.generateBoxes("jump");
  }

  ngOnDestroy() {
    this.searchService.killAnimation();
  }

}
