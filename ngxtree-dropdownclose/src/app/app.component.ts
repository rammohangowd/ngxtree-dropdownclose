import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { TreeviewItem, TreeviewConfig, TreeviewComponent, DownlineTreeviewItem } from 'ngx-treeview';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isCollapsed = true;
  title = 'ngxtree-dropdownclose';
  myCheck: boolean = false;
  @ViewChild(TreeviewComponent) treeviewComponent: TreeviewComponent; 
  @Input('primaryLabel') primaryLabel: any[];
  @Input('secoundryLabel') secoundryLabel: string;
  @Input('width') width: string;
  @Input('singleDropdown') singleDropdown:boolean = false;
  @Input('label') label:string;
  itemTemplate: any;

  items: TreeviewItem[];
  fruitCategory = new TreeviewItem({
    text: 'Fruit', value: 1, children: [
      { text: 'Apple', value: 11, children: [
      { text: 'Gala', value: 19 },
      { text: 'Fuji', value: 120 }
    ] },
      { text: 'Mango', value: 12 }
    ]
  });
  vegetableCategory = new TreeviewItem({
    text: 'Vegetable', value: 2, children: [
      { text: 'Salad', value: 21 },
      { text: 'Potato', value: 22 }
    ]
  });
  row = [];

  dropdownEnabled = true;
  values: number[];
  config = TreeviewConfig.create({
    hasAllCheckBox: false,
    hasFilter: true,
    hasCollapseExpand: true,
    decoupleChildFromParent: false,
    maxHeight: 400
  });

  buttonClasses = [
    'btn-outline-primary',
    'btn-outline-secondary',
    'btn-outline-success',
    'btn-outline-danger',
    'btn-outline-warning',
    'btn-outline-info',
    'btn-outline-light',
    'btn-outline-dark'
  ];
  buttonClass = this.buttonClasses[0];

  constructor( ) { }

  ngOnInit() {
    
  let childElements=[];
  
    this.items = [this.fruitCategory, this.vegetableCategory];
    this.vegetableCategory.children.push(new TreeviewItem({ text: 'Mushroom', value: 23, checked: false }));
    this.vegetableCategory.correctChecked(); // need this to make 'Vegetable' node to change checked value from true to false
  }

  onSelectedChange(downlineItems: DownlineTreeviewItem[]) {
    this.row = [];
    console.log(this.items);
    console.log(downlineItems);
    downlineItems.forEach(downlineItem => {
      this.findObjectByLabel(this.items, downlineItem);
    });
  }

  onFilterChange(value: string) {
    console.log('filter:', value);
  }

  letsUpdate(input) {
    this.row.push(input);
  }
  findObjectByLabel = (obj, val) => {
    obj.forEach(element => {
      if (element.value === val) {
        this.letsUpdate(element);
      }
      else {
        if (typeof element.internalChildren === 'object') {
          this.findObjectByLabel(element.internalChildren, val);
        }
      }
    });
  }

  discardFilter(){
    console.log('discrding filter selection');
  }


}
