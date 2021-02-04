import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Group, Image, Path, Text } from '@progress/kendo-drawing';

import * as models from '../../../domain/models';
import * as sharedModels from '../../../../../shared/models';
import * as coreModels from '../../../../../core/models';
import { AxisLabelVisualArgs } from '@progress/kendo-angular-charts';
import { Point, Rect, Size, transform } from '@progress/kendo-drawing/geometry';
import * as _ from 'lodash';

@Component({
  templateUrl: './routes-details.component.html',
  selector: 'operator-routes-details-2',
  styles: [`.your-offer {color: #c6262c;} .your-offer td {background: #efd8d9;}`],
  encapsulation: ViewEncapsulation.None
})
export class RoutesDetails2Component {
  @Input() legs: Array<models.LegRequest> = [];
  @Input() serviceClass: sharedModels.ServiceClassEnum;
  @Input() category: models.AircraftCategory;
  @Input() isMain = true;
  @Input() dba: coreModels.DBA;
  @Input() orgLegalName: string;
  @Input() purchaseOffer: models.OperatorPurchaseOffer;

  dbaEnums = coreModels.DBA;
  serviceClassEnum = sharedModels.ServiceClassEnum;


  categories = [{
    id: 4,
    name: 'Light Jet'
  }, {
    id: 6,
    name: 'Super Mid Size Jet'
  }, {
    id: 1,
    name: 'Turboprop Jet'
  }, {
    id: 2,
    name: 'Mid Size Jet'
  }, {
    id: 3,
    name: 'Heavy Jet'
  }, {
    id: 5,
    name: 'URL Jet'
  },
  ];

  public bidsInfo = [
    { category: 'Light Jet', min: 7000, max: 7500, models: [{model: 'Model 1', price: '$7,000'}, {model: 'Model 2', price: '$7,000 - $7,500'}] },
    { category: 'Mid Size Jet', min: 8000, max: 11000, yourOffer: true, models: [{model: 'Model 3', price: '$8,000', yourOffer: true}, {model: 'Model 4', price: '$8,000 - $11,000'}] },
    { category: 'Super Mid Size Jet', min: 10000, max: 12000, models: [{model: 'Model 5', price: '$10,000'}, {model: 'Model 6', price: '$10,000 - $12,000'}] },
    { category: 'Heavy Jet', min: 10000, max: 14000, models: [{model: 'Model 7', price: '$10,000'}, {model: 'Model 8', price: '$10,000 - $14,000'}] },
  ];

  constructor(
    // private router: Router
  ) { }

  explainServiceClass(): void {
    // this.router.navigate(['./'], { queryParams: { 't': 's' } });
  }

  public onRender = (args: any): void => {
    const chart = args.sender;

    // get the axes
    const valueAxis = chart.findAxisByName('valueAxis');
    const categoryAxis = chart.findAxisByName('categoryAxis');

    // get the coordinates of the value at which the plot band will be rendered
    // const valueSlot = valueAxis.slot(this.bidsInfo[0].min);
    const valueSlot = valueAxis.slot(9000);

    // get the coordinates of the entire category axis range
    const range = categoryAxis.range();
    const categorySlot = categoryAxis.slot(range.min, range.max);

    // draw the plot band based on the found coordinates
    const line = new Path({
      stroke: {
        color: '#c6262c',
        width: 1
      }
    }).moveTo(valueSlot.origin)
      .lineTo(categorySlot.topRight().x, valueSlot.origin.y);

    const label = new Text('Your Offer', [0, 0], {
      fill: {
        color: '#c6262c'
      },
      font: '14px sans'
    });
    const bbox = label.bbox();
    label.position([ categorySlot.topRight().x - bbox.size.width, valueSlot.origin.y - bbox.size.height ]);

    const group = new Group();
    group.append(line, label);

    // Draw on the Chart surface to overlay the series
    chart.surface.draw(group);

    // Or as a first element in the pane to appear behind the series
    // chart.findPaneByIndex(0).visual.insert(0, group);
  }

  public onRenderHorizontal = (args: any): void => {
    const chart = args.sender;

    // get the axes
    const valueAxis = chart.findAxisByName('valueAxis');
    const categoryAxis = chart.findAxisByName('categoryAxis');

    // get the coordinates of the value at which the plot band will be rendered
    // const valueSlot = valueAxis.slot(this.bidsInfo[0].min);
    const valueSlot = valueAxis.slot(9000);

    // get the coordinates of the entire category axis range
    const range = categoryAxis.range();
    const categorySlot = categoryAxis.slot(range.min, range.max);

    // draw the plot band based on the found coordinates
    const line = new Path({
      stroke: {
        color: '#c6262c',
        width: 1
      }
    }).moveTo(valueSlot.origin)
      .lineTo(valueSlot.origin.x, categorySlot.topRight().y);

    const label = new Text('Your Offer', [0, 0], {
      fill: {
        color: '#c6262c'
      },
      font: '14px sans'
    });
    const bbox = label.bbox();
    label.position([ valueSlot.origin.x - bbox.size.width, categorySlot.bottomRight().y - bbox.size.height ]);

    const group = new Group();
    group.append(line, label);

    // Draw on the Chart surface to overlay the series
    chart.surface.draw(group);

    // Or as a first element in the pane to appear behind the series
    // chart.findPaneByIndex(0).visual.insert(0, group);
  }


