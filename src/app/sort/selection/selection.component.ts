import { Component, OnInit, OnDestroy } from "@angular/core";
import { SortService } from "../sort.service";

@Component({
  selector: "app-selection",
  templateUrl: "./selection.component.html",
  styleUrls: ["./selection.component.css", "../sort.style.css"],
})
export class SelectionComponent implements OnInit, OnDestroy {
  languageUrl = "";

  constructor(private sortService: SortService) {}

  ngOnInit() {
    this.sortService.populateArray();
    this.sortService.generateBars("selection");
    this.languageUrl = this.sortService.languageSelect(
      "cplusplus",
      "selection"
    );
  }

  ngOnDestroy() {
    this.sortService.killAnimation();
  }

  onLanguageSelect(language) {
    this.languageUrl = this.sortService.languageSelect(language, "selection");
  }
}
