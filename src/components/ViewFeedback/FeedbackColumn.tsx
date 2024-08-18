"use client";
import { ColumnDef } from "@tanstack/react-table";
import { contactType, userFormType } from "@/lib/type";

type Props = {
};


export const feedbackColumns: ColumnDef<contactType>[] = [
    {
        accessorKey: "email",
        header: () => <div className="text-[#A2A1A8]/80">Email Address</div>,
        cell: ({ row }) => {
            return (
                <div>{row.getValue("email")}</div>
            )
        }
        
    },
    {
        accessorKey: "message",
        header: () => <div className=" text-[#A2A1A8]/80">Message</div>,
        cell: ({ row }) => {
            return (
                <div>{row.getValue("message")}</div>
            )
        }
    },
    {
        accessorKey: "name",
        header: () => <div className=" text-[#A2A1A8]/80">Name</div>,
        cell: ({ row }) => {
            return (
                <div>{row.getValue("name")}</div>
            )
        }
    },
    {
        accessorKey: "subject",
        header: () => <div className=" text-[#A2A1A8]/80">Subject</div>,
        cell: ({ row }) => {
            return (
                <div>{row.getValue("subject")}</div>
            )
        }
    },
];
export default function FeedbackColumns({ }: Props) {

    return <div>
        feedbackColumns
    </div>;
}