  // public seriesData: number[] = [2034, 40124, 45234, 30234, 50234];
  // public categories: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

  // Notice that to capture 'this', the approach utilizes
  // a lambda function instead of a method
  public labelVisual = (e: AxisLabelVisualArgs) => {
    const defaultLabel = e.createVisual();
    //
    // if (e.value === 'Light Jet') {
    //   return defaultLabel;
    // }
    //
    // const path = new Path({
    //   stroke: {
    //     color: 'red',
    //     width: 1
    //   }
    // });
    //
    // const bbox = defaultLabel.bbox();
    // path.moveTo(bbox.bottomLeft()).lineTo(bbox.bottomRight());
    //
    // const group = new Group();
    // group.append(defaultLabel, path);
    //
    // return group;

    // const path = new Path({
    //   stroke: {
    //     color: "#9999b6",
    //     width: 2
    //   }
    // });

    // The path is constructed by using a chain of commands
    // path.moveTo(0, 0)
    //   .lineTo(150, 0).lineTo(150, 65).lineTo(0, 65)
    //   .close();

    // This rectangle defines the image position and size
    const imageRect = new Rect(
      new Point(5, 5),
      new Size(90, 70)
    );

    // Create the image
    let imageUrl = `../../../../assets/props_pic.png`;
    if (e.value === 'Light Jet') {
      imageUrl = '../../../../assets/light.png';
    } else if (e.value === 'Super Mid Size Jet') {
      imageUrl = '../../../../assets/super_mid_size.png';
    } else if (e.value === 'Turboprop Jet') {
      imageUrl = '../../../../assets/turboprop.png';
    } else if (e.value === 'Mid Size Jet') {
      imageUrl = '../../../../assets/mid_size.png';
    } else if (e.value === 'Heavy Jet') {
      imageUrl = '../../../../assets/heavy.png';
    } else {
      imageUrl = '../../../../assets/ulr.png';
    }
    // @ts-ignore
    const image = new Image(imageUrl, imageRect);

    // Create the text
    // const text = new Text(
    //   "Diego Roel",
    //   new Point(60, 25),
    //   { font: "bold 15px Arial" }
    // );

    // Place all the shapes in a group
    const group = new Group();
    group.append(image);

     const bbox = defaultLabel.bbox();
     // path.moveTo(bbox.bottomLeft()).lineTo(bbox.bottomRight());
    // // Translate the group
    group.transform(
      transform().translate((bbox.topRight().x + bbox.topLeft().x) / 2 - 45, bbox.topLeft().y)
    );

    // Render the group on the surface
    // surface.draw(group);


    return group;
  }

  public labelVisualHorizontal = (e: AxisLabelVisualArgs) => {
    const defaultLabel = e.createVisual();
    //
    // if (e.value === 'Light Jet') {
    //   return defaultLabel;
    // }
    //
    // const path = new Path({
    //   stroke: {
    //     color: 'red',
    //     width: 1
    //   }
    // });
    //
    // const bbox = defaultLabel.bbox();
    // path.moveTo(bbox.bottomLeft()).lineTo(bbox.bottomRight());
    //
    // const group = new Group();
    // group.append(defaultLabel, path);
    //
    // return group;

    // const path = new Path({
    //   stroke: {
    //     color: "#9999b6",
    //     width: 2
    //   }
    // });

    // The path is constructed by using a chain of commands
    // path.moveTo(0, 0)
    //   .lineTo(150, 0).lineTo(150, 65).lineTo(0, 65)
    //   .close();

    // This rectangle defines the image position and size
    const imageRect = new Rect(
      new Point(5, 5),
      new Size(90, 70)
    );

    // Create the image
    let imageUrl = `../../../../assets/props_pic.png`;
    if (e.value === 'Light Jet') {
      imageUrl = '../../../../assets/light.png';
    } else if (e.value === 'Super Mid Size Jet') {
      imageUrl = '../../../../assets/super_mid_size.png';
    } else if (e.value === 'Turboprop Jet') {
      imageUrl = '../../../../assets/turboprop.png';
    } else if (e.value === 'Mid Size Jet') {
      imageUrl = '../../../../assets/mid_size.png';
    } else if (e.value === 'Heavy Jet') {
      imageUrl = '../../../../assets/heavy.png';
    } else {
      imageUrl = '../../../../assets/ulr.png';
    }
    // @ts-ignore
    const image = new Image(imageUrl, imageRect);

    // Create the text
    // const text = new Text(
    //   "Diego Roel",
    //   new Point(60, 25),
    //   { font: "bold 15px Arial" }
    // );

    // Place all the shapes in a group
    const group = new Group();
    group.append(image);

     const bbox = defaultLabel.bbox();
     // path.moveTo(bbox.bottomLeft()).lineTo(bbox.bottomRight());
    // // Translate the group
    group.transform(
      transform().translate(bbox.topRight().x - 90, bbox.topLeft().y)
    );

    // Render the group on the surface
    // surface.draw(group);


    return group;
  }

  getValue(value) {
    return JSON.stringify(value);
  }

  getModelsByCategory(cat) {
    return _.find(this.bidsInfo, item => item.category === cat);
  }

  rowCallback(context) {
    if (_.find(context.dataItem.models, bid => bid.yourOffer)) {
      return 'your-offer';
    }
  }

  nestedRowCallback(context) {
    if (context.dataItem.yourOffer) {
      return 'your-offer';
    }
  }
}
