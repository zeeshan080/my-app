import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

type Props = { open: boolean; setopen: (open: boolean) => void };

export default function Forgotpassword({ open, setopen }: Props) {
    return (
        <div>
            <Dialog open={open} onOpenChange={setopen}>
                <DialogContent className="min-h-[250px] grid items-center justify-center">
                    <DialogHeader>
                        <DialogDescription className="text-center text-[18px]">
                            Please contact adminstranation Department for reset of your Account Password.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="">
                        <Button type="submit" onClick={() => setopen(false)} className="w-[50%] h-12 mr-32 bg-[#621940] hover:bg-[#621940]">OK</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div >
    );
}