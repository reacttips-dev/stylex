import {Component} from "@angular/core";

import stylex from '@ladifire-opensource/stylex';

declare var module: {
  id: string;
};

const styles = stylex.create({
  root: {
    backgroundColor: "red"
  }
});

@Component({
  // moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css']
})

export class AppComponent {
  title: String = "App Works !";

  constructor() {

    console.log("___styles", styles);
  }

  ngOnInit() {

  }
}
