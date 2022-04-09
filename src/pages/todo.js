import React, { useEffect, useState } from 'react';
import './app.css';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import _ from "lodash";
import { v4 } from "uuid";
import { Container, Input, Button, Stack } from '@mui/material';
import Swal from 'sweetalert2'

const item = {
    id: v4(),
    name: "Clean the house"
}

const item2 = {
    id: v4(),
    name: "Wash the car"
}

function Todo() {
    const [text, setText] = useState("")
    const [state, setState] = useState({
        "todo": {
            title: "Todo",
            items: [item2]
        },
        "in-progress": {
            title: "In Progress",
            items: []
        },
        "done": {
            title: "Completed",
            items: []
        }
    })
    useEffect(()=>{
        setState( JSON.parse(localStorage.getItem('todo')))
    },[])

    const handleDragEnd = ({ destination, source }) => {
        if (!destination) {
            return
        }

        if (destination.index === source.index && destination.droppableId === source.droppableId) {
            return
        }

        // Creating a copy of item before removing it from state
        const itemCopy = { ...state[source.droppableId].items[source.index] }

        setState(prev => {
            prev = { ...prev }
            // Remove from previous items array
            prev[source.droppableId].items.splice(source.index, 1)


            // Adding to new items array location
            prev[destination.droppableId].items.splice(destination.index, 0, itemCopy)

            return prev
        })
    }
    const addtodo = async () => {
        const ipAPI = '//api.ipify.org?format=json'

        const inputValue = fetch(ipAPI)
            .then(response => response.json())
            .then(data => data.ip)

        const { value: ipAddress } = await Swal.fire({
            title: 'Enter your task ',
            input: 'text',
            inputLabel: 'Your task ',
            inputValue: inputValue,
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to write something!'
                }
            }
        })

        if (ipAddress) {
            Swal.fire(`Your new task is ${ipAddress}`)
            addItem(ipAddress)
        }
    }
    const addItem = (text) => {
        setState(prev => {
            return {
                ...prev,
                todo: {
                    title: "Todo",
                    items: [
                        {
                            id: v4(),
                            name: text
                        },
                        ...prev.todo.items
                    ]
                }
            }
        })

        setText("")
    }
    const save =()=>{
        localStorage.setItem('todo', JSON.stringify(state));
    }

    return (
        <div>
            <Stack direction="row" alignItems="center" spacing={2}>
                <Button onClick={addtodo} variant="contained"  >
                    add new task
                </Button>
                <Button onClick={save} variant="contained"  >
                    save
                </Button>
            </Stack>
            <div className="App">
                <DragDropContext onDragEnd={handleDragEnd}>
                    {_.map(state, (data, key) => {
                        return (
                            <div key={key} className={"column"}>
                                <h3>{data.title}</h3>
                                <Droppable droppableId={key}>
                                    {(provided, snapshot) => {
                                        return (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                                className={"droppable-col"}
                                            >
                                                {data.items.map((el, index) => {
                                                    return (
                                                        <Draggable key={el.id} index={index} draggableId={el.id}>
                                                            {(provided, snapshot) => {
                                                                console.log(snapshot)
                                                                return (
                                                                    <div
                                                                        className={`item ${snapshot.isDragging && "dragging"}`}
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                    >
                                                                        {el.name}
                                                                    </div>
                                                                )
                                                            }}
                                                        </Draggable>
                                                    )
                                                })}
                                                {provided.placeholder}
                                            </div>
                                        )
                                    }}
                                </Droppable>
                            </div>
                        )
                    })}
                </DragDropContext>
            </div>
        </div>
    );
}

export default Todo;
