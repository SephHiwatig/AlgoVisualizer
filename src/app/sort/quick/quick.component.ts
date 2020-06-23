import { Component, OnInit } from "@angular/core";
import { SortService } from "../sort.service";

@Component({
  selector: "app-quick",
  templateUrl: "./quick.component.html",
  styleUrls: ["./quick.component.css", "../sort.style.css"],
})
export class QuickComponent implements OnInit {
  languageUrl;

  constructor(private sortService: SortService) {}

  ngOnInit() {
    this.sortService.killAnimation();
    this.sortService.populateArray();
    this.sortService.generateBars("quick");
    this.languageUrl = this.sortService.languageSelect("cplusplus", "quick");
  }

  onLanguageSelect(language) {
    this.languageUrl = this.sortService.languageSelect(language, "quick");
  }
}
