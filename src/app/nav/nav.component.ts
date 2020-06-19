import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"],
})
export class NavComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    // Hide the dropdown menu for mobile when window is desktop size
    window.addEventListener("resize", () => {
      const width = window.innerWidth;
      if (width >= 768) {
        const menu = document.querySelector(".nav-menu-mobile") as HTMLElement;
        menu.style.display = "none";
      }
    });
  }

  // Dropdown menu toggler for mobile
  onToggleMobileMenu() {
    let menu = <HTMLElement>document.querySelector(".nav-menu-mobile");
    if (menu.style.display !== "block") {
      menu.style.display = "block";
    } else {
      menu.style.display = "none";
    }
  }
}
