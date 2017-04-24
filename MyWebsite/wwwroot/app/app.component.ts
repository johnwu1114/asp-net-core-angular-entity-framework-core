import { Component } from "@angular/core";
import { Http } from "@angular/http";
import { ResultModel } from "./shared/models/result.model";
import { ContactModel } from "./shared/models/contact.model";

@Component({
    selector: "my-app",
    template: require("./app.component.html")
})
export class AppComponent {
    private api: string = "/api/contacts";
    title = "Contacts";
    model: ContactModel;
    contactId: number;
    message: string;

    constructor(private http: Http) {
        this.clear();
    }

    find(): void {
        this.clearMessage();
        if (Number(this.contactId) > 0) {
            this.http.get(`${this.api}/${this.contactId}`).subscribe(
                (response) => {
                    let result: ResultModel = response.json();
                    if (!result.IsSuccess) {
                        this.showMessage(`Id: ${this.contactId} not found`);
                        this.clear();
                    } else {
                        this.model = result.Data;
                    }
                });
        } else {
            this.showMessage("Contact Id incorrect!");
            this.clear();
        }
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
                    this.clear();
                }
            });
    }

    save(): void {
        this.clearMessage();
        this.http.put(this.api, this.model).subscribe(
            (response) => {
                let result: ResultModel = response.json();
                if (!result.IsSuccess) {
                    this.showMessage(result.Message);
                } else {
                    this.showMessage(`Saved successfully, Id: ${this.model.Id}`);
                    this.clear();
                }
            });
    }

    delete(): void {
        this.clearMessage();
        this.http.delete(`${this.api}/${this.contactId}`).subscribe(
            (response) => {
                let result: ResultModel = response.json();
                if (!result.IsSuccess) {
                    this.showMessage(`Id: ${this.contactId} not found`);
                } else {
                    this.showMessage(`Delete successfully, Id: ${this.contactId}`);
                    this.clear();
                }
            });
    }

    clear(): void {
        this.contactId = null;
        this.model = new ContactModel();
    }

    clearMessage(): void {
        this.message = "";
    }

    showMessage(message: string): void {
        this.message = message;
    }
}