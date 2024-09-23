"use client"
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Button, Typography } from "@mui/material";
import { BoardProps, TaskCardProps } from "@/constants/sharedTypes";
import LayoutContext from "./Provider";
import { testBoard, boards, team } from "@/constants/TestData";
import { v4 as uuidv4 } from 'uuid'

type LayoutProps = {
    children: React.ReactNode;
}

type NewTaskProps = {
    isNewTask: boolean;
    listId: number | string;
    label: string;
    task: TaskCardProps;
    [key: string]: boolean | TaskCardProps | number | string
}

const initialNewTaskForm: TaskCardProps = {
    title: "",
    desc: "",
    date: "",
    owner: "",
    priority: "LOW",
    label: "",
    tag: "",
    id: ""

}

export default function Layout({ children, }: Readonly<LayoutProps>) {
    const [loading, setLoading] = useState<boolean>(true)
    const [testData, setTestData] = useState<BoardProps[]>([])
    const [addBoard, setAddBoard] = useState<{ isView: boolean, name: string }>({
        isView: false,
        name: ""
    })
    const [taskPriority, setTaskPriority] = useState<string[]>(["LOW", "MEDIUM", "HIGH"])
    const [newTask, setNewTask] = useState<NewTaskProps>(
        {
            isNewTask: false,
            listId: "",
            label: "",
            task: initialNewTaskForm
        })
    const [viewTask, setViewTask] = useState<{ isView: boolean, task: TaskCardProps, listId: string | number, label: string, type: string }>({
        isView: false,
        listId: "",
        label: "",
        task: initialNewTaskForm,
        type: "view"
    })

    useEffect(() => {
        const existingData = localStorage.getItem("taskBoards")
        if (existingData) {
            setTestData(JSON.parse(existingData) as BoardProps[])
        }
        setLoading(false)
    }, [])

    useEffect(() => {
        if (testData.length > 0) {
            localStorage.setItem("taskBoards", JSON.stringify(testData));
        }
    }, [testData])

    function boardHandler(data: BoardProps, idx: number) {
        // debugger

        setTestData((currentData) => {
            const newData = [...currentData]
            newData[idx] = data
            // debugger
            return newData
        })
    }

    function handleNewBoardOpen() {
        setAddBoard({
            isView: true,
            name: ""
        })
    }
    function handleNewBoardClose() {
        setAddBoard({
            isView: false,
            name: ""
        })
    }

    function handleViewTaskOpen(task: TaskCardProps, id: number, label: string, type: string) {
        setViewTask({ ...viewTask, isView: true, task: task, listId: id, label: label, type: type })
    }
    function handleViewTaskClose() {
        setViewTask({ ...viewTask, isView: false, task: initialNewTaskForm })
    }

    function handleNewTaskModalOpen(id: number, label: string) {
        setNewTask({ ...newTask, isNewTask: true, listId: id, label: label, task: { ...newTask.task, id: uuidv4() } })
    }
    function handleNewTaskModalClose() {
        setNewTask({ ...newTask, isNewTask: false, listId: "", label: "", task: initialNewTaskForm })
    }

    function manageTask(e: React.MouseEvent<HTMLButtonElement>, operation: string) {
        e.preventDefault()
        const newData = [...testData]
        if (operation == "add") {
            newData[newTask.listId as number][newTask.label] = [...newData[newTask.listId as number][newTask.label] as Array<TaskCardProps>, newTask.task]
            setTestData(newData)
            handleNewTaskModalClose()
            return
        }
        if (operation == "update") {
            const updated = (newData[viewTask.listId as number][viewTask.label] as Array<TaskCardProps>).map((item: TaskCardProps, index: number) => {
                if (item.id == viewTask.task.id) {
                    item = viewTask.task
                }
                return item
            })
            newData[viewTask.listId as number][viewTask.label] = updated
            setTestData(newData)
            handleViewTaskClose()
            return
        }
    }

    function deleteTask(listId: number, label: string, taskId: string) {
        const newData = [...testData]
        // debugger
        const updated = (newData[listId][label] as Array<TaskCardProps>).filter((item: TaskCardProps, index: number) => {
            return item.id != taskId
        })
        newData[listId][label] = updated
        setTestData(newData)
        handleViewTaskClose()
        return
    }

    function onAddTaskFormChange(e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>, form: string) {
        e.preventDefault()
        if (form == "add") {
            setNewTask({ ...newTask, task: { ...newTask.task, [e.target.name]: e.target.value } })
            return
        }
        setViewTask({ ...viewTask, task: { ...viewTask.task, [e.target.name]: e.target.value } })
    }

    function onBoardFormChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault()
        setAddBoard({ ...addBoard, name: e.target.value })
    }

    function createBoard() {
        const newData = [...testData, { title: addBoard.name, pending: [], inProgress: [], done: [] }]
        setTestData(newData)
        setAddBoard({ ...addBoard, isView: false, name: "" })
    }


    return (
        <div className="w-full flex gap-[20px] bg-[#F4F5F9] flex-col p-[2px] h-[inherit] overflow-auto">
            <LayoutContext.Provider value={{ testData, boardHandler, handleNewTaskModalOpen, handleViewTaskOpen, deleteTask, loading }}>
                <div className="flex border items-center gap-[5px] w-fit rounded-[10px] border-black p-[3px]">
                    <button onClick={handleNewBoardOpen} className="flex gap-[5px] items-center">
                        Create Task Board
                        <IoIosAddCircleOutline className="relative " />
                    </button>
                </div>
                <div className="">
                    {children}
                </div>
                <Modal
                    open={addBoard.isView}//{bot.form}
                    onClose={handleNewBoardClose}
                    className="flex justify-center"
                >
                    <Box component="div" className="flex bg-[#F4F5F9] flex-col w-[95%] midL:w-[500px] mt-[50px] items-center p-[20px] h-fit ">
                        <Typography variant="h6" component="h2">
                            Create a Task Board
                        </Typography>
                        <Box component="form" className={`flex flex-col border border-[green] p-[5px] w-[300px]`}>
                            <input onChange={(e) => { onBoardFormChange(e) }} value={addBoard.name} name="name" className="outline-none pl-[5px] p-[3px] rounded-[5px]" placeholder="Enter Board Title" />
                            <div className="flex justify-end">
                                <div className="flex border mt-[20px] items-center gap-[5px] w-fit rounded-[10px] border-black p-[3px]">
                                    <button onClick={() => { createBoard() }} disabled={addBoard.name === ""}>Create Board</button>
                                </div>
                            </div>
                        </Box>
                    </Box>
                </Modal>

                <Modal
                    open={newTask.isNewTask}
                    onClose={handleNewTaskModalClose}
                    className="flex justify-center"
                >
                    <Box component="div" className="flex bg-[#F4F5F9] flex-col  w-[90%] midL:w-[500px] mt-[50px] items-center p-[20px] h-fit ">
                        <Typography variant="h6" component="h2">
                            Create Task
                        </Typography>
                        <Box component="form" className={`flex flex-col p-[5px] w-[300px]`}>
                            <div className={`w-full mt-[20px] flex-col gap-[5px] flex`}>
                                <input onChange={(e) => { onAddTaskFormChange(e, "add") }} name="title" className="outline-none pl-[5px] p-[3px] rounded-[5px]" placeholder="Task name" value={newTask.task.title} />
                                <input onChange={(e) => { onAddTaskFormChange(e, "add") }} name="desc" className="outline-none pl-[5px] p-[3px] rounded-[5px]" placeholder="Description" value={newTask.task.desc} />
                                <input onChange={(e) => { onAddTaskFormChange(e, "add") }} name="owner" className="outline-none pl-[5px] p-[3px] rounded-[5px]" placeholder="Assignee" value={newTask.task.owner} />
                                <div className="relative">
                                    <input onChange={(e) => { onAddTaskFormChange(e, "add") }} name="date" type="date" className="outline-none pl-[5px] z-10 p-[3px] w-full rounded-[5px]" value={newTask.task.date} />
                                    <input readOnly className="outline-none pl-[5px] z-[20] absolute left-0 p-[3px] rounded-[5px]" placeholder="Due Date" value={newTask.task.date} />
                                </div>
                                <select onChange={(e) => { onAddTaskFormChange(e, "add") }} name="priority" value={newTask.task.priority} className="outline-none">
                                    {taskPriority.map((priority) => {
                                        if (newTask.task.priority == priority) {
                                            return <option defaultValue={priority} value={priority}>{priority}</option>
                                        }
                                        return <option value={priority}>{priority}</option>
                                    })}
                                </select>
                                <input onChange={(e) => { onAddTaskFormChange(e, "add") }} name="label" className="outline-none pl-[5px] p-[3px] rounded-[5px]" placeholder="Label" value={newTask.task.label} />
                                <input onChange={(e) => { onAddTaskFormChange(e, "add") }} name="tag" className="outline-none pl-[5px] p-[3px] rounded-[5px]" placeholder="Tag" value={newTask.task.tag} />
                            </div>
                            <div className="flex justify-between">
                                <div className="flex border mt-[20px] items-center gap-[5px] w-fit rounded-[10px] border-black p-[3px]">
                                    <button disabled={newTask.task.title == "" || newTask.task.date == "" || newTask.task.owner == "" || newTask.task.desc == "" || false} onClick={(e) => { manageTask(e, "add") }} className="flex items-center gap-[5px]">
                                        Add Task
                                    </button>
                                </div>
                            </div>
                        </Box>
                    </Box>
                </Modal>

                <Modal
                    open={viewTask.isView}//{bot.form}
                    onClose={handleViewTaskClose}
                    className="flex justify-center"
                >
                    <Box component="div" className="flex  flex-col w-[95%] midL:w-[500px] mt-[50px] items-center p-[20px] h-fit ">
                        <Typography variant="h6" component="h2">
                            Update Task
                        </Typography>
                        <Box component="form" className={`${viewTask.type == "edit" ? "flex" : "hidden"} flex-col border border-[green] p-[5px] w-[300px]`}>
                            <div className={`w-full mt-[20px] flex-col gap-[5px] flex`}>
                                <input onChange={(e) => { onAddTaskFormChange(e, "update") }} name="title" className="outline-none pl-[5px] p-[3px] rounded-[5px]" placeholder="Task name" value={viewTask.task.title} />
                                <input onChange={(e) => { onAddTaskFormChange(e, "update") }} name="desc" className="outline-none pl-[5px] p-[3px] rounded-[5px]" placeholder="Description" value={viewTask.task.desc} />
                                <input onChange={(e) => { onAddTaskFormChange(e, "update") }} name="owner" className="outline-none pl-[5px] p-[3px] rounded-[5px]" placeholder="Assignee" value={viewTask.task.owner} />
                                <div className="relative">
                                    <input onChange={(e) => { onAddTaskFormChange(e, "update") }} name="date" type="date" className="outline-none pl-[5px] p-[3px] w-full rounded-[5px]" placeholder="Due date" value={viewTask.task.date} />
                                    <input readOnly name="date" className="outline-none pl-[5px] z-[20] absolute left-0 p-[3px] rounded-[5px]" placeholder="Due Date" value={viewTask.task.date} />
                                </div>
                                <select onChange={(e) => { onAddTaskFormChange(e, "update") }} name="priority" value={viewTask.task.priority} className="outline-none">
                                    {taskPriority.map((priority) => {
                                        if (viewTask.task.priority == priority) {
                                            return <option defaultValue={priority} value={priority}>{priority}</option>
                                        }
                                        return <option value={priority}>{priority}</option>
                                    })}
                                </select>
                                <input onChange={(e) => { onAddTaskFormChange(e, "update") }} name="label" className="outline-none pl-[5px] p-[3px] rounded-[5px]" placeholder="Label" value={viewTask.task.label} />
                                <input onChange={(e) => { onAddTaskFormChange(e, "update") }} name="tag" className="outline-none pl-[5px] p-[3px] rounded-[5px]" placeholder="Tag" value={viewTask.task.tag} />
                            </div>
                            <div className="flex justify-between">
                                <div className="flex border mt-[20px] items-center gap-[5px] w-fit rounded-[10px] border-black p-[3px]">
                                    <button disabled={viewTask.task.title == "" || viewTask.task.date == "" || viewTask.task.owner == "" || viewTask.task.desc == "" || false} onClick={(e) => { manageTask(e, "update") }} className="flex items-center gap-[5px]">
                                        Update Task
                                    </button>
                                </div>
                            </div>
                        </Box>
                        <Box component="div" className={`${viewTask.type == "edit" ? "hidden" : "flex"}  w-[360px]`}>
                            <TaskCard task={viewTask.task} operation={() => { setViewTask({ ...viewTask, type: "edit" }) }} deleteTask={deleteTask} listId={viewTask.listId} listLabel={viewTask.label} />
                        </Box>
                    </Box>
                </Modal>
            </LayoutContext.Provider >
        </div>

    )
}