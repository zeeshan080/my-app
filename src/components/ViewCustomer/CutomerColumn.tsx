"use client";
import { ColumnDef } from "@tanstack/react-table";
import {  Eye, PencilLine, Trash2 } from "lucide-react";
import { CustomerFormType } from "@/lib/type";

type Props = {
};


export const customerColumns: ColumnDef<CustomerFormType>[] = [
    {
        accessorKey: "codeId",
        header: () => <div className="text-[#A2A1A8]/80">Code Id</div>,
        cell: ({ row }) => {
            return (
                <div>{row.getValue("codeId")}</div>
            )
        }
        
    },
    {
        accessorKey: "name",
        header: () => <div className="text-[#A2A1A8]/80">Customer Name(نام)</div>,
        cell: ({ row }) => {
            return (
                <div>{row.getValue("name")}</div>
            )
        }
        
    },
    {
        accessorKey: "phoneNumber",
        header: () => <div className=" text-[#A2A1A8]/80">Phone Number(فون نمبر)</div>,
        cell: ({ row }) => {
            return (
                <div>{row.getValue("phoneNumber")}</div>
            )
        }
    },
    {
        accessorKey: "ShirtLength",
        header: () => <div className=" text-[#A2A1A8]/80">Shirt Length(قمیض کی لمبائی)</div>,
        cell: ({ row }) => {
            return (
                <div>{row.getValue("ShirtLength")}</div>
            )
        }
    },
    {
        accessorKey: "Sleeve",
        header: () => <div className=" text-[#A2A1A8]/80">Sleeve(آستین)</div>,
        cell: ({ row }) => {
            return (
                <div>{row.getValue("Sleeve")}</div>
            )
        }
    },

    {
        accessorKey: "Thigh",
        header: () => <div className=" text-[#A2A1A8]/80">Thigh(تیرا)</div>,
        cell: ({ row }) => {
            return (
                <div>{row.getValue("Thigh")}</div>
            )
        }
    },
    {
        accessorKey: "Chest",
        header: () => <div className=" text-[#A2A1A8]/80">Chest(چھاتی)</div>,
        cell: ({ row }) => {
            return (
                <div>{row.getValue("Chest")}</div>
            )
        }
    },
    

    
];
export default function CustomertColumns({ }: Props) {

    return <div>
        customerColumns
    </div>;
}

