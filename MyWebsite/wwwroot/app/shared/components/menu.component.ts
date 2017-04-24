import { Component, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { AppRoutes } from "../../app.routes";

@Component({
    selector: "menu-comp",
    template: require("./menu.component.html"),
})
export class MenuComponent {
    menu: any[] = [];

    constructor() {
        this.menu = AppRoutes.getRoutes();
    }
}