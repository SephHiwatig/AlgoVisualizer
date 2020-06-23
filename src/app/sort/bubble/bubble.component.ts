import { Component, OnInit, AfterViewInit } from "@angular/core";
import { SortService } from "../sort.service";

@Component({
  selector: "app-bubble",
  templateUrl: "./bubble.component.html",
  styleUrls: ["./bubble.component.css", "../sort.style.css"],
})
export class BubbleComponent implements OnInit {
  constructor(private sortService: SortService) {}
  languageUrl = "";

  ngOnInit() {
    this.sortService.killAnimation();
    this.sortService.populateArray();
    this.sortService.generateBars("bubble");
    this.languageUrl = this.sortService.languageSelect("cplusplus", "bubble");
  }

  onLanguageSelect(language) {
    this.languageUrl = this.sortService.languageSelect(language, "bubble");
  }
}
