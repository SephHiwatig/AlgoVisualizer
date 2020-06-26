import { Component, OnInit, OnDestroy } from "@angular/core";
import { SearchSeervice } from "../search.service";

@Component({
  selector: "app-binary",
  templateUrl: "./binary.component.html",
  styleUrls: ["./binary.component.css"],
})
export class BinaryComponent implements OnInit, OnDestroy {
  languageUrl;

  constructor(private searchService: SearchSeervice) {}

  ngOnInit() {
    this.searchService.populateArrayForBinary();
    this.searchService.generateBoxes("binary");
    this.languageUrl = this.searchService.languageSelect("cplusplus", "binary");
  }

  ngOnDestroy() {
    this.searchService.killAnimation();
  }

  onLanguageSelect(language) {
    this.languageUrl = this.searchService.languageSelect(language, "binary");
  }
}
