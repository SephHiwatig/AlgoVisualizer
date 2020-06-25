import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SearchSeervice {
  arrayToSearch = [];

  constructor() {}

  populateArray() {
    this.arrayToSearch = [];
    for (let i = 0; i < 10; i++) {
      this.arrayToSearch.push(Math.ceil(Math.random() * 10));
    }
  }

  generateBoxes() {
    const visualContainer = document.querySelector(
      ".algo-visual"
    ) as HTMLElement;
    visualContainer.style.alignItems = "center";
    this.arrayToSearch.forEach((num) => {
      const box = document.createElement("div");
      const size = Math.ceil((visualContainer.clientWidth - 20) / 10);
      box.setAttribute("class", "box");
      box.style.width = size + "px";
      box.style.height = size + "px";
      box.style.marginLeft = "1px";
      box.style.marginRight = "1px";
      box.style.borderRadius = "4px";
      box.style.backgroundColor = "#428df5";
      box.style.textAlign = "center";
      box.style.verticalAlign = "middle";
      box.style.lineHeight = size + "px";
      box.style.fontSize = "large";
      box.innerHTML = num;
      box.style.color = "#fff";
      visualContainer.appendChild(box);
    });
  }

  languageSelect(language, searchType) {
    let languageUrl = "";
    let languages = document.querySelectorAll(".language");
    languages.forEach((language) => {
      (language as HTMLElement).style.borderBottom = "none";
    });

    switch (language) {
      case "cplusplus": {
        languageUrl =
          "../../../assets/sample_code/search/" + searchType + "/cplusplus.PNG";
        let el = document.querySelector("#cplusplus") as HTMLElement;
        el.style.borderBottom = "4px solid #3f51b5";
        break;
      }
      case "c": {
        languageUrl =
          "../../../assets/sample_code/search/" + searchType + "/c.PNG";
        let el = document.querySelector("#c") as HTMLElement;
        el.style.borderBottom = "4px solid #3f51b5";
        break;
      }
      case "python": {
        languageUrl =
          "../../../assets/sample_code/search/" + searchType + "/python.PNG";
        let el = document.querySelector("#python") as HTMLElement;
        el.style.borderBottom = "4px solid #3f51b5";
        break;
      }
      case "java": {
        languageUrl =
          "../../../assets/sample_code/search/" + searchType + "/java.PNG";
        let el = document.querySelector("#java") as HTMLElement;
        el.style.borderBottom = "4px solid #3f51b5";
        break;
      }
      case "csharp": {
        languageUrl =
          "../../../assets/sample_code/search/" + searchType + "/csharp.PNG";
        let el = document.querySelector("#csharp") as HTMLElement;
        el.style.borderBottom = "4px solid #3f51b5";
        break;
      }
      case "php": {
        languageUrl =
          "../../../assets/sample_code/search/" + searchType + "/php.PNG";
        let el = document.querySelector("#php") as HTMLElement;
        el.style.borderBottom = "4px solid #3f51b5";
        break;
      }
    }
    return languageUrl;
  }
}
