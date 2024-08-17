
import {
    serial,
    text,
    pgTable,
    boolean,
    date,
    integer,
  } from "drizzle-orm/pg-core";

  export const mySchemaUsers = pgTable("users", {
    id: serial("id").primaryKey(),
    password: text("password"),
    username: text("username"),
    remember: boolean("remember").default(false),
    isactive: boolean("isactive").default(true),
    isverified: boolean("isverified").default(false),
    createdat: date("createdat").default(new Date().toISOString()),
    updatedat: date("updatedat").default(new Date().toISOString()),
});

  
export const mySchemaCustomer = pgTable("customer", {
    id: serial("id").primaryKey(),
    name: text("name"),
    phoneNumber: text("phoneNumber"),
    userId: integer("user_id").references(() => mySchemaUsers.id),
    createdat: date("createdat").default(new Date().toISOString()),
    updatedat: date("updatedat").default(new Date().toISOString()),
});


export const mySchemaMeasurements = pgTable("measurements", {
    id: serial("id").primaryKey(),
    customerId: integer("customer_id").references(() => mySchemaCustomer.id),
    ShirtLength: integer("ShirtLength"),
    Sleeve: integer("Sleeve"),
    Thigh: integer("Thigh"),
    Chest: integer("Chest"),
    Hem: integer("Hem"),
    Collar: integer("Collar"),
    TrouserLength: integer("TrouserLength"),
    PantLeg: integer("PantLeg"),
    Shoulder: integer("Shoulder"),
    AdditionalNotes: text("AdditionalNotes"),

});




export const mySchemaOrder = pgTable("order", {
    id: serial("id").primaryKey(),
    customerId: integer("customer_id").references(() => mySchemaCustomer.id),
    payment: integer("payment"),
    userId: integer("user_id").references(() => mySchemaUsers.id),
    quantity: integer("quantity"),
    delivedDate: date("delivedDate"),
    createdat: date("createdat").default(new Date().toISOString()),
    updatedat: date("updatedat").default(new Date().toISOString()),
});
