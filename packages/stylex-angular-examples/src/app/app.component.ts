import {Component} from "@angular/core";

declare var module: {
  id: string;
};

@Component({
  // moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css']
})

export class AppComponent {
  title: String = "App Works !";
}
