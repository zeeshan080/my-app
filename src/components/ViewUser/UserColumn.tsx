"use client";
import { ColumnDef } from "@tanstack/react-table";
import { userFormType } from "@/lib/type";

type Props = {
};


export const userColumns: ColumnDef<userFormType>[] = [
    {
        accessorKey: "username",
        header: () => <div className="text-[#A2A1A8]/80">User Name</div>,
        cell: ({ row }) => {
            return (
                <div>{row.getValue("username")}</div>
            )
        }
        
    },
    {
        accessorKey: "password",
        header: () => <div className=" text-[#A2A1A8]/80">Password</div>,
        cell: ({ row }) => {
            return (
                <div>{row.getValue("password")}</div>
            )
        }
    },
];
export default function UserColumns({ }: Props) {

    return <div>
        userColumns
    </div>;
}

