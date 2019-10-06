import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.css']
})
export class ImageUploaderComponent implements OnInit, AfterViewInit {
  submitted = false;

  @Input()
  imageDefaultUrl: string = null;

  @Output() onChangeImage: EventEmitter<any> = new EventEmitter();

  constructor(
    public fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {}

  /*##################### Registration Form #####################*/
  registrationForm = this.fb.group({
    file: [null]
  })

  /*########################## File Upload ########################*/
  @ViewChild('fileInput', {static: false}) el: ElementRef;
  imageUrl: any = '../../../../assets/image/common/no-image.png';
  editFile: boolean = true;
  removeUpload: boolean = false;

  uploadFile(event) {
    console.log("uploadFile");
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.registrationForm.patchValue({
          file: reader.result
        });
        this.editFile = false;
        this.removeUpload = true;
        this.onChangeImage.emit(this.registrationForm.controls['file'].value);
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
  }

  // Function to remove uploaded file
  removeUploadedFile() {
    let newFileList = Array.from(this.el.nativeElement.files);
    this.imageUrl = this.imageDefaultUrl;
    // this.imageUrl = '../../../../assets/image/common/no-image.png';
    this.editFile = true;
    this.removeUpload = false;
    this.registrationForm.patchValue({
      file: [null]
    });
    this.el.nativeElement.value = ''
  }

  // Submit Registration Form
  onSubmit() {
    console.log("onSubmit")
    this.submitted = true;
    if(!this.registrationForm.valid) {
      alert('Please fill all the required fields to create a super hero!')
      return false;
    } else {
      console.log(this.registrationForm.value)
    }
  }

  ngOnInit(): void {
    console.log(this.imageDefaultUrl);
    this.imageUrl = this.imageDefaultUrl;
  }

  ngAfterViewInit() {

  }
}
