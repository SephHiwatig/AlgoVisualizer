import { Component, OnInit, OnDestroy } from "@angular/core";
import { SortService } from "../sort.service";

@Component({
  selector: "app-insertion",
  templateUrl: "./insertion.component.html",
  styleUrls: ["./insertion.component.css", "../sort.style.css"],
})
export class InsertionComponent implements OnInit, OnDestroy {
  languageUrl;

  constructor(private sortService: SortService) {}

  ngOnInit() {
    this.sortService.populateArray();
    this.sortService.generateBars("insertion");
    this.languageUrl = this.sortService.languageSelect(
      "cplusplus",
      "insertion"
    );
  }

  ngOnDestroy() {
    this.sortService.killAnimation();
  }

  onLanguageSelect(language) {
    this.languageUrl = this.sortService.languageSelect(language, "insertion");
  }
}
