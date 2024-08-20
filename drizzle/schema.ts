
import {
    serial,
    text,
    pgTable,
    boolean,
    date,
    integer,
    doublePrecision
  } from "drizzle-orm/pg-core";

  export const mySchemaUsers = pgTable("users", {
    id: serial("id").primaryKey(),
    username: text("username"),
    password: text("password"),
    isactive: boolean("isactive").default(true),
    isverified: boolean("isverified").default(false),
    createdat: date("createdat").default(new Date().toISOString()),
    updatedat: date("updatedat").default(new Date().toISOString()),
});

  
export const mySchemaCustomer = pgTable("customer", {
    id: serial("id").primaryKey(),
    codeId:text("codeId"),
    name: text("name"),
    phoneNumber: text("phoneNumber"),
    userId: integer("user_id").references(() => mySchemaUsers.id),
    createdat: date("createdat").default(new Date().toISOString()),
    updatedat: date("updatedat").default(new Date().toISOString()),
});


export const mySchemaMeasurements = pgTable("measurements", {
    id: serial("id").primaryKey(),
    customerId: integer("customer_id").references(() => mySchemaCustomer.id),
    ShirtLength: doublePrecision("ShirtLength"),
    Sleeve: doublePrecision("Sleeve"),
    Thigh: doublePrecision("Thigh"),
    Chest: doublePrecision("Chest"),
    HemLength: doublePrecision("HemLength"),
    HemType:text("HemType"),
    CollarLength: doublePrecision("CollarLength"),
    CollarType:text("CollarType"),
    TrouserLength: doublePrecision("TrouserLength"),
    PantLeg: doublePrecision("PantLeg"),
    Shoulder: doublePrecision("Shoulder"),
    PocketSide:doublePrecision("PocketSide"),
    PockectFront:doublePrecision("PockectFront"),
    PocketTrouser:doublePrecision("PocketTrouser"),
    AdditionalNotes: text("AdditionalNotes"),
});




export const mySchemaOrder = pgTable("orders", {
    id: serial("id").primaryKey(),
    customerId: integer("customer_id").references(() => mySchemaCustomer.id),
    payment: integer("payment"),
    userId: integer("user_id").references(() => mySchemaUsers.id),
    quantity: integer("quantity"),
    delivedDate: date("delivedDate"),
    createdat: date("createdat").default(new Date().toISOString()),
    updatedat: date("updatedat").default(new Date().toISOString()),
});

export const mySchemaContact = pgTable("contact", {
    id: serial("id").primaryKey(),
    message: text("message"),
    name: text("name"),
    email: text("email"),
    subject: text("subject"),
    createdat: date("createdat").default(new Date().toISOString()),
    updatedat: date("updatedat").default(new Date().toISOString()),
});