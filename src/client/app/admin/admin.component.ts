import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';

@Component({
    moduleId: module.id,
    selector: 'sd-admin',
    templateUrl: 'admin.component.html',
    styleUrls: ['admin.component.css'],
    viewProviders: [HTTP_PROVIDERS],
    directives: [ROUTER_DIRECTIVES]
})
export class AdminComponent implements OnInit {
    constructor() { }

    ngOnInit() { }

}