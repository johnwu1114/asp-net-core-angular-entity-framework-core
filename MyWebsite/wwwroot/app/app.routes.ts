import { Route } from "@angular/router";

import { ContactsComponent } from "./components/contacts.component";
import { ContactsListComponent } from "./components/contacts-list.component";
import { ErrorComponent } from "./shared/components/error.component";

interface RouteItem extends Route {
    menuName?: string;
    children?: RouteItem[];
}

const routes: RouteItem[] = [
    {
        path: "",
        redirectTo: "contacts",
        pathMatch: "full",
    },
    {
        path: "contacts",
        menuName: "Contacts",
        children: [
            {
                path: "",
                component: ContactsListComponent,
            },
            {
                path: "create",
                menuName: "New Contact",
                component: ContactsComponent,
            },
            {
                path: ":id",
                component: ContactsComponent,
            }
        ]
    },
    {
        path: "error",
        children: [
            {
                path: "",
                component: ErrorComponent
            },
            {
                path: ":id",
                component: ErrorComponent
            }
        ]
    },
    {
        path: "**",
        redirectTo: "error"
    }
];

export class AppRoutes {
    public static getRoutes(): RouteItem[] {
        return routes;
    }

    public static getComponents(): any[] {
        let result = this.findComponents(routes).filter((value, index, self) => {
            return self.indexOf(value) === index;
        });
        return result;
    }

    private static findComponents(routes: Route[]) {
        let arr: any[] = [];
        routes.forEach(item => {
            if (item.component != null) {
                arr.push(item.component);
            }
            if (item.children != null) {
                this.findComponents(item.children).forEach(com => {
                    arr.push(com);
                });
            }
        });

        arr.filter((value, index, self) => {
            return self.indexOf(value) === index;
        });
        return arr;
    }
}