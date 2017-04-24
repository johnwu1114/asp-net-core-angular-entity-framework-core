import { Component } from "@angular/core";
import { Http } from "@angular/http";
import { ActivatedRoute, Router } from "@angular/router";
import { ContactModel } from "../shared/models/contact.model";
import { ResultModel } from "../shared/models/result.model";

@Component({
    template: require("./contacts.component.html")
})
export class ContactsComponent {
    private api: string = "/api/contacts";
    routeSubscribe: any;
    isCreate: boolean = true;
    model: ContactModel;
    contactId: number;
    message: string;

    constructor(private http: Http,
        protected route: ActivatedRoute,
        private router: Router) {
        this.clear();
    }

    ngOnInit() {
        this.isCreate = (this.router.url.indexOf("create") != -1);
        if (this.isCreate) {
            return;
        }

        this.routeSubscribe = this.route.params.subscribe(params => {
            this.contactId = Number(params["id"]);
            if (Number(this.contactId) > 0) {
                this.find();
            } else {
                this.showMessage("Contact Id incorrect!");
            }
        });
    }

    ngOnDestroy() {
        if (this.routeSubscribe) {
            this.routeSubscribe.unsubscribe();
        }
    }

    find(): void {
        this.http.get(`${this.api}/${this.contactId}`).subscribe(
            (response) => {
                let result: ResultModel = response.json();
                if (!result.IsSuccess) {
                    this.showMessage(`Id: ${this.contactId} not found`);
                    this.contactId = 0;
                } else {
                    this.model = result.Data;
                }
            });
    }

    add(): void {
        this.clearMessage();
        this.http.post(this.api, this.model).subscribe(
            (response) => {
                let result: ResultModel = response.json();
                if (!result.IsSuccess) {
                    this.showMessage(result.Message);
                } else {
                    this.showMessage(`Added successfully, Id: ${result.Data}`);
                    this.router.navigate(["../"]);
                }
            });
    }

    save(): void {
        this.clearMessage();
        this.http.put(`${this.api}/${this.contactId}`, this.model).subscribe(
            (response) => {
                let result: ResultModel = response.json();
                if (!result.IsSuccess) {
                    this.showMessage(result.Message);
                } else {
                    this.showMessage(`Saved successfully, Id: ${this.model.Id}`);
                    this.router.navigate(["../"]);
                }
            });
    }

    clear(): void {
        this.model = new ContactModel();
    }

    clearMessage(): void {
        this.message = "";
    }

    showMessage(message: string): void {
        this.message = message;
    }
}