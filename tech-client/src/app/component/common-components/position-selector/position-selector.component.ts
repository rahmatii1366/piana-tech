import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TitleValueDto} from "../../../api/web-console/models/title-value-dto";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {PositionEnum} from "../../../api/web-console/models/position-enum";
import {RootContainerService} from "../../../services/root-container/root-container.service";

@Component({
  selector: 'app-position-selector',
  templateUrl: './position-selector.component.html',
  styleUrls: ['./position-selector.component.css']
})
export class PositionSelectorComponent implements OnInit, AfterViewInit {
  submitted = false;

  @Input()
  positions: TitleValueDto[] = null;

  @Input()
  positionDefaultUrl: string = null;

  @Input()
  position: PositionEnum = null;

  @Output() onChangePosition: EventEmitter<any> = new EventEmitter();

  editPosition: boolean = true;
  positionForm: FormGroup = null;

  constructor(
    private fb: FormBuilder,
    private rootContainerService: RootContainerService,
    private cd: ChangeDetectorRef
  ) {}

  positionChange(v) {
    console.log(v.target.value);
    let value = this.positionForm.get('position').value;
    console.log(value);
    this.onChangePosition.emit(value);
    this.cd.markForCheck();
    // console.log(this.groupForm.get("ageLevel").value);
  }

  ngOnInit(): void {
    console.log(this.positionDefaultUrl);
    this.positionForm = this.fb.group({
      position: null
    });
    this.positionForm.patchValue({position: this.position});
    // this.position = this.imageDefaultUrl;
  }

  ngAfterViewInit() {
    this.rootContainerService.changeInComponents();
  }
}
