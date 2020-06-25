import { Component, OnInit } from "@angular/core";
import { SearchSeervice } from "../search.service";

@Component({
  selector: "app-linear",
  templateUrl: "./linear.component.html",
  styleUrls: ["./linear.component.css", "../search.style.css"],
})
export class LinearComponent implements OnInit {
  languageUrl;

  constructor(private searchService: SearchSeervice) {}

  ngOnInit() {
    this.searchService.populateArray();
    this.searchService.generateBoxes();
    this.languageUrl = this.searchService.languageSelect("cplusplus", "linear");
  }

  onLanguageSelect(language) {
    this.languageUrl = this.searchService.languageSelect(language, "linear");
  }
}
