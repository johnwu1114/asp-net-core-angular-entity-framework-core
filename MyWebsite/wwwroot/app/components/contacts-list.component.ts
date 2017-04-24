import { Component } from "@angular/core";
import { Http } from "@angular/http";
import { ContactModel } from "../shared/models/contact.model";
import { ResultModel } from "../shared/models/result.model";

@Component({
    template: require("./contacts-list.component.html")
})
export class ContactsListComponent {
    private api: string = "/api/contacts";
    models: ContactModel[] = [];
    message: string;

    constructor(private http: Http) {
        this.loadContacts();
    }

    loadContacts(): void {
        this.clearMessage();
        this.http.get(`${this.api}`).subscribe(
            (response) => {
                let result: ResultModel = response.json();
                if (!result.IsSuccess) {
                    this.showMessage(result.Message);
                    this.clear();
                } else {
                    this.models = result.Data;
                }
            });
    }

    delete(contactId: Number): void {
        this.clearMessage();
        this.http.delete(`${this.api}/${contactId}`).subscribe(
            (response) => {
                let result: ResultModel = response.json();
                if (!result.IsSuccess) {
                    this.showMessage(`Id: ${contactId} not found`);
                } else {
                    this.showMessage(`Delete successfully, Id: ${contactId}`);
                    this.loadContacts();
                }
            });
    }

    clear(): void {
        this.models = [];
    }

    clearMessage(): void {
        this.message = "";
    }

    showMessage(message: string): void {
        this.message = message;
    }
}