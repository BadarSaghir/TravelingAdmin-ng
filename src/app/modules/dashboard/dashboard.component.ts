import { Component, OnInit} from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ChartOptions, ChartType, ChartDataSets, RadialChartOptions } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';
import {MatTable} from '@angular/material/table';
import { WHITE_ON_BLACK_CSS_CLASS } from '@angular/cdk/a11y/high-contrast-mode/high-contrast-mode-detector'

import {ViewChild} from '@angular/core';
import { TableService } from 'src/app/services/table.service';


const ELEMENT_DATA: TableService[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];


@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  //radar chart
  public radarChartOptions: RadialChartOptions = {
    responsive: true,
  };
  public radarChartLabels: Label[] = [
    "Punctuality",
    "Communication",
    "Problem Solving",
    "Team Player",
    "Coding",
    "Technical Knowledge",
    "Meeting Deadlines",
  ];
  public radarChartData: ChartDataSets[] = [
    { data: [0, 1, 2, 3, 4, 5, 6], label: "Employee Skill Analysis" },
  ];
  public radarChartType: ChartType = "radar";

  //bar chart
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = [
    "Apple",
    "Banana",
    "Kiwifruit",
    "Blueberry",
    "Orange",
    "Grapes",
  ];
  barChartType: ChartType = "bar";
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataSets[] = [
    { data: [45, 37, 60, 70, 46, 33], label: "Best Fruits" },
  ];

  //doughnut chart
  doughnutChartLabels: Label[] = ["user"];
  doughnutChartData: MultiDataSet = [[55, 25, 20]];
  doughnutChartType: ChartType = "doughnut";

  //line chart
  lineChartData: ChartDataSets[] = [
    { data: [85, 72, 78, 75, 77, 75], label: "All Users" },
  ];
  lineChartLabels: Label[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
  ];
  lineChartOptions = {
    responsive: true,
  };
  lineChartColors: Color[] = [
    {
      borderColor: "gray",
      backgroundColor: "#ebebeb",
    },
  ];
  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType: ChartType = "line";

  //table
  displayedColumns: string[] = ["name", "weight", "symbol", "position"];
  dataSource = [...ELEMENT_DATA];

  @ViewChild(MatTable) table: MatTable<TableService> | any;

  addData() {
    const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length);
    this.dataSource.push(ELEMENT_DATA[randomElementIndex]);
    this.table.renderRows();
  }

  removeData() {
    this.dataSource.pop();
    this.table.renderRows();
  }

  constructor() {}

  ngOnInit(): void {}
}