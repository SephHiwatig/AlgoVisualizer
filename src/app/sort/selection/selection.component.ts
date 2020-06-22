import { Component, OnInit } from "@angular/core";
import { SortService } from "../sort.service";

@Component({
  selector: "app-selection",
  templateUrl: "./selection.component.html",
  styleUrls: ["./selection.component.css", "../sort.style.css"],
})
export class SelectionComponent implements OnInit {
  languageUrl = "../../../assets/sample_code/sort/selection/cplusplus.PNG";

  constructor(private sortService: SortService) {}

  ngOnInit() {
    this.sortService.populateArray();
    this.sortService.generateBars("selection");
    this.onLanguageSelect("cplusplus");
  }

  onSelectionSort() {
    this.sortService.onSelectionSort();
  }

  onLanguageSelect(language) {
    let languages = document.querySelectorAll(".language");
    languages.forEach((language) => {
      (language as HTMLElement).style.borderBottom = "none";
    });

    switch (language) {
      case "cplusplus": {
        this.languageUrl =
          "../../../assets/sample_code/sort/selection/cplusplus.PNG";
        let el = document.querySelector("#cplusplus") as HTMLElement;
        el.style.borderBottom = "4px solid #3f51b5";
        break;
      }
      case "c": {
        this.languageUrl = "../../../assets/sample_code/sort/selection/c.PNG";
        let el = document.querySelector("#c") as HTMLElement;
        el.style.borderBottom = "4px solid #3f51b5";
        break;
      }
      case "python": {
        this.languageUrl =
          "../../../assets/sample_code/sort/selection/python.PNG";
        let el = document.querySelector("#python") as HTMLElement;
        el.style.borderBottom = "4px solid #3f51b5";
        break;
      }
      case "java": {
        this.languageUrl =
          "../../../assets/sample_code/sort/selection/java.PNG";
        let el = document.querySelector("#java") as HTMLElement;
        el.style.borderBottom = "4px solid #3f51b5";
        break;
      }
      case "csharp": {
        this.languageUrl =
          "../../../assets/sample_code/sort/selection/csharp.PNG";
        let el = document.querySelector("#csharp") as HTMLElement;
        el.style.borderBottom = "4px solid #3f51b5";
        break;
      }
      case "php": {
        this.languageUrl = "../../../assets/sample_code/sort/selection/php.PNG";
        let el = document.querySelector("#php") as HTMLElement;
        el.style.borderBottom = "4px solid #3f51b5";
        break;
      }
    }
  }
}
