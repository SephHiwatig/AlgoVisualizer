import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SearchSeervice {
  arrayToSearch = [];
  valueToSearch;
  timeOuts = [];

  constructor() {}

  populateArray() {
    this.arrayToSearch = [];
    for (let i = 0; i < 10; i++) {
      this.arrayToSearch.push(Math.ceil(Math.random() * 100));
    }

    const randomIndex = Math.ceil(Math.random() * 10) - 1;
    this.valueToSearch = this.arrayToSearch[randomIndex];
  }

  onLinearSearch() {
    const boxCount = this.arrayToSearch.length;
    const boxes = document.querySelectorAll(".box");
    for (let i = 0; i < boxCount; i++) {
      this.timeOuts.push(
        setTimeout(() => {
          (boxes[i] as HTMLElement).style.backgroundColor = "#e91e63";
          if (i > 0) {
            (boxes[i - 1] as HTMLElement).style.backgroundColor = "#428df5";
          }
          if (this.arrayToSearch[i] === this.valueToSearch) {
            this.timeOuts.forEach((to) => {
              clearTimeout(to);
            });
            this.timeOuts = [];
            (boxes[i] as HTMLElement).style.backgroundColor = "green";
            alert(this.valueToSearch + "Found!");
          }
        }, i * 1000)
      );
    }
  }

  onBinarySearch() {
    alert("binary");
  }

  onJumpSearch() {
    alert("jump");
  }

  generateBoxes(searchType) {
    const visualContainer = document.querySelector(
      ".algo-visual"
    ) as HTMLElement;
    var searchBtn = document.createElement("button");
    searchBtn.innerHTML = "Search " + this.valueToSearch;
    searchBtn.style.position = "absolute";
    searchBtn.style.top = "5px";
    searchBtn.style.left = "5px";
    searchBtn.style.border = "none";
    searchBtn.style.backgroundColor = "#1fa638"; //"#428df5"
    searchBtn.style.color = "#fff";
    searchBtn.style.padding = "10px";
    searchBtn.style.borderRadius = "4px";
    searchBtn.style.cursor = "pointer";
    switch (searchType) {
      case "linear": {
        searchBtn.addEventListener("click", this.onLinearSearch.bind(this));
        break;
      }
      case "binary": {
        searchBtn.addEventListener("click", this.onBinarySearch.bind(this));
        break;
      }
      case "jump": {
        searchBtn.addEventListener("click", this.onJumpSearch.bind(this));
        break;
      }
    }
    visualContainer.appendChild(searchBtn);

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
