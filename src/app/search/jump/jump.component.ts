import { Component, OnInit } from "@angular/core";
import { SearchSeervice } from "../search.service";

@Component({
  selector: "app-jump",
  templateUrl: "./jump.component.html",
  styleUrls: ["./jump.component.css"],
})
export class JumpComponent implements OnInit {
  languageUrl;

  constructor(private searchService: SearchSeervice) {}

  ngOnInit() {
    this.searchService.populateSortedArray();
    this.searchService.generateBoxes("jump");
    this.languageUrl = this.searchService.languageSelect("cplusplus", "jump");
  }

  onLanguageSelect(language) {
    this.languageUrl = this.searchService.languageSelect(language, "jump");
  }
}
