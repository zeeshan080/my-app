import { z } from "zod"

export type bannerType = {
    id: number
    heading: string
    paragraph: string
    button: string
    image_url: string
}

export type Allproduct = {
    id: number,
    image_url: string
    Productname: string,
    catagory: string,
    symbol: string,
    price: number,
}
export type aboutUsType = {
    id: number,
    heading:string
    image_url: string,
    title:string,
    paragraph:string
}

export type aboutUsTextType = {
    id: number,
   heading:string,
   text:string
   paragraph:string
   image_url:string
   link:string
}

export type clientType = {
    id: number,
    image:string
    name:string,
    review:string
  
}

export type serviceType = {
    id: number,
    image:string
    heading:string
    paragraph:String
}

export type ContactUsType = {
    id: number,
    heading:string
    image_url: string,
    paragraph:string
}
export type CardType = {
    id: number
    heading:string
    value:number
    //update: string
}


export const LoginFormSchema = z.object({
    username: z.string(),
    password: z.string(),
    remember: z.boolean().default(false).optional(),
});

export type LoginFormType = z.infer<typeof LoginFormSchema>

export const contactSchema = z.object({
    message: z.string(),
    name: z.string(),
    email: z.string(),
    subject: z.string(),
});

export type contactType = z.infer<typeof contactSchema>;

export const orderSchema = z.object({
    customerId: z.string(),
    payment: z.string(),
    quantity: z.string(),
    delivedDate: z.string(),
});
export type orderFormType = z.infer<typeof orderSchema>


export const customerSchema = z.object({
    name: z.string(),
    phoneNumber:z.string(),
    ShirtLength:z.string(),
    Sleeve:z.string(),
    Thigh:z.string(),
    Chest:z.string(),
    Hem:z.string(),
    Collar: z.string(),
    TrouserLength: z.string(),
    PantLeg:z.string(),
    Shoulder:z.string(),
    AdditionalNotes:z.string()
});

export type CustomerFormType = z.infer<typeof customerSchema>;