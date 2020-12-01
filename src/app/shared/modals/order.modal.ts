export interface Order {
    orderId?: string,
    saberId: string,
    cost: number,
    saberName: string,
    saberColor: string,
    saberCrystal: string,
    contactDetails: ContactDetails,
    accepted: boolean,
    showDetail?: boolean
}

export interface ContactDetails {
    email: string,
    phoneNo: string,
    postalCode: string,
    street: string,
    city: string
}