import { Component } from "@angular/core";
import { Http } from "@angular/http";

@Component({
    selector: "app-comp",
    template: require("./app.component.html")
})
export class AppComponent {
    title = "Contacts";
}