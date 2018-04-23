import { Component, OnInit, HostBinding } from '@angular/core';
import { pageTransition } from '../animations';
import { TranslateService } from '@ngx-translate/core';

import { TestCaseService } from './test-case.service';
import { TestSuiteService } from './test-suite.service';

import { TestCase } from './test-case';
import { TestSuite } from './test-suite';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-test-management',
  templateUrl: './test-management.component.html',
  styleUrls: ['./test-management.component.css'],
  animations: [pageTransition]
})
export class TestManagementComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';

  public selectedTestCases = [];
  public selectedTestSuite = '';
  public testCases: TestCase[] = [];
  testSuitesViewModel = [];
  testSuites: TestSuite[] = [];

  constructor(
    private testCaseService: TestCaseService,
    private testSuiteService: TestSuiteService,
    protected translateService: TranslateService
  ) { }

  ngOnInit() {
    this.getTestSuites();
  }

  openTestSuite(testSuiteId: string, name: string) {
    // TODO event emitter with suite id
    this.selectedTestSuite = name;
    this.getTestCasesForTestSuite(testSuiteId);

  }

  getTestCasesForTestSuite(id: string) {
    this.testCaseService.getTestCasesBySuiteId(id).subscribe(
      data => this.testCases = data,
      error => console.log(error)); // this.notificationsService.error(error.status, error.error));
  }

  getTestSuites() {
    this.testSuiteService.getTestSuites().subscribe(
      testsuites => {
        this.testSuites = testsuites;
        if (this.testSuites.length > 0) {
          this.fromFlatToTree();
        }
      },
      error => console.log(error)
    );
  }

  fromFlatToTree() {
    // build tree with childs from flat list
    const idToNodeMap = {};
    let rootNodes = 0;
    const root = [];
    let parentNode;

    for (let i = 0; i < this.testSuites.length; i++) {

      const node = this.testSuites[i];
      node['children'] = [];
      // View Model
      node['icon'] = 'folder';
      node['active'] = false;
      node['expanded'] = false;

      idToNodeMap[node._id] = node;

      if (node.parentId === 'root') {
        node['expanded'] = true;
        root[rootNodes] = node;
        rootNodes++;
      } else {
        parentNode = idToNodeMap[node.parentId];
        parentNode.children.push(node);
      }
    }

    this.testSuitesViewModel = [...root];
    // console.log(JSON.stringify(this.testSuites));
  }

  fromTreeToFlat() {
    // TODO
  }

  onAdd() {

  }

  onEdit() {

  }

  onDelete() {
    // TODO are you sure? via modal
    this.selectedTestCases.forEach(selectedTestCase => {
      // TODO delete via service
      this.testCases = this.testCases.filter(testCases => testCases !== selectedTestCase);
      // TODO Notification => successfully deleted
    });
  }

}
