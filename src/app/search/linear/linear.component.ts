import { Component, OnInit, OnDestroy } from "@angular/core";
import { SearchSeervice } from "../search.service";

@Component({
  selector: "app-linear",
  templateUrl: "./linear.component.html",
  styleUrls: ["./linear.component.css", "../search.style.css"],
})
export class LinearComponent implements OnInit, OnDestroy {
  languageUrl;

  constructor(private searchService: SearchSeervice) {}

  ngOnInit() {
    this.searchService.populateArray();
    this.searchService.generateBoxes("linear");
    this.languageUrl = this.searchService.languageSelect("cplusplus", "linear");
  }

  ngOnDestroy() {
    this.searchService.killAnimation();
  }

  onLanguageSelect(language) {
    this.languageUrl = this.searchService.languageSelect(language, "linear");
  }
}
