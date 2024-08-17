import React from "react";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { UseFormReturn } from "react-hook-form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { contactType } from "@/lib/type";


type Props = {
    placeholder: string;

    type: string;
    name: "name" | "email" | "subject" | "message";
    form: UseFormReturn<contactType>;
    istextarea?: boolean;
};

export default function Contactinput({
    istextarea = false,
    placeholder,
    type,
    name,
    form,
}: Props) {
    return (
        <div>
            <FormField
                control={form.control}
                name={name}
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            {istextarea ? (
                                <div className="flex flex-col items-center">
                                    <Textarea
                                        {...field}
                                        placeholder={placeholder}
                                        className="rounded-none h-32 my-5 border-[1px] border-[grey]"
                                    />
                                </div>
                            ) : (
                                <Input
                                    {...field}
                                    placeholder={placeholder}
                                    type={type}
                                    className="rounded-none h-12 my-3 border-[1px] border-[grey]"
                                />
                            )}
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            ></FormField>
        </div>
    );
}