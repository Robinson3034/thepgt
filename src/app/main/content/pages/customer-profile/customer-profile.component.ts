import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';
// import { FormArray } from '@angular/forms';
import { CustomerProfile, PrimaryContact, BillContact, PrimaryInstruction, Notifications } from './customer-profile.model';
import { MessageService } from 'primeng/api';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService]
})
export class CustomerProfileComponent implements OnInit {
  customerProfileForm: FormGroup;
  primaryAndBillingContactForm: FormGroup;
  primaryInstructionForm: FormGroup;
  notificationListForm: FormGroup;
  argCustomerProfile: CustomerProfile;


  PrimaryContactsName = [];
  BillingContactsName = [];
  selectedContactInfo;
  selectedBillingContacts;
  selectedprimaryInstructions;
  selectednotificationLists;




  masterData: any; metaData: any;
  cols; colsPrimaryandBilling; colsPrimaryInstruction; colsNotification; colsBilling; colsImage; colsImageUpload;


  public isPrimaryContactVisible: boolean;
  public isPrimryInstVisible: boolean;
  public isNotificationVisible: boolean;
  indexval;
  constructor(private fb: FormBuilder, private http: HttpClient, private messageService: MessageService) {
    // mobile : number; //when we select customertype as individual
    this.masterData = {};
    this.metaData = {};
    this.getMasterJSON();
    this.getMetaData();
    this.customerProfileForm = this.initCustomerProfileForm();
    this.colsPrimaryandBilling = [
      { field: 'name', header: 'Name' },
      { field: 'dept', header: 'Dept' },
      { field: 'phone', header: 'Phone' },
      { field: 'ext', header: 'Ext' },
      { field: 'fax', header: 'Fax' },
      { field: 'mobile', header: 'Mobile' },
      { field: 'email', header: 'Email' }
    ];
    this.colsPrimaryInstruction = [
      { field: 'typeCode', header: 'TypeCode' },
      { field: 'typeDesc', header: 'TypeDesc' },
      { field: 'comment', header: 'Comments' },
    ];

    this.colsNotification = [
      { field: 'notifyTypeName', header: 'Notify Type Name' },
      { field: 'template', header: 'Template' },
      { field: 'method', header: 'Method' },
      { field: 'primaryContact', header: 'Primary Contact' },
      { field: 'billContact', header: 'Bill Contact' }
    ];

    this.colsBilling = [
      { field: 'fedexAccount', header: 'FEDEX A/C' },
      { field: 'comments', header: 'COMMENTS' },
      { field: 'creditStatus', header: 'Credit Status' },
      { field: 'paymentType', header: 'Payment Type' },
      { field: 'bankRecFlag', header: 'Bank Rec Flag' },
      { field: 'defaultBilling', header: 'Default Billing' }
    ];

    // this.colsImage = [
    //   { field: 'no', header: 'No' },
    //   { field: 'source', header: 'Source' },
    //   { field: 'docType', header: 'Doc Type' },
    //   { field: 'status', header: 'Status' },
    //   { field: 'annotation', header: 'Annotation' },
    //   { field: 'created', header: 'Created' },
    //   { field: 'contactValid', header: 'Contact valid' },
    //   { field: 'customsValid', header: 'Customs Valid' },
    //   { field: 'action', header: 'Action' },
    //   { field: 'expiry', header: 'Expiry' }
    // ];

    this.primaryAndBillingContactForm = this.fb.group({
      name: [''],
      dept: [''],
      phone: [''],
      ext: [''],
      fax: [''],
      mobile: [''],
      email: ['']
    });
    this.primaryInstructionForm = this.fb.group({
      typeCode: [''],
      typeDesc: [''],
      comment: ['']
    });

    this.notificationListForm = this.fb.group({
      notifyTypeName: [''],
      template: [''],
      method: [''],
      primaryContact: [''],
      billContact: [''],
    });




    // this.argCustomerProfile = this.customerProfileForm.getRawValue();
  }

