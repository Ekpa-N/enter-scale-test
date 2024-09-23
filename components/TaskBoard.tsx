"use client"
import { BoardProps, TaskCardProps, TaskList } from "@/constants/sharedTypes"
import { useState, useEffect } from "react"
import { DragDropContext, Droppable, Draggable, DropResult, DraggableProvided, DraggableStateSnapshot } from '@hello-pangea/dnd';
import { IoIosAddCircleOutline } from "react-icons/io";
import { testListColumns } from "@/constants/TestData";

type TaskBoardProps = {
    props: {
        data: BoardProps;
        [key: string]: number | BoardProps | ((data: BoardProps, idx: number) => void) | (() => void) | ((id: number | string, label: string) => void) | ((task: TaskCardProps, id: number, label: string, type: string) => void) | ((listId: number, label: string, taskId: string) => void);
        boardHandler: (data: BoardProps, idx: number) => void;
        listIdx: number;
        handleNewTaskModalOpen: (id: number | string, label: string) => void;
        handleViewTaskOpen: (task: TaskCardProps, id: number, label: string, type: string) => void;
        deleteTask: (listId: number, label: string, taskId: string) => void
    }
}

export default function TaskBoard({ props }: TaskBoardProps) {
    const { title, pending, done, inProgress } = props.data
    const { boardHandler, listIdx, handleNewTaskModalOpen, handleViewTaskOpen, deleteTask } = props
    const [lists, setLists] = useState<TaskList>(testListColumns)

    const reorder = (list: any, startIndex: any, endIndex: any) => {
        // debugger
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    }

    const move = (source: any, destination: any, droppableSource: any, droppableDestination: any) => {
        // debugger
        const sourceClone = Array.from(source);
        const destClone = Array.from(destination);
        const [removed] = sourceClone.splice(droppableSource.index, 1);

        destClone.splice(droppableDestination.index, 0, removed);

        const result = { ...props.data, [droppableSource.droppableId]: sourceClone, [droppableDestination.droppableId]: destClone }

        return result;
    };

    const onDragEnd = (result: DropResult): void => {
        const { source, destination } = result;
        // debugger

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId && source.droppableId === "lists") {
            const items = reorder(
                lists,
                source.index,
                destination.index
            );

            setLists(items as [])
            return

        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                props.data[source.droppableId],
                source.index,
                destination.index
            );

            let newBoard = { ...props.data, [source.droppableId]: items }
            // debugger
            boardHandler(newBoard as BoardProps, listIdx)


        } else {
            const result = move(
                props.data[source.droppableId],
                props.data[destination.droppableId],
                source,
                destination
            )
            // debugger

            boardHandler(result as BoardProps, listIdx)
        }
    };


    return (
        <div className="flex flex-col h-[460px] overflow-y-hidden w-full laptop:items-center relative gap-[5px] mt-[20px] ">
            <h2 className="relative laptop:w-[950px]">{title}</h2>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="lists" direction="horizontal" type="column">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={`overflow-x-auto overflow-y-hidden`}
                        >
                            <div className="flex w-[950px]  gap-[15px]">
                                {lists.map((list: any, index: number) => {
                                    return (
                                        <Draggable
                                            key={String(list.id)}
                                            draggableId={String(list.id)}
                                            index={index}
                                        >
                                            {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={provided.draggableProps.style}
                                                    className={`flex w-[300px] relative flex-col h-[420px] overflow-x-auto overflow-y-hidden`}
                                                >
                                                    <h2 style={{backgroundColor: `${list.color}`}} className={`border flex justify-between sticky top-0 h-[30] px-[5px]`}>
                                                        {list.title}
                                                        <button onClick={(e) => { handleNewTaskModalOpen(listIdx, list.id) }} className="flex items-center gap-[5px]">
                                                            {<IoIosAddCircleOutline className="relative " />}
                                                        </button>
                                                    </h2>
                                                    <Droppable droppableId={String(list.id)}>
                                                        {(provided, snapshot) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.droppableProps}
                                                                className="border border-[cyan] flex flex-col gap-[2px] py-[2px] h-[380px] overflow-auto"
                                                            >
                                                                {(props.data[list.id] as Array<TaskCardProps>).map((item: any, index: any) => (
                                                                    <Draggable
                                                                        key={String(item.id)}
                                                                        draggableId={String(item.id)}
                                                                        index={index}
                                                                    >
                                                                        {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                                                                            <div>
                                                                                <div
                                                                                    ref={provided.innerRef}
                                                                                    {...provided.draggableProps}
                                                                                    {...provided.dragHandleProps}
                                                                                    style={provided.draggableProps.style}
                                                                                    className="border  w-[96%] ml-[2%] items-center px-[2px] flex justify-between"
                                                                                    
                                                                                >
                                                                                    <h2 className="">{item.title}</h2>
                                                                                    <div className="flex gap-[5px]">
                                                                                        <button onClick={() => { handleViewTaskOpen(item, listIdx, list.id, "view") }} className="relative flex border border-[green] w-fit px-[5px] items-center h-[20px]">
                                                                                            VIEW
                                                                                        </button>
                                                                                        <button onClick={() => { deleteTask(listIdx, list.id, item.id) }} className="relative w-fit px-[5px] border border-black h-[20px] flex items-center borde">
                                                                                            {/* <RiDeleteBinLine className="w-[20px] h-[20px]" /> */}
                                                                                            <h2>DELETE</h2>
                                                                                        </button>
                                                                                    </div>
                                                                                </div>

                                                                            </div>
                                                                        )}
                                                                    </Draggable>
                                                                ))}
                                                                {provided.placeholder}
                                                            </div>
                                                        )}
                                                    </Droppable>

                                                </div>
                                            )}
                                        </Draggable>
                                    )
                                })}
                            </div>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

        </div>
    )
}



