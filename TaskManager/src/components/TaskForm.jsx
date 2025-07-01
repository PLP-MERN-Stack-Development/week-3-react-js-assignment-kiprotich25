import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
// //import {
//   Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription,
//   DialogFooter, DialogClose
// } from "@/components/ui/dialog";


export default function TaskForm({ onAdd }){
    const [task, setTask] = useState("")
    const  [description, setDescription] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!task.trim() || !description.trim()) return;

        onAdd({ task, description});
        setTask("");
        setDescription("");
        toast("Task created ✔️");
    };
    return(
        <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
            type="text"
            placeholder="Enter your task here"
            value={task}
            onChange={e => setTask(e.target.value)}/>
            <Input
            type="text"
            placeholder="Task description here"
            value={description}
            onChange={e => setDescription(e.target.value)}/>
            <Button type="submit">Save</Button>
        </form>
    )
}