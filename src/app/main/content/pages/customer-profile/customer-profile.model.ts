export class CustomerProfile {

    role: string; // DDM

    customerType: string; // DDM (Company main, Company division, Individual)

    primaryDetails: PrimaryDetails;

    /* Local language
    name : string; // textfield
    address : string; // textarea
    dept : string; // textfield
    */

    // 1.Contact

    primaryContactList: Array<PrimaryContact>; // List

    billContactList: Array<BillContact>; // list

    // 2.Instruction

    primaryInstructionList: Array<PrimaryInstruction>;
    // list

    freetextinstruction: string; // textarea

    // 3.Notification

    notificationList: Array<Notification>; // list
    // 4.Billing
    billingList: Array<AddBilling>; // list

    // addBilling: Array<AddBilling>; // popup
    // 5.Image
    imageList: Array<Image>; // list

    // imageUpload: Array<ImageUpload>; // upload image popup
}
/*********************************************************************** */
class PrimaryDetails {
    // primary details

    name: string; // textfield

    address: string; // textarea

    city: string; // textfield

    state: string; // textfield

    country: string; // textfield

    zip: number; // textfield

    // mobile : number; //when we select customertype as individual

    phone: number; // textfield

    fax: string; // textfield

    email: string; // textfield

    url: string; // textfield

    countrySpecific: CountrySpecific;

}

// Primay contact class
export class PrimaryContact {

    name: string; // textfield

    dept: string; // textfield

    phone: number; // textfield

    ext: string; // textfield

    fax: string; // textfield

    mobile: number; // textfield

    email: string; // textfield

    fedexAccount: number; // textfield

    creditStat: string; // textfield
}
// Country Specifics
class CountrySpecific {

    // Country Specific fields(Aus)
    ccid: number; // textfield

    abn: number; // textfield

    cac: number; // textfield

    bsb: number; // textfield
}

// Bill contact class

export class BillContact {

    name: string; // textfield

    dept: string; // textfield

    phone: number; // textfield

    ext: string; // textfield

    fax: string; // textfield

    mobile: number; // textfield

    email: string; // textfield
}

// primary instruction class
export class PrimaryInstruction {

    typeCode: string; // DDM

    typeDesc: string; // textfield

    comment: string; // textarea
}

// notification class

export class Notifications {

    notifyTypeName: string; // DDM

    template: string; // DDM

    method: string; // DDM

    primaryContact: string; // DDM

    billContact: string; // DDM

}
// Billing class
class Billing {

    fedexAccount: number; // textfield

    comments: string; // textarea

    creditStatus: string; // textfield

    paymentType: string; // textfield

    bankRecFlag: string; // textfield

    defaultBilling: string; // textfield
}

// addbilling class

class AddBilling {
    // account info

    fedexAcccount: number; // textfield
    // bsb : number;//textfield
    paymentType: string; // DDM

    bankAccount: number; // textfield

    creditLimit: number; // textfield

    deferGST: string; // checkbox

    nonRevenue: string; // checkbox

    blankRecFlag: string; // checkbox

    defaultBilling: string; // checkbox
    // name & address
    name: string; // textfield

    address: string; // textfield

    city: string; // textfield

    state: string; // textfield

    country: string; // DDM

    postal: number; // textfield

    attention: string; // textfield

    phone: number; // textfield

    department: string; // textfield
    // credit status (radio buttons)

    // 1.fedexBlackList //radionutton

    // 2.fedexWhiteList //radiobutton

    // 3.fedexDefaultList //radiobutton

    // comments
    comments: string; // textarea
}

// image class
class Image {

    no: number; // textfield

    source: string; // textfield

    docType: string; // textfield

    status: string; // textfield

    annotation: string; // textfield

    created: string; // textfield

    contactValid: string; // textfield

    customsValid: string; // textfield

    action: string; // textfield

    expiry: string; // textfield

}

// upload image(popup)

class ImageUpload {

    location: string; // DDM

    documentType: string; // DDM

    expiryDate: string; // calendar

    // please specify a file : textfield
}



    // const reqdata = {
    //   requestData: {
    //     billContactList: [
    //       {
    //         dept: '',
    //         email: '',
    //         ext: '',
    //         fax: '',
    //         mobile: '',
    //         name: '',
    //         partyContactRecId: 0,
    //         phone: ''
    //       }
    //     ],
    //     billingList: [
    //       {
    //         bankRecFlag: '',
    //         comments: '',
    //         creditStatus: '',
    //         defaultBilling: '',
    //         fedexAccount: '',
    //         paymentType: ''
    //       }
    //     ],
    //     countrySepecificDetails: {
    //       abn: '',
    //       addressLocal: '',
    //       bsb: '',
    //       cac: '',
    //       ccid: '',
    //       deptLocal: '',
    //       nameLocal: ''
    //     },
    //     customerType: '',
    //     freetextinstruction: '',
    //     groupCode: '',
    //     imageList: [
    //       {
    //         action: '',
    //         annotation: '',
    //         contactValid: '',
    //         created: '',
    //         customsValid: '',
    //         docType: '',
    //         expiry: '',
    //         no: '',
    //         source: '',
    //         status: ''
    //       }
    //     ],
    //     notificationList: [
    //       {
    //         billContact: '',
    //         method: '',
    //         notificationRecId: 0,
    //         notifyTypeName: '',
    //         primaryContact: '',
    //         template: ''
    //       }
    //     ],
    //     partyId: '',
    //     partyRecId: 0,
    //     primaryContactList: [
    //       {
    //         dept: '',
    //         email: '',
    //         ext: '',
    //         fax: '',
    //         mobile: '',
    //         name: '',
    //         partyContactRecId: 0,
    //         phone: ''
    //       }
    //     ],
    //     primaryDetails: {
    //       address: '',
    //       addressType: '',
    //       city: '',
    //       country: '',
    //       creditStat: '',
    //       email: '',
    //       fax: '',
    //       fedexAccount: '',
    //       mobile: '',
    //       name: '',
    //       phone: '',
    //       state: '',
    //       url: '',
    //       zip: ''
    //     },
    //     primaryInstructionList: [
    //       {
    //         comment: '',
    //         instructionRecId: 0,
    //         typeCode: '',
    //         typeDesc: ''
    //       }
    //     ],
    //     role: ''
    //   },
    //   requestInfo: {
    //     actionId: '',
    //     stepId: 0
    //   }
    // };
