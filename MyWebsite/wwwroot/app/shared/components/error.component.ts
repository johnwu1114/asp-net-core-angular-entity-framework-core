import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    template: require("./error.component.html"),
})
export class ErrorComponent {
    sub: any;
    errorCode: string;

    constructor(protected route: ActivatedRoute) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.loadData(params["id"]);
        });
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    loadData(id: number) {
        this.errorCode = id > 0 ? id.toString() : "404";
    }
}