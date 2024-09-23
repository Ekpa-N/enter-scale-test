"use client"
import { TaskCardProps } from "@/constants/sharedTypes"
import { CiEdit } from "react-icons/ci"
import { RiDeleteBinLine } from "react-icons/ri"
import { priorityColours } from "@/constants/TestData"


type TaskProps = {
    task: TaskCardProps;
    operation: ()=>void;
    deleteTask: (listId: number, label: string, taskId: string)=>void;
    listId: number| string;
    listLabel: string;
}

export default function TaskCard({ task, operation, deleteTask, listId, listLabel }: TaskProps) {
    const {title, desc, date, owner, priority = "low", label, tag, id} = task
    return (
        <div className="flex w-full w-[350px] relative rounded-[10px] gap-[10px] p-[3px] flex-col">
            <h2 style={{backgroundColor: `${priorityColours[priority?.toLocaleLowerCase()]}`}} className="border rounded-t-lg h-[30px] flex px-[5px] items-center border-[blue]">{priority}</h2>
            <div className="flex flex-col gap-[5px] px-[5px] border border-[blue]">
                <h2 className="">Title: {title}</h2>
                <h2 className="">Description: {desc}</h2>
                <h2 className="">Assignee: {owner}</h2>
                <h2 className="">Due: {date}</h2>
                <div className="flex borde border-black justify-between items-center">
                    <div className="flex gap-[5px]">
                        <h2 className="border px-[2px]">{label}</h2>
                        <h2 className="border px-[2px]">{tag}</h2>
                    </div>
                    <div className="flex gap-[5px] relative">
                        <button onClick={()=>{operation()}} className="relative flex borde w-[20px] h-[20px]">
                            <CiEdit className="w-[20px] h-[20px]" />
                        </button>
                        <button onClick={() => { deleteTask(listId as number, listLabel, id as string) }} className="relative w-[20px] h-[20px] flex borde">
                            <RiDeleteBinLine className="w-[20px] h-[20px]" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}