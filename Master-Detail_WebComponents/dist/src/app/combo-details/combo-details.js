import { __decorate } from "tslib";
import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { defineComponents, IgcComboComponent } from 'igniteui-webcomponents';
import '@infragistics/igniteui-webcomponents-grids/grids/combined.js';
import FinancialService from '../service/Financial-service';
import NorthwindCloudAppService from '../service/NorthwindCloudApp-service';
defineComponents(IgcComboComponent);
let ComboDetails = class ComboDetails extends LitElement {
    constructor() {
        super();
        this.northwindCloudAppService = new NorthwindCloudAppService();
        this.financialService = new FinancialService();
        this.northwindCloudAppService.getOrder().then((data) => {
            this.northwindCloudAppOrder = data;
        }, err => console.log(err));
        this.northwindCloudAppService.getOrder_Detail().then((data) => {
            this.northwindCloudAppOrderDetail = data;
        }, err => console.log(err));
        this.northwindCloudAppService.getCustomers().then((data) => {
            var _a;
            this.northwindCloudAppCustomers = data;
            this.selectedCustomer = data[0];
            this.grid = this.renderRoot.querySelector('#grid');
            this.grid.selectRows([10248]);
            this.orderDetails = (_a = this.northwindCloudAppOrderDetail) === null || _a === void 0 ? void 0 : _a.find(order => order.orderID === 10248);
            this.combo = this.renderRoot.querySelector("#combo");
            if (this.northwindCloudAppCustomers) {
                setTimeout(() => {
                    this.combo.valueKey = 'contactName';
                    this.combo.select(['Maria Anders']);
                }, 1);
            }
        }, err => console.log(err));
    }
    onSelectCustomer(ev) {
        var _a;
        ev.preventDefault();
        const currentCustomerName = ev.target.value;
        this.selectedCustomer = (_a = this.northwindCloudAppCustomers) === null || _a === void 0 ? void 0 : _a.find(customer => customer.contactName === currentCustomerName);
    }
    onSelectOrder(args) {
        var _a;
        this.selectedOrder = args.detail.newSelection[0];
        this.orderDetails = (_a = this.northwindCloudAppOrderDetail) === null || _a === void 0 ? void 0 : _a.find(order => order.orderID === this.selectedOrder.orderID);
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        return html `
      <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'>
      <link href='https://fonts.googleapis.com/css?family=Titillium+Web' rel='stylesheet'>
      <link rel='stylesheet' href='../../ig-theme.css'>
      <link rel='stylesheet' href='node_modules/@infragistics/igniteui-webcomponents-grids/grids/themes/light/material.css'>
      <div class="column-layout group">
        <igc-combo id="combo" ?outlined="${true}" single-select @blur=${this.onSelectCustomer} .data="${!this.northwindCloudAppCustomers ? [] : this.northwindCloudAppCustomers}" 
        label="Pick Customer" 
        value-key="contactName" display-key="contactName" ?autoFocusSearch="${true}" class="combo"></igc-combo>
        <div class="row-layout group_1">
        <div class="column-layout group_2">
        <h5 class="content">
          ${(_a = this.selectedCustomer) === null || _a === void 0 ? void 0 : _a.contactName}
        </h5>
        <p class="typography__body-1 text">
        ${(_b = this.selectedCustomer) === null || _b === void 0 ? void 0 : _b.customerID}
        </p>
        <div class="column-layout group_3">
          <p class="typography__subtitle-2 text_1">
            Title
          </p>
          <p class="typography__body-1 content">
            ${(_c = this.selectedCustomer) === null || _c === void 0 ? void 0 : _c.contactName}
          </p>
        </div>
        <div class="column-layout group_3">
          <p class="typography__subtitle-2 text_2">
            Email
          </p>
          <p class="typography__body-1 content">
          ${(_d = this.selectedCustomer) === null || _d === void 0 ? void 0 : _d.postalCode}
          </p>
        </div>
        <div class="column-layout group_3">
          <p class="typography__subtitle-2 text_2">
            Phone
          </p>
          <p class="typography__body-1 content">
          ${(_e = this.selectedCustomer) === null || _e === void 0 ? void 0 : _e.phone}
          </p>
        </div>
        <div class="column-layout group_3">
          <p class="typography__subtitle-2 text_2">
            Street
          </p>
          <p class="typography__body-1 content">
          ${(_f = this.selectedCustomer) === null || _f === void 0 ? void 0 : _f.address}
          </p>
        </div>
        <div class="row-layout group_3">
          <div class="column-layout group_4">
            <p class="typography__subtitle-2 text_2">
              City
            </p>
            <p class="typography__body-1 content">
            ${(_g = this.selectedCustomer) === null || _g === void 0 ? void 0 : _g.city}
            </p>
          </div>
          <div class="column-layout group_5">
            <p class="typography__subtitle-2 text_2">
              State
            </p>
            <p class="typography__body-1 content">
            ${(_h = this.selectedCustomer) === null || _h === void 0 ? void 0 : _h.city}
            </p>
          </div>
        </div>
        <div class="column-layout group_3">
          <p class="typography__subtitle-2 text_2">
            Country
          </p>
          <p class="typography__body-1 content">
          ${(_j = this.selectedCustomer) === null || _j === void 0 ? void 0 : _j.country}
          </p>
        </div>
      </div>
          <div class="column-layout group_6">
            <p class="typography__body-1 content">
              Should be allowed to query data based on param or filter after fetching data
            </p>
            <igc-grid id="grid" @rowSelectionChanging=${this.onSelectOrder} row-selection="Single" .data="${this.northwindCloudAppOrder}" primary-key="orderID" display-density="cosy" allow-filtering="true" filter-mode="excelStyleFilter" auto-generate="false" class="ig-typography ig-scrollbar grid">
              <igc-grid-toolbar>
                <igc-grid-toolbar-title>Orders</igc-grid-toolbar-title>
              </igc-grid-toolbar>
              <igc-column field="orderID" data-type="number" header="orderID" sortable="true" selectable="false"></igc-column>
              <igc-column field="customerID" data-type="string" header="customerID" sortable="true" selectable="false"></igc-column>
              <igc-column field="employeeID" data-type="number" header="employeeID" sortable="true" selectable="false"></igc-column>
              <igc-column field="orderDate" data-type="date" header="orderDate" sortable="true" selectable="false"></igc-column>
              <igc-column field="requiredDate" data-type="date" header="requiredDate" sortable="true" selectable="false"></igc-column>
              <igc-column field="shippedDate" data-type="date" header="shippedDate" sortable="true" selectable="false"></igc-column>
              <igc-column field="shipVia" data-type="number" header="shipVia" sortable="true" selectable="false"></igc-column>
              <igc-column field="freight" data-type="number" header="freight" sortable="true" selectable="false"></igc-column>
              <igc-column field="shipName" data-type="string" header="shipName" sortable="true" selectable="false"></igc-column>
              <igc-column field="shipAddress" data-type="string" header="shipAddress" sortable="true" selectable="false"></igc-column>
              <igc-column field="shipCity" data-type="string" header="shipCity" sortable="true" selectable="false"></igc-column>
              <igc-column field="shipRegion" data-type="string" header="shipRegion" sortable="true" selectable="false"></igc-column>
              <igc-column field="shipPostalCode" data-type="string" header="shipPostalCode" sortable="true" selectable="false"></igc-column>
              <igc-column field="shipCountry" data-type="string" header="shipCountry" sortable="true" selectable="false"></igc-column>
              <igc-column field="customer.customerID" data-type="string" header="customer customerID" sortable="true" selectable="false"></igc-column>
              <igc-column field="customer.companyName" data-type="string" header="customer companyName" sortable="true" selectable="false"></igc-column>
              <igc-column field="customer.contactName" data-type="string" header="customer contactName" sortable="true" selectable="false"></igc-column>
              <igc-column field="customer.contactTitle" data-type="string" header="customer contactTitle" sortable="true" selectable="false"></igc-column>
              <igc-column field="customer.address" data-type="string" header="customer address" sortable="true" selectable="false"></igc-column>
              <igc-column field="customer.city" data-type="string" header="customer city" sortable="true" selectable="false"></igc-column>
              <igc-column field="customer.region" data-type="string" header="customer region" sortable="true" selectable="false"></igc-column>
              <igc-column field="customer.postalCode" data-type="string" header="customer postalCode" sortable="true" selectable="false"></igc-column>
              <igc-column field="customer.country" data-type="string" header="customer country" sortable="true" selectable="false"></igc-column>
              <igc-column field="customer.phone" data-type="string" header="customer phone" sortable="true" selectable="false"></igc-column>
              <igc-column field="customer.fax" data-type="string" header="customer fax" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.employeeID" data-type="number" header="employee employeeID" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.lastName" data-type="string" header="employee lastName" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.firstName" data-type="string" header="employee firstName" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.title" data-type="string" header="employee title" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.titleOfCourtesy" data-type="string" header="employee titleOfCourtesy" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.birthDate" data-type="date" header="employee birthDate" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.hireDate" data-type="date" header="employee hireDate" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.address" data-type="string" header="employee address" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.city" data-type="string" header="employee city" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.region" data-type="string" header="employee region" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.postalCode" data-type="string" header="employee postalCode" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.country" data-type="string" header="employee country" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.homePhone" data-type="string" header="employee homePhone" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.extension" data-type="string" header="employee extension" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.photo" data-type="string" header="employee photo" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.notes" data-type="string" header="employee notes" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.reportsTo" data-type="number" header="employee reportsTo" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.photoPath" data-type="string" header="employee photoPath" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.reportsToNavigation.employeeID" data-type="number" header="employee reportsToNavigation employeeID" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.reportsToNavigation.lastName" data-type="string" header="employee reportsToNavigation lastName" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.reportsToNavigation.firstName" data-type="string" header="employee reportsToNavigation firstName" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.reportsToNavigation.title" data-type="string" header="employee reportsToNavigation title" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.reportsToNavigation.titleOfCourtesy" data-type="string" header="employee reportsToNavigation titleOfCourtesy" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.reportsToNavigation.birthDate" data-type="date" header="employee reportsToNavigation birthDate" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.reportsToNavigation.hireDate" data-type="date" header="employee reportsToNavigation hireDate" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.reportsToNavigation.address" data-type="string" header="employee reportsToNavigation address" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.reportsToNavigation.city" data-type="string" header="employee reportsToNavigation city" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.reportsToNavigation.region" data-type="string" header="employee reportsToNavigation region" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.reportsToNavigation.postalCode" data-type="string" header="employee reportsToNavigation postalCode" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.reportsToNavigation.country" data-type="string" header="employee reportsToNavigation country" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.reportsToNavigation.homePhone" data-type="string" header="employee reportsToNavigation homePhone" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.reportsToNavigation.extension" data-type="string" header="employee reportsToNavigation extension" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.reportsToNavigation.photo" data-type="string" header="employee reportsToNavigation photo" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.reportsToNavigation.notes" data-type="string" header="employee reportsToNavigation notes" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.reportsToNavigation.reportsTo" data-type="number" header="employee reportsToNavigation reportsTo" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.reportsToNavigation.photoPath" data-type="string" header="employee reportsToNavigation photoPath" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.reportsToNavigation.reportsToNavigation.employeeID" data-type="number" header="employee reportsToNavigation reportsToNavigation employeeID" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.reportsToNavigation.reportsToNavigation.lastName" data-type="string" header="employee reportsToNavigation reportsToNavigation lastName" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.reportsToNavigation.reportsToNavigation.firstName" data-type="string" header="employee reportsToNavigation reportsToNavigation firstName" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.reportsToNavigation.reportsToNavigation.title" data-type="string" header="employee reportsToNavigation reportsToNavigation title" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.reportsToNavigation.reportsToNavigation.titleOfCourtesy" data-type="string" header="employee reportsToNavigation reportsToNavigation titleOfCourtesy" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.reportsToNavigation.reportsToNavigation.birthDate" data-type="date" header="employee reportsToNavigation reportsToNavigation birthDate" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.reportsToNavigation.reportsToNavigation.hireDate" data-type="date" header="employee reportsToNavigation reportsToNavigation hireDate" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.reportsToNavigation.reportsToNavigation.address" data-type="string" header="employee reportsToNavigation reportsToNavigation address" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.reportsToNavigation.reportsToNavigation.city" data-type="string" header="employee reportsToNavigation reportsToNavigation city" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.reportsToNavigation.reportsToNavigation.region" data-type="string" header="employee reportsToNavigation reportsToNavigation region" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.reportsToNavigation.reportsToNavigation.postalCode" data-type="string" header="employee reportsToNavigation reportsToNavigation postalCode" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.reportsToNavigation.reportsToNavigation.country" data-type="string" header="employee reportsToNavigation reportsToNavigation country" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.reportsToNavigation.reportsToNavigation.homePhone" data-type="string" header="employee reportsToNavigation reportsToNavigation homePhone" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.reportsToNavigation.reportsToNavigation.extension" data-type="string" header="employee reportsToNavigation reportsToNavigation extension" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.reportsToNavigation.reportsToNavigation.photo" data-type="string" header="employee reportsToNavigation reportsToNavigation photo" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.reportsToNavigation.reportsToNavigation.notes" data-type="string" header="employee reportsToNavigation reportsToNavigation notes" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.reportsToNavigation.reportsToNavigation.reportsTo" data-type="number" header="employee reportsToNavigation reportsToNavigation reportsTo" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.reportsToNavigation.reportsToNavigation.photoPath" data-type="string" header="employee reportsToNavigation reportsToNavigation photoPath" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.reportsToNavigation.reportsToNavigation.reportsToNavigation.employeeID" data-type="number" header="employee reportsToNavigation reportsToNavigation reportsToNavigation employeeID" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.reportsToNavigation.reportsToNavigation.reportsToNavigation.lastName" data-type="string" header="employee reportsToNavigation reportsToNavigation reportsToNavigation lastName" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.reportsToNavigation.reportsToNavigation.reportsToNavigation.firstName" data-type="string" header="employee reportsToNavigation reportsToNavigation reportsToNavigation firstName" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.reportsToNavigation.reportsToNavigation.reportsToNavigation.title" data-type="string" header="employee reportsToNavigation reportsToNavigation reportsToNavigation title" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.reportsToNavigation.reportsToNavigation.reportsToNavigation.titleOfCourtesy" data-type="string" header="employee reportsToNavigation reportsToNavigation reportsToNavigation titleOfCourtesy" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.reportsToNavigation.reportsToNavigation.reportsToNavigation.birthDate" data-type="date" header="employee reportsToNavigation reportsToNavigation reportsToNavigation birthDate" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.reportsToNavigation.reportsToNavigation.reportsToNavigation.hireDate" data-type="date" header="employee reportsToNavigation reportsToNavigation reportsToNavigation hireDate" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.reportsToNavigation.reportsToNavigation.reportsToNavigation.address" data-type="string" header="employee reportsToNavigation reportsToNavigation reportsToNavigation address" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.reportsToNavigation.reportsToNavigation.reportsToNavigation.city" data-type="string" header="employee reportsToNavigation reportsToNavigation reportsToNavigation city" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.reportsToNavigation.reportsToNavigation.reportsToNavigation.region" data-type="string" header="employee reportsToNavigation reportsToNavigation reportsToNavigation region" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.reportsToNavigation.reportsToNavigation.reportsToNavigation.postalCode" data-type="string" header="employee reportsToNavigation reportsToNavigation reportsToNavigation postalCode" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.reportsToNavigation.reportsToNavigation.reportsToNavigation.country" data-type="string" header="employee reportsToNavigation reportsToNavigation reportsToNavigation country" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.reportsToNavigation.reportsToNavigation.reportsToNavigation.homePhone" data-type="string" header="employee reportsToNavigation reportsToNavigation reportsToNavigation homePhone" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.reportsToNavigation.reportsToNavigation.reportsToNavigation.extension" data-type="string" header="employee reportsToNavigation reportsToNavigation reportsToNavigation extension" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.reportsToNavigation.reportsToNavigation.reportsToNavigation.photo" data-type="string" header="employee reportsToNavigation reportsToNavigation reportsToNavigation photo" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.reportsToNavigation.reportsToNavigation.reportsToNavigation.notes" data-type="string" header="employee reportsToNavigation reportsToNavigation reportsToNavigation notes" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.reportsToNavigation.reportsToNavigation.reportsToNavigation.reportsTo" data-type="number" header="employee reportsToNavigation reportsToNavigation reportsToNavigation reportsTo" sortable="true" selectable="false"></igc-column>
              <igc-column field="employee.reportsToNavigation.reportsToNavigation.reportsToNavigation.photoPath" data-type="string" header="employee reportsToNavigation reportsToNavigation reportsToNavigation photoPath" sortable="true" selectable="false"></igc-column>
              <igc-column field="shipViaNavigation.shipperID" data-type="number" header="shipViaNavigation shipperID" sortable="true" selectable="false"></igc-column>
              <igc-column field="shipViaNavigation.companyName" data-type="string" header="shipViaNavigation companyName" sortable="true" selectable="false"></igc-column>
              <igc-column field="shipViaNavigation.phone" data-type="string" header="shipViaNavigation phone" sortable="true" selectable="false"></igc-column>
            </igc-grid>
            <igc-grid .data="${!this.orderDetails ? [] : [this.orderDetails]}" primary-key="orderID" display-density="cosy" allow-filtering="true" filter-mode="excelStyleFilter" auto-generate="false" class="ig-typography ig-scrollbar grid_1">
              <igc-grid-toolbar>
                <igc-grid-toolbar-title>Order details</igc-grid-toolbar-title>
              </igc-grid-toolbar>
              <igc-column field="orderID" data-type="number" header="orderID" sortable="true" selectable="false"></igc-column>
              <igc-column field="productID" data-type="number" header="productID" sortable="true" selectable="false"></igc-column>
              <igc-column field="unitPrice" data-type="number" header="unitPrice" sortable="true" selectable="false"></igc-column>
              <igc-column field="quantity" data-type="number" header="quantity" sortable="true" selectable="false"></igc-column>
              <igc-column field="discount" data-type="number" header="discount" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.orderID" data-type="number" header="order orderID" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.customerID" data-type="string" header="order customerID" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employeeID" data-type="number" header="order employeeID" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.orderDate" data-type="date" header="order orderDate" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.requiredDate" data-type="date" header="order requiredDate" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.shippedDate" data-type="date" header="order shippedDate" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.shipVia" data-type="number" header="order shipVia" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.freight" data-type="number" header="order freight" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.shipName" data-type="string" header="order shipName" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.shipAddress" data-type="string" header="order shipAddress" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.shipCity" data-type="string" header="order shipCity" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.shipRegion" data-type="string" header="order shipRegion" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.shipPostalCode" data-type="string" header="order shipPostalCode" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.shipCountry" data-type="string" header="order shipCountry" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.customer.customerID" data-type="string" header="order customer customerID" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.customer.companyName" data-type="string" header="order customer companyName" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.customer.contactName" data-type="string" header="order customer contactName" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.customer.contactTitle" data-type="string" header="order customer contactTitle" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.customer.address" data-type="string" header="order customer address" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.customer.city" data-type="string" header="order customer city" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.customer.region" data-type="string" header="order customer region" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.customer.postalCode" data-type="string" header="order customer postalCode" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.customer.country" data-type="string" header="order customer country" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.customer.phone" data-type="string" header="order customer phone" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.customer.fax" data-type="string" header="order customer fax" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.employeeID" data-type="number" header="order employee employeeID" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.lastName" data-type="string" header="order employee lastName" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.firstName" data-type="string" header="order employee firstName" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.title" data-type="string" header="order employee title" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.titleOfCourtesy" data-type="string" header="order employee titleOfCourtesy" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.birthDate" data-type="date" header="order employee birthDate" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.hireDate" data-type="date" header="order employee hireDate" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.address" data-type="string" header="order employee address" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.city" data-type="string" header="order employee city" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.region" data-type="string" header="order employee region" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.postalCode" data-type="string" header="order employee postalCode" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.country" data-type="string" header="order employee country" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.homePhone" data-type="string" header="order employee homePhone" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.extension" data-type="string" header="order employee extension" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.photo" data-type="string" header="order employee photo" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.notes" data-type="string" header="order employee notes" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.reportsTo" data-type="number" header="order employee reportsTo" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.photoPath" data-type="string" header="order employee photoPath" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.reportsToNavigation.employeeID" data-type="number" header="order employee reportsToNavigation employeeID" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.reportsToNavigation.lastName" data-type="string" header="order employee reportsToNavigation lastName" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.reportsToNavigation.firstName" data-type="string" header="order employee reportsToNavigation firstName" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.reportsToNavigation.title" data-type="string" header="order employee reportsToNavigation title" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.reportsToNavigation.titleOfCourtesy" data-type="string" header="order employee reportsToNavigation titleOfCourtesy" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.reportsToNavigation.birthDate" data-type="date" header="order employee reportsToNavigation birthDate" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.reportsToNavigation.hireDate" data-type="date" header="order employee reportsToNavigation hireDate" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.reportsToNavigation.address" data-type="string" header="order employee reportsToNavigation address" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.reportsToNavigation.city" data-type="string" header="order employee reportsToNavigation city" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.reportsToNavigation.region" data-type="string" header="order employee reportsToNavigation region" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.reportsToNavigation.postalCode" data-type="string" header="order employee reportsToNavigation postalCode" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.reportsToNavigation.country" data-type="string" header="order employee reportsToNavigation country" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.reportsToNavigation.homePhone" data-type="string" header="order employee reportsToNavigation homePhone" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.reportsToNavigation.extension" data-type="string" header="order employee reportsToNavigation extension" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.reportsToNavigation.photo" data-type="string" header="order employee reportsToNavigation photo" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.reportsToNavigation.notes" data-type="string" header="order employee reportsToNavigation notes" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.reportsToNavigation.reportsTo" data-type="number" header="order employee reportsToNavigation reportsTo" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.reportsToNavigation.photoPath" data-type="string" header="order employee reportsToNavigation photoPath" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.reportsToNavigation.reportsToNavigation.employeeID" data-type="number" header="order employee reportsToNavigation reportsToNavigation employeeID" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.reportsToNavigation.reportsToNavigation.lastName" data-type="string" header="order employee reportsToNavigation reportsToNavigation lastName" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.reportsToNavigation.reportsToNavigation.firstName" data-type="string" header="order employee reportsToNavigation reportsToNavigation firstName" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.reportsToNavigation.reportsToNavigation.title" data-type="string" header="order employee reportsToNavigation reportsToNavigation title" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.reportsToNavigation.reportsToNavigation.titleOfCourtesy" data-type="string" header="order employee reportsToNavigation reportsToNavigation titleOfCourtesy" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.reportsToNavigation.reportsToNavigation.birthDate" data-type="date" header="order employee reportsToNavigation reportsToNavigation birthDate" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.reportsToNavigation.reportsToNavigation.hireDate" data-type="date" header="order employee reportsToNavigation reportsToNavigation hireDate" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.reportsToNavigation.reportsToNavigation.address" data-type="string" header="order employee reportsToNavigation reportsToNavigation address" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.reportsToNavigation.reportsToNavigation.city" data-type="string" header="order employee reportsToNavigation reportsToNavigation city" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.reportsToNavigation.reportsToNavigation.region" data-type="string" header="order employee reportsToNavigation reportsToNavigation region" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.reportsToNavigation.reportsToNavigation.postalCode" data-type="string" header="order employee reportsToNavigation reportsToNavigation postalCode" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.reportsToNavigation.reportsToNavigation.country" data-type="string" header="order employee reportsToNavigation reportsToNavigation country" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.reportsToNavigation.reportsToNavigation.homePhone" data-type="string" header="order employee reportsToNavigation reportsToNavigation homePhone" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.reportsToNavigation.reportsToNavigation.extension" data-type="string" header="order employee reportsToNavigation reportsToNavigation extension" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.reportsToNavigation.reportsToNavigation.photo" data-type="string" header="order employee reportsToNavigation reportsToNavigation photo" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.reportsToNavigation.reportsToNavigation.notes" data-type="string" header="order employee reportsToNavigation reportsToNavigation notes" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.reportsToNavigation.reportsToNavigation.reportsTo" data-type="number" header="order employee reportsToNavigation reportsToNavigation reportsTo" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.reportsToNavigation.reportsToNavigation.photoPath" data-type="string" header="order employee reportsToNavigation reportsToNavigation photoPath" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.reportsToNavigation.reportsToNavigation.reportsToNavigation.employeeID" data-type="number" header="order employee reportsToNavigation reportsToNavigation reportsToNavigation employeeID" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.reportsToNavigation.reportsToNavigation.reportsToNavigation.lastName" data-type="string" header="order employee reportsToNavigation reportsToNavigation reportsToNavigation lastName" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.reportsToNavigation.reportsToNavigation.reportsToNavigation.firstName" data-type="string" header="order employee reportsToNavigation reportsToNavigation reportsToNavigation firstName" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.reportsToNavigation.reportsToNavigation.reportsToNavigation.title" data-type="string" header="order employee reportsToNavigation reportsToNavigation reportsToNavigation title" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.reportsToNavigation.reportsToNavigation.reportsToNavigation.titleOfCourtesy" data-type="string" header="order employee reportsToNavigation reportsToNavigation reportsToNavigation titleOfCourtesy" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.reportsToNavigation.reportsToNavigation.reportsToNavigation.birthDate" data-type="date" header="order employee reportsToNavigation reportsToNavigation reportsToNavigation birthDate" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.reportsToNavigation.reportsToNavigation.reportsToNavigation.hireDate" data-type="date" header="order employee reportsToNavigation reportsToNavigation reportsToNavigation hireDate" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.reportsToNavigation.reportsToNavigation.reportsToNavigation.address" data-type="string" header="order employee reportsToNavigation reportsToNavigation reportsToNavigation address" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.reportsToNavigation.reportsToNavigation.reportsToNavigation.city" data-type="string" header="order employee reportsToNavigation reportsToNavigation reportsToNavigation city" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.reportsToNavigation.reportsToNavigation.reportsToNavigation.region" data-type="string" header="order employee reportsToNavigation reportsToNavigation reportsToNavigation region" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.reportsToNavigation.reportsToNavigation.reportsToNavigation.postalCode" data-type="string" header="order employee reportsToNavigation reportsToNavigation reportsToNavigation postalCode" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.reportsToNavigation.reportsToNavigation.reportsToNavigation.country" data-type="string" header="order employee reportsToNavigation reportsToNavigation reportsToNavigation country" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.reportsToNavigation.reportsToNavigation.reportsToNavigation.homePhone" data-type="string" header="order employee reportsToNavigation reportsToNavigation reportsToNavigation homePhone" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.reportsToNavigation.reportsToNavigation.reportsToNavigation.extension" data-type="string" header="order employee reportsToNavigation reportsToNavigation reportsToNavigation extension" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.reportsToNavigation.reportsToNavigation.reportsToNavigation.photo" data-type="string" header="order employee reportsToNavigation reportsToNavigation reportsToNavigation photo" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.reportsToNavigation.reportsToNavigation.reportsToNavigation.notes" data-type="string" header="order employee reportsToNavigation reportsToNavigation reportsToNavigation notes" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.reportsToNavigation.reportsToNavigation.reportsToNavigation.reportsTo" data-type="number" header="order employee reportsToNavigation reportsToNavigation reportsToNavigation reportsTo" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.employee.reportsToNavigation.reportsToNavigation.reportsToNavigation.photoPath" data-type="string" header="order employee reportsToNavigation reportsToNavigation reportsToNavigation photoPath" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.shipViaNavigation.shipperID" data-type="number" header="order shipViaNavigation shipperID" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.shipViaNavigation.companyName" data-type="string" header="order shipViaNavigation companyName" sortable="true" selectable="false"></igc-column>
              <igc-column field="order.shipViaNavigation.phone" data-type="string" header="order shipViaNavigation phone" sortable="true" selectable="false"></igc-column>
              <igc-column field="product.productID" data-type="number" header="product productID" sortable="true" selectable="false"></igc-column>
              <igc-column field="product.productName" data-type="string" header="product productName" sortable="true" selectable="false"></igc-column>
              <igc-column field="product.supplierID" data-type="number" header="product supplierID" sortable="true" selectable="false"></igc-column>
              <igc-column field="product.categoryID" data-type="number" header="product categoryID" sortable="true" selectable="false"></igc-column>
              <igc-column field="product.quantityPerUnit" data-type="string" header="product quantityPerUnit" sortable="true" selectable="false"></igc-column>
              <igc-column field="product.unitPrice" data-type="number" header="product unitPrice" sortable="true" selectable="false"></igc-column>
              <igc-column field="product.unitsInStock" data-type="number" header="product unitsInStock" sortable="true" selectable="false"></igc-column>
              <igc-column field="product.unitsOnOrder" data-type="number" header="product unitsOnOrder" sortable="true" selectable="false"></igc-column>
              <igc-column field="product.reorderLevel" data-type="number" header="product reorderLevel" sortable="true" selectable="false"></igc-column>
              <igc-column field="product.discontinued" data-type="boolean" header="product discontinued" sortable="true" selectable="false"></igc-column>
              <igc-column field="product.category.categoryID" data-type="number" header="product category categoryID" sortable="true" selectable="false"></igc-column>
              <igc-column field="product.category.categoryName" data-type="string" header="product category categoryName" sortable="true" selectable="false"></igc-column>
              <igc-column field="product.category.description" data-type="string" header="product category description" sortable="true" selectable="false"></igc-column>
              <igc-column field="product.category.picture" data-type="string" header="product category picture" sortable="true" selectable="false"></igc-column>
              <igc-column field="product.supplier.supplierID" data-type="number" header="product supplier supplierID" sortable="true" selectable="false"></igc-column>
              <igc-column field="product.supplier.companyName" data-type="string" header="product supplier companyName" sortable="true" selectable="false"></igc-column>
              <igc-column field="product.supplier.contactName" data-type="string" header="product supplier contactName" sortable="true" selectable="false"></igc-column>
              <igc-column field="product.supplier.contactTitle" data-type="string" header="product supplier contactTitle" sortable="true" selectable="false"></igc-column>
              <igc-column field="product.supplier.address" data-type="string" header="product supplier address" sortable="true" selectable="false"></igc-column>
              <igc-column field="product.supplier.city" data-type="string" header="product supplier city" sortable="true" selectable="false"></igc-column>
              <igc-column field="product.supplier.region" data-type="string" header="product supplier region" sortable="true" selectable="false"></igc-column>
              <igc-column field="product.supplier.postalCode" data-type="string" header="product supplier postalCode" sortable="true" selectable="false"></igc-column>
              <igc-column field="product.supplier.country" data-type="string" header="product supplier country" sortable="true" selectable="false"></igc-column>
              <igc-column field="product.supplier.phone" data-type="string" header="product supplier phone" sortable="true" selectable="false"></igc-column>
              <igc-column field="product.supplier.fax" data-type="string" header="product supplier fax" sortable="true" selectable="false"></igc-column>
              <igc-column field="product.supplier.homePage" data-type="string" header="product supplier homePage" sortable="true" selectable="false"></igc-column>
            </igc-grid>
          </div>
        </div>
      </div>
    `;
    }
};
ComboDetails.styles = css `
    :host {
      height: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: stretch;
      align-content: flex-start;
    }
    .column-layout {
      display: flex;
      flex-direction: column;
    }
    .group {
      justify-content: flex-start;
      align-items: stretch;
      align-content: flex-start;
      position: relative;
      margin: 0;
      width: 1441px;
      min-width: 50px;
      min-height: 50px;
    }
    .row-layout {
      display: flex;
    }
    .group_1 {
      background-color: hsla(var(--ig-gray-100));
      justify-content: flex-start;
      align-items: stretch;
      align-content: flex-start;
      position: relative;
      padding: 2rem;
      height: 910px;
      min-width: 50px;
      min-height: 50px;
    }
    .group_2 {
      justify-content: flex-start;
      align-items: stretch;
      align-content: flex-start;
      position: relative;
      margin: 0 2rem 0 0;
      width: 502px;
      min-width: 50px;
      min-height: 50px;
    }
    .group_3 {
      border-bottom: 1px solid #E0E0E0;
      justify-content: flex-start;
      align-items: stretch;
      align-content: flex-start;
      position: relative;
      min-width: 50px;
      min-height: 50px;
    }
    .group_4 {
      border-bottom: 1px solid #E0E0E0;
      justify-content: flex-start;
      align-items: stretch;
      align-content: flex-start;
      position: relative;
      width: 220px;
      min-width: 50px;
      min-height: 50px;
    }
    .group_5 {
      border-bottom: 1px solid #E0E0E0;
      justify-content: flex-start;
      align-items: stretch;
      align-content: flex-start;
      position: relative;
      width: 231px;
      min-width: 50px;
      min-height: 50px;
    }
    .group_6 {
      justify-content: flex-start;
      align-items: stretch;
      align-content: flex-start;
      position: relative;
      width: 1020px;
      min-width: 50px;
      min-height: 50px;
    }
    .combo {
      margin: 1rem;
      width: max-content;
      height: max-content;
      min-width: min-content;
    }
    .content {
      height: max-content;
      min-width: min-content;
    }
    .text {
      margin: 0 0 1rem;
      height: max-content;
      min-width: min-content;
    }
    .text_1 {
      margin: 1rem 0 0;
      height: max-content;
      min-width: min-content;
    }
    .grid {
      margin: 20px 0;
      min-width: 600px;
      min-height: 300px;
      flex-grow: 1;
      flex-basis: 0;
    }
    .grid_1 {
      min-width: 600px;
      min-height: 300px;
      flex-grow: 1;
      flex-basis: 0;
    }
  `;
__decorate([
    property()
], ComboDetails.prototype, "grid", void 0);
__decorate([
    property()
], ComboDetails.prototype, "northwindCloudAppOrder", void 0);
__decorate([
    property()
], ComboDetails.prototype, "northwindCloudAppOrderDetail", void 0);
__decorate([
    property()
], ComboDetails.prototype, "northwindCloudAppCustomers", void 0);
__decorate([
    property()
], ComboDetails.prototype, "orderDetails", void 0);
__decorate([
    property()
], ComboDetails.prototype, "selectedOrder", void 0);
__decorate([
    property()
], ComboDetails.prototype, "selectedCustomer", void 0);
__decorate([
    property()
], ComboDetails.prototype, "combo", void 0);
ComboDetails = __decorate([
    customElement('app-combo-details')
], ComboDetails);
export default ComboDetails;
//# sourceMappingURL=combo-details.js.map