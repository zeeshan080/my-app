import { orderFormType } from "@/lib/type";
import { ColumnDef } from "@tanstack/react-table";

type Props = {};

export const orderColumn: ColumnDef<orderFormType>[] = [
    
    {
        accessorKey: "name",
        header: () => <div className="text-[#A2A1A8]/80">Customer Name</div>,
        cell: ({ row }) => {
            return (
                <div>{row.getValue("name")}</div> // Use `row.original` to access the data
            )
        }
    },
{
        accessorKey: "payment",
        header: () => <div className=" text-[#A2A1A8]/80">Payment</div>,
        cell: ({ row }) => {
            return (
                <div>{row.getValue("payment")}</div> // Use `row.original` to access the data
            )
        }
    },
    {
        accessorKey: "quantity",
        header: () => <div className=" text-[#A2A1A8]/80">Quantity</div>,
        cell: ({ row }) => {
            return (
                <div>{row.getValue("quantity")}</div> // Use `row.original` to access the data
            )
        }
    },
    {
        accessorKey: "delivedDate",
        header: () => <div className=" text-[#A2A1A8]/80">delivering Date</div>,
        cell: ({ row }) => {
            return (
                <div>{row.getValue("delivedDate")}</div> // Use `row.original` to access the data
            )
        }
    },
];
export default function OrderColumn({ }: Props) {

    return <div>
        orderColumn
    </div>;
}

