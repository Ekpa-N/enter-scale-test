import { BoardProps, PriorityTypes, TaskCardProps, TaskList, TaskListItem } from "./sharedTypes";


const testBoard: BoardProps = {
    title: "Test One",
    pending: [
        {
            title: "Task 1",
            desc: "A description",
            date: "Today",
            owner: "A name",
            priority: "LOW",
            label: "Test Label",
            tag: "Test tag",
            id: "one"

        },
        {
            title: "Task 2",
            desc: "A description",
            date: "Today",
            owner: "A name",
            priority: "HIGH",
            label: "Test Label",
            tag: "Test tag",
            id: "two"

        },
        {
            title: "Task 3",
            desc: "A description",
            date: "Today",
            owner: "A name",
            priority: "HIGH",
            label: "Test Label",
            tag: "Test tag",
            id: "three"

        },
        {
            title: "Task 4",
            desc: "A description",
            date: "Today",
            owner: "A name",
            priority: "LOW",
            label: "Test Label",
            tag: "Test tag",
            id: "four"

        },
        {
            title: "Task 5",
            desc: "A description",
            date: "Today",
            owner: "A name",
            priority: "MEDIUM",
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
            priority: "HIGH",
            label: "Test Label",
            tag: "Test tag",
            id: "six"
        },
        {
            title: "Task 7",
            desc: "A description",
            date: "Today",
            owner: "A name",
            priority: "LOW",
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
            priority: "MEDIUM",
            label: "Test Label",
            tag: "Test tag",
            id: "eight"
        },
        {
            title: "Task 9",
            desc: "A description",
            date: "Today",
            owner: "A name",
            priority: "LOW",
            label: "Test Label",
            tag: "Test tag",
            id: "nine"
        }
    ]
}
const testBoardTwo: BoardProps = {
    title: "Test Two",
    pending: [
        {
            title: "Task 11",
            desc: "A description",
            date: "Today",
            owner: "A name",
            priority: "LOW",
            label: "Test Label",
            tag: "Test tag",
            id: "one"

        },
        {
            title: "Task 12",
            desc: "A description",
            date: "Today",
            owner: "A name",
            priority: "MEDIUM",
            label: "Test Label",
            tag: "Test tag",
            id: "two"

        },
        {
            title: "Task 13",
            desc: "A description",
            date: "Today",
            owner: "A name",
            priority: "HIGH",
            label: "Test Label",
            tag: "Test tag",
            id: "three"

        },
        {
            title: "Task 14",
            desc: "A description",
            date: "Today",
            owner: "A name",
            priority: "LOW",
            label: "Test Label",
            tag: "Test tag",
            id: "four"

        },
        {
            title: "Task 15",
            desc: "A description",
            date: "Today",
            owner: "A name",
            priority: "MEDIUM",
            label: "Test Label",
            tag: "Test tag",
            id: "five"
        }
    ],
    inProgress: [
        {
            title: "Task 16",
            desc: "A description",
            date: "Today",
            owner: "A name",
            priority: "LOW",
            label: "Test Label",
            tag: "Test tag",
            id: "six"
        },
        {
            title: "Task 17",
            desc: "A description",
            date: "Today",
            owner: "A name",
            priority: "MEDIUM",
            label: "Test Label",
            tag: "Test tag",
            id: "seven"
        }
    ],
    done: [
        {
            title: "Task 18",
            desc: "A description",
            date: "Today",
            owner: "A name",
            priority: "MEDIUM",
            label: "Test Label",
            tag: "Test tag",
            id: "eight"
        },
        {
            title: "Task 19",
            desc: "A description",
            date: "Today",
            owner: "A name",
            priority: "HIGH",
            label: "Test Label",
            tag: "Test tag",
            id: "nine"
        }
    ]
}

const testListColumns: TaskList = [
    { id: "pending", title: "Pending", color: "lightgrey" },
    { id: "inProgress", title: "In Progress", color: "lightblue" },
    { id: "done", title: "Completed", color: "lightgreen" }
]

const priorityColours: PriorityTypes = {
    high: "red",
    low: "lightgrey",
    medium: "lightblue"
    

}

const boards = [testBoard, testBoardTwo]
const team = ["Paul", "Loretta", "Tim", "Angela"]


export { testBoard, boards, team, testListColumns, priorityColours }