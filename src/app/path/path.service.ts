import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class PathService {
  constructor() {}

  generateGrid() {
    const visualContainer = document.querySelector(
      ".algo-visual"
    ) as HTMLElement;
    visualContainer.style.flexDirection = "column";
    // create 10 rows
    for (let i = 0; i < 25; i++) {
      let row = document.createElement("div");
      row.style.width = "100%";
      row.style.display = "flex";
      row.style.flex = "1";
      // create 10 columns
      for (let j = 0; j < 25; j++) {
        let col = document.createElement("div");
        col.style.flex = "1";
        col.style.backgroundColor = "#fff";
        col.style.borderRadius = "4px";
        col.style.margin = "1px";
        col.style.border = "1px solid #fff";
        col.setAttribute("class", "col");
        col.style.cursor = "pointer";
        col.style.display = "flex";
        col.addEventListener("drop", (event) => {
          this.drop(event);
        });
        col.addEventListener("dragover", (event) => {
          this.allowDrop(event);
        });
        col.addEventListener("mouseenter", (event) => {
          if (event.buttons === 1) {
            const el = event.target as HTMLElement;
            if (el.childElementCount === 0) {
              el.style.backgroundColor = "black";
            }
          }
        });
        col.addEventListener("mousedown", (event) => {
          const el = event.target as HTMLElement;
          console.log(el);
          if (!el.id) {
            el.style.backgroundColor = "black";
          }
        });

        if (i === 0 && j === 0) {
          let img = document.createElement("img");
          img.style.maxWidth = "100%";
          img.style.maxHeight = "100%";
          img.style.margin = "auto";
          img.setAttribute("src", "./assets/imgs/start.png");
          img.setAttribute("id", "start");
          img.draggable = true;
          img.addEventListener("dragstart", (event) => {
            this.drag(event);
          });
          col.appendChild(img);
        }

        if (i === 24 && j === 24) {
          let img = document.createElement("img");
          img.style.maxWidth = "100%";
          img.style.maxHeight = "100%";
          img.style.margin = "auto";
          img.setAttribute("src", "./assets/imgs/finish.png");
          img.setAttribute("id", "finish");
          img.addEventListener("dragstart", (event) => {
            this.drag(event);
          });
          col.appendChild(img);
        }

        row.appendChild(col);
      }

      visualContainer.appendChild(row);
    }
  }

  private allowDrop(ev) {
    ev.preventDefault();
  }

  private drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }

  private drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    let img = document.getElementById(data) as HTMLElement;
    ev.target.appendChild(img);
  }
}