  ngOnInit() {
  }
  copyFormControl(control) {
    if (control instanceof FormControl) {
      return new FormControl(control.value);
    } else if (control instanceof FormGroup) {
      const copy = new FormGroup({});
      Object.keys(control.getRawValue()).forEach(key => {
        copy.addControl(key, this.copyFormControl(control.controls[key]));
      });
      return copy;
    } else if (control instanceof FormArray) {
      const copy = new FormArray([]);
      control.controls.forEach(controls => {
        copy.push(this.copyFormControl(controls));
      });
      return copy;
    }
  }
  getMasterJSON() {
    const url = './src/assets/utility/masterdata.json';
    this.http.get(url).subscribe(result => {
      this.masterData = result;
    }, error => console.error(error));
  }
  getMetaData() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
      })
    };
    // const url = 'https://accs-ui.app.wtcdev2.paas.fedex.com/accs/ui/metadata/1';
    const url = './src/assets/utility/metadata.json';
    this.http.get(url).subscribe((result: any) => {
      if (result) {
        const objmetadata = {};
        for (const key in result.fieldsData) {
          if (result.fieldsData.hasOwnProperty(key)) {
            objmetadata[result.fieldsData[key]['fieldName'] + '_' + result.fieldsData[key]['fieldId']] = result.fieldsData[key];
          }
        }
        this.metaData = objmetadata;
        // this.getMasterJSON();
        this.customerProfileForm = this.configCustomerProfileForm();
      }
      // this.masterData = result;
    }, error => console.error(error));
  }
  requireFields(field) {
    if (this.metaData && this.metaData[field]) {
      if (this.metaData[field]['isMandatory']) {
        return [Validators.required];
      } else {
        return [];
      }
    } else {
      return [];
    }
  }
  disableFields(field) {
    if (this.metaData && this.metaData[field]) {
      if (this.metaData[field]['isEnable']) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }
  setDefaultFormValue(field) {
    if (this.metaData && this.metaData[field]) {
      if (this.metaData[field]['defaultValue']) {
        return this.metaData[field]['defaultValue'];
      } else {
        return '';
      }
    } else {
      return '';
    }
  }
  initCustomerProfileForm() {
    // { value: '', disabled: true }
    return this.fb.group({
      role: [''],
      customerType: [''],
      primaryDetails: this.fb.group({
        name: [''],
        address: [''],
        city: [''],
        state: [''],
        country: [''],
        zip: [''],
        mobile: [''],
        phone: [''],
        fax: [''],
        email: [''],
        url: [''],
        fedexAccount: [''],
        creditStat: [''],
        // Country Specific
        // Country Specific fields(Aus)
      }),
      countrySpecific: this.fb.group({
        ccid: [''],
        abn: [''],
        cac: [''],
        bsb: ['']
      }),
      // this.formBuilder.array([ this.createItem() ])
      primaryContactList: this.fb.array([]),
      billContactList: this.fb.array([]),
      primaryInstructionList: this.fb.array([]),
      freetextinstruction: [''],
      notificationList: this.fb.array([]),
      billingList: this.fb.array([]),
      imageList: this.fb.array([])
    });

  }
  configCustomerProfileForm() {
    // { value: '', disabled: true }
    return this.fb.group({
      role: [''],
      customerType: [''],
      // name_1 address_2 city_3 state_4 country_5 zip_6 mobile_7 phone_8 fax_9 email_10 url_11 fedexAccount_12 creditStat_13
      primaryDetails: this.fb.group({
        name: [{ value: this.setDefaultFormValue('name_1'), disabled: this.disableFields('name_1') }, this.requireFields('name_1')],
        address: [{ value: this.setDefaultFormValue('address_2'), disabled: this.disableFields('address_2') },
        this.requireFields('address_2')],
        city: [{ value: this.setDefaultFormValue('city_3'), disabled: this.disableFields('city_3') }, this.requireFields('city_3')],
        state: [{ value: this.setDefaultFormValue('state_4'), disabled: this.disableFields('state_4') }, this.requireFields('state_4')],
        country: [{ value: this.setDefaultFormValue('country_5'), disabled: this.disableFields('country_5') },
        this.requireFields('country_5')],
        zip: [{ value: this.setDefaultFormValue('zip_6'), disabled: this.disableFields('zip_6') }, this.requireFields('zip_6')],
        mobile: [{ value: this.setDefaultFormValue('mobile_7'), disabled: this.disableFields('mobile_7') }, this.requireFields('mobile_7')],
        phone: [{ value: this.setDefaultFormValue('phone_8'), disabled: this.disableFields('phone_8') }, this.requireFields('phone_8')],
        fax: [{ value: this.setDefaultFormValue('fax_9'), disabled: this.disableFields('fax_9') }, this.requireFields('fax_9')],
        email: [{ value: this.setDefaultFormValue('email_10'), disabled: this.disableFields('email_10') }, this.requireFields('email_10')],
        url: [{ value: this.setDefaultFormValue('url_11'), disabled: this.disableFields('url_11') }, this.requireFields('url_11')],
        fedexAccount: [{ value: this.setDefaultFormValue('fedexAccount_12'), disabled: this.disableFields('fedexAccount_12') },
        this.requireFields('fedexAccount_12')],
        creditStat: [{ value: this.setDefaultFormValue('creditStat_13'), disabled: this.disableFields('creditStat_13') },
        this.requireFields('creditStat_13')],
        // Country Specific
        // Country Specific fields(Aus)
      }),
      countrySpecific: this.fb.group({
        ccid: [''],
        abn: [''],
        cac: [''],
        bsb: ['']
      }),
      // this.formBuilder.array([ this.createItem() ])
      primaryContactList: this.fb.array([]),
      billContactList: this.fb.array([]),
      primaryInstructionList: this.fb.array([]),
      freetextinstruction: [''],
      notificationList: this.fb.array([]),
      billingList: this.fb.array([]),
      imageList: this.fb.array([])
    });

  }
  createCustomerProfile() {
    const arg = this.customerProfileForm.getRawValue();
    // console.log(arg);

    const constobj = {
      requestData: arg,
      requestInfo: {
        actionId: '',
        stepId: 0
      }
    };

    this.http.post('https://accs-cp.app.wtcdev2.paas.fedex.com/accs/cp/data', constobj).subscribe(result => {
      this.masterData = result;
      if (result) {
        // this.showSuccessMsg();
      }
      console.log(result);
    }, error => console.error(error));
  }
  showSuccessMsg() {
    this.messageService.add({ key: 'tc', severity: 'success', summary: 'Success Message', detail: 'Customer profile has created' });
  }
  resetCustomerProfile() {
    // this.showTopCenter();
    this.customerProfileForm = this.configCustomerProfileForm();

  }
  cancelCustomerProfile() {
    this.customerProfileForm = this.configCustomerProfileForm();
  }
  showModal(id) {
    switch (id) {
      case 1: // Primary Contact
        this.primaryAndBillingContactForm.reset();
        this.isPrimaryContactVisible = true;
        break;
      // case 2: // Billing Contact
      //   break;
      case 3: // Instruction
        this.primaryInstructionForm.reset();
        this.isPrimryInstVisible = true;
        break;
      case 4: // Notification
        this.notificationListForm.reset();
        this.isNotificationVisible = true;
        break;

    }
  }

  onRowSelect(event) {
    // console.log(event.data);
    // this.selectedContactInfo.push(event.data.name);
  }
  onRowUnselect(event) {
    // this.selectedContactInfo.push(event.data.name);
  }
  addtoList(id) {
    switch (id) {
      case 1: // Primary Contact
        {
          console.log(this.indexval);
          if (!this.indexval) {
            const objprimaryAndBilling = this.copyFormControl(this.primaryAndBillingContactForm);
            (this.customerProfileForm.get('primaryContactList') as FormArray).push(objprimaryAndBilling);
            this.PrimaryContactsName = this.customerProfileForm.get('primaryContactList').value.map(d => d.name);
            console.log(this.PrimaryContactsName);
          } else {
            const objprimaryAndBilling = this.copyFormControl(this.primaryAndBillingContactForm);
            (this.customerProfileForm.get('billContactList') as FormArray).push(objprimaryAndBilling);
            this.BillingContactsName = this.customerProfileForm.get('billContactList').value.map(d => d.name);
          }
          this.primaryAndBillingContactForm.reset();
          this.isPrimaryContactVisible = false;
        }
        break;
      // case 2: // Billing Contact
      //   // const obj = this.copyFormControl(this.primaryAndBillingContactForm);
      //   // (this.customerProfileForm.get('primaryContactList') as FormArray).push(obj);
      //   // this.primaryAndBillingContactForm.reset();
      //   // this.isPrimaryContactVisible = false;
      //   break;
      case 3: // Instruction
        const objprimaryInstruction = this.copyFormControl(this.primaryInstructionForm);
        (this.customerProfileForm.get('primaryInstructionList') as FormArray).push(objprimaryInstruction);
        this.primaryInstructionForm.reset();
        this.isPrimryInstVisible = false;
        break;
      case 4: // Notification
        const obj = this.copyFormControl(this.notificationListForm);
        (this.customerProfileForm.get('notificationList') as FormArray).push(obj);
        this.notificationListForm.reset();
        this.isNotificationVisible = false;
        break;
      case 5:
        break;
    }
  }
  removeFromList(id) {
    console.log(this.selectedContactInfo);
    switch (id) {
      case 1: // Primary Contact
        {
          // const val = this.customerProfileForm.get('primaryContactList').value;
          if (!this.indexval) {
            for (const key in this.selectedContactInfo) {
              if (this.selectedContactInfo.hasOwnProperty(key)) {
                // this.customerProfileForm.get('primaryContactList').value.splice(idx, 1);
                const idx = this.customerProfileForm.get('primaryContactList').value.indexOf(this.selectedContactInfo[key]);
                (this.customerProfileForm.get('primaryContactList') as FormArray).removeAt(idx);
              }
            }
          } else {
            for (const key in this.selectedBillingContacts) {
              if (this.selectedBillingContacts.hasOwnProperty(key)) {
                // this.customerProfileForm.get('billContactList').value.splice(idx, 1);
                const idx = this.customerProfileForm.get('billContactList').value.indexOf(this.selectedBillingContacts[key]);
                (this.customerProfileForm.get('billContactList') as FormArray).removeAt(idx);
              }
            }
          }
        }
        break;
      case 3: // Instruction
        for (const key in this.selectedprimaryInstructions) {
          if (this.selectedprimaryInstructions.hasOwnProperty(key)) {
            const idx = this.customerProfileForm.get('primaryInstructionList').value.indexOf(this.selectedprimaryInstructions[key]);
            // this.customerProfileForm.get('primaryInstructionList').value.splice(idx, 1);
            (this.customerProfileForm.get('primaryInstructionList') as FormArray).removeAt(idx);
          }
        }
        break;
      case 4: // Notification
        for (const key in this.selectednotificationLists) {
          if (this.selectednotificationLists.hasOwnProperty(key)) {
            const idx = this.customerProfileForm.get('notificationList').value.indexOf(this.selectednotificationLists[key]);
            (this.customerProfileForm.get('notificationList') as FormArray).removeAt(idx);
          }
        }
        break;
    }
  }
  changedropdown(id) {
    // alert('hi');
    switch (id) {
      case 1:
        const val = this.masterData.instruction.filter(d => d.typeCode === this.primaryInstructionForm.get('typeCode').value);
        if (val && val.length > 0) {
          this.primaryInstructionForm.get('typeDesc').setValue(val[0].typeDescription);
        }
        break;
      case 2:
        this.masterData['template'] = [];
        this.notificationListForm.get('template').setValue('');
        const val_temp = this.masterData.notification.filter(d =>
          d.notifyTypeName === this.notificationListForm.get('notifyTypeName').value);
        if (val_temp && val_temp.length > 0) {
          this.masterData.template = val_temp[0].template;
          // this.primaryInstructionForm.get('template').setValue(val_temp[0].template);
        }
        break;
    }
  }
}
