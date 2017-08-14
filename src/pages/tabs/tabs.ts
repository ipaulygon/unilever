import { Component } from '@angular/core';

import { CalculatorPage } from '../calculator/calculator';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = CalculatorPage;

  constructor() {

  }
}
