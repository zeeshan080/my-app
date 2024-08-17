"use client";

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { ChevronDownIcon, Eye, PencilLine, PlusCircle, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import React from "react";
import Sidebaritems from "../Sidebaritems";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { orderFormType } from "@/lib/type";
import UpdateOrder from "../models/UpdateOrder";
type UpdateOrderProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    initialData: orderFormType & { id: string }; 
    onUpdate: (id: string, data: orderFormType) => void;
  };
interface OrderRowData extends orderFormType {
    id: string;
  } 


type Props<TData, TValue> = {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    onDelete: (customerId: string) => void; 
    onUpdate: (id: string, data: orderFormType) => void; // Add this line

};

export default function OrderDataTable<TData, TValue>({
    columns,
    data,
    onDelete,
    onUpdate
    
}: Props<TData, TValue>) {
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [viewData, setViewData] = useState<orderFormType & { id: string } | null>(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editData, setEditData] = useState<orderFormType & { id: string } | null>(null);
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([] )
    const [pagination, setPagination] = useState({
        pageIndex: 0, //initial page index
        pageSize: 10, //default page size
    });
    const [globalFilter, setGlobalFilter] = useState(''); 

    const table = useReactTable({
        data,
        columns,
        getFilteredRowModel: getFilteredRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        state: {
            sorting,
            columnFilters,
            pagination,
            globalFilter, 
        },
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter, 
    })
    const handleDelete = async (orderId: string) => {
        try {
            await onDelete(orderId);
            // Optionally, you can update the table data here if not using full page reload
        } catch (error) {
            console.error('Failed to delete customer:', error);
        }
    };
    const handleEdit = (id: string, orderData: orderFormType) => {
        setEditData({ id, ...orderData });
        setEditDialogOpen(true);
    };
      
      const handleUpdate = async (id: string, orderData: orderFormType) => {
        try {
          await onUpdate(id, orderData);
          setEditDialogOpen(false);
        } catch (error) {
          console.error('Failed to update data:', error);
        }
      };
      const handleView = (id: string, orderData: orderFormType) => {
        setViewData({ id, ...orderData });
        setViewDialogOpen(true);
    };
   

    return (
        <div className="rounded-md border mt-16 shadow-lg bg-transparent  backdrop-blur-lg ">
            <div className="w-full">
                <div className="flex flex-col gap-4 md:flex-row justify-between items-center  p-4">
                    <div className="relative">
                    <Input
                            placeholder="Search"
                            value={globalFilter ?? ''}
                            onChange={(event) => setGlobalFilter(event.target.value)}
                            className="max-w-sm px-7 ml-3"
                        />
                        <Search className="absolute top-2 bottom-0 ml-4" />
                    </div>
                    <div className="flex flex-col md:flex-row gap-5">
                        <div className="flex relative items-center">
                            <Sidebaritems
                                link={"/admin/order/create-order"}
                                className="bg-[#621940] text-[white] rounded-md text-[14px] py-3 px-7 ml-3"
                                text="Add New Order"
                                icons={<PlusCircle className="absolute top-2 lg:top-1/4 bottom-0  ml-4" color="white" size={20} />
                                }
                            />
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className=" m-0 md:ml-auto">
                                    Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {table
                                    .getAllColumns()
                                    .filter((column) => column.getCanHide())
                                    .map((column) => {
                                        return (
                                            <DropdownMenuCheckboxItem
                                                key={column.id}
                                                className="capitalize"
                                                checked={column.getIsVisible()}
                                                onCheckedChange={(value) =>
                                                    column.toggleVisibility(!!value)
                                                }
                                            >
                                                {column.id}
                                            </DropdownMenuCheckboxItem>
                                        )
                                    })}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                );
                            })}
                             <TableHead>
                                <h1 className="text-[#A2A1A8]/80 text-center">Action</h1>
                            </TableHead>
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                                  <TableCell>
                                   <div className="flex gap-2 items-end justify-end mr-3">
                                   <Eye size={20} onClick={() => {
                                            const { id, ...rest } = row.original as OrderRowData;
                                            handleView(id, rest);
                                        }} />
                                    <PencilLine
                                        size={20}
                                        onClick={() => {
                                            const { id, ...rest } = row.original as OrderRowData; 
                                            handleEdit(id, rest); 
                                        }}
                                        />
                                   <Trash2
                                    size={20}
                                    onClick={() => handleDelete((row.original as { id: string }).id)}
                                        />
                                     </div>
                                    </TableCell>
                                      {editData && (
                                            <UpdateOrder
                                            open={editDialogOpen}
                                            setOpen={setEditDialogOpen}
                                            initialData={editData}
                                            onUpdate={handleUpdate}
                                            mode="edit"
                                            />
                                        )}
                                          {viewData && (
                                            <UpdateOrder
                                                open={viewDialogOpen}
                                                setOpen={setViewDialogOpen}
                                                initialData={viewData}
                                                onUpdate={() => {}}
                                                mode="view"
                                            />
                                            )}
                                      
                            </TableRow>
                            
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <div className="flex flex-col gap-7 md:gap-0  md:flex-row items-center justify-between space-x-2 py-4 px-5">
                <div className="flex gap-4 md:gap-2 items-center">
                    <select
                        value={table.getState().pagination.pageSize}
                        onChange={e => {
                            table.setPageSize(Number(e.target.value))
                        }}
                        className="border-[1px] rounded-md p-1"
                    >
                        {[10, 20, 30, 40, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                    <div>{table.getPrePaginationRowModel().rows.length} Rows</div>
                </div>

                <div className="flex flex-col md:flex-row gap-2">
                    <span className="flex  items-center gap-1">
                        <div>Page</div>
                        <strong>
                            {table.getState().pagination.pageIndex + 1} of{' '}
                            {table.getPageCount()}
                        </strong>
                    </span>
                    <span className="flex gap-4  items-center  md:gap-1">
                        | Go to page:
                        <input
                            type="number"
                            defaultValue={table.getState().pagination.pageIndex + 1}
                            onChange={e => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0
                                table.setPageIndex(page)
                            }}
                            className="border-[1px] rounded-md p-1  w-16"
                        />
                    </span>
                </div>
                <div className="flex gap-6 md:gap-2">
                    <button
                        className="border rounded p-1"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {'<<'}
                    </button>
                    <button
                        className="border rounded p-1"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {'<'}
                    </button>
                    <button
                        className="border rounded p-1"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        {'>'}
                    </button>
                    <button
                        className="border rounded p-1"
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                    >
                        {'>>'}
                    </button>
                </div>
            </div>
        </div>

    );
}