"use client"

import Image from "next/image";
import { IoIosAddCircleOutline } from "react-icons/io";
import TaskBoard from "@/components/TaskBoard";
import { BoardProps } from "@/constants/sharedTypes";
import { Fragment, useState } from "react";
import LayoutContext from "@/components/Provider";

const testBoard: BoardProps = {
  title: "Test",
  pending: [
    {
      title: "Task 1",
      desc: "A description",
      date: "Today",
      owner: "A name",
      priority: "Neutral",
      label: "Test Label",
      tag: "Test tag",
      id: "one"

    },
    {
      title: "Task 2",
      desc: "A description",
      date: "Today",
      owner: "A name",
      priority: "Neutral",
      label: "Test Label",
      tag: "Test tag",
      id: "two"

    },
    {
      title: "Task 3",
      desc: "A description",
      date: "Today",
      owner: "A name",
      priority: "Neutral",
      label: "Test Label",
      tag: "Test tag",
      id: "three"

    },
    {
      title: "Task 4",
      desc: "A description",
      date: "Today",
      owner: "A name",
      priority: "Neutral",
      label: "Test Label",
      tag: "Test tag",
      id: "four"

    },
    {
      title: "Task 5",
      desc: "A description",
      date: "Today",
      owner: "A name",
      priority: "Neutral",
      label: "Test Label",
      tag: "Test tag",
      id: "five"
    }
  ],
  inProgress: [
    {
      title: "Task 6",
      desc: "A description",
      date: "Today",
      owner: "A name",
      priority: "Neutral",
      label: "Test Label",
      tag: "Test tag",
      id: "six"
    },
    {
      title: "Task 7",
      desc: "A description",
      date: "Today",
      owner: "A name",
      priority: "Neutral",
      label: "Test Label",
      tag: "Test tag",
      id: "seven"
    }
  ],
  done: [
    {
      title: "Task 8",
      desc: "A description",
      date: "Today",
      owner: "A name",
      priority: "Neutral",
      label: "Test Label",
      tag: "Test tag",
      id: "eight"
    },
    {
      title: "Task 9",
      desc: "A description",
      date: "Today",
      owner: "A name",
      priority: "Neutral",
      label: "Test Label",
      tag: "Test tag",
      id: "nine"
    }
  ]
}

export default function Home() {
  // const [testData, setTestData] = useState<BoardProps>(testBoard)





  return (
    <main className=" p-[5px] ">
      <LayoutContext.Consumer>
        {({ loading, testData, boardHandler, handleNewTaskModalOpen, handleViewTaskOpen, deleteTask }) => {
          return (
            <>
            {loading && <div>... loading data</div>}
            {
              !testData.length && !loading && <div> Click the button to create your first board</div>
            }
              {testData.length > 0 && !loading && testData.map((item: any, index: number) => (
                <Fragment key={index}>
                  <TaskBoard props={{ data: item, boardHandler: boardHandler, listIdx: index, handleNewTaskModalOpen: handleNewTaskModalOpen, handleViewTaskOpen: handleViewTaskOpen, deleteTask:deleteTask }} />
                </Fragment>
              ))}
            </>

          )
        }}
      </LayoutContext.Consumer>
    </main>
  );
}
