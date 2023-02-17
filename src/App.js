import React from "react";
import "./App.css";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const inicialItems = [
  { id: "1", content: "Conteúdo 1" },
  { id: "2", content: "Conteúdo 2" },
  { id: "3", content: "Conteúdo 3" },
];

const inicialColumns = [
  {
    name: "To do",
    id: "123",
    items: inicialItems,
  },
  {
    name: "Doing",
    id: "456",
    items: [],
  },
  {
    name: "Done",
    id: "789",
    items: [],
  },
];

function App() {
  const [columns, setColumns] = useState(inicialColumns);

  const onDragEnd = (result) => {
    console.log(result);

    let sourceColumnItems = [];
    let destinationColumnItems = [];
    let draggedItem = {};

    let sourceColumnId = 0;
    let destinationColumnId = 0;

    for (let i in columns) {
      if (columns[i].id == result.source.droppableId) {
        sourceColumnItems = columns[i].items;
        sourceColumnId = i;
      } else if (columns[i].id == result.destination.droppableId) {
        destinationColumnItems = columns[i].items;
        destinationColumnId = i;
      }
    }

    for (let i in sourceColumnItems) {
      if (sourceColumnItems[i].id == result.draggableId) {
        draggedItem = sourceColumnItems[i];
      }
    }

    let filteredSourceColumnItems = sourceColumnItems.filter(
      (item) => item.id != result.draggableId
    );

    if (result.source.droppableId == result.destination.droppableId) {
      filteredSourceColumnItems.splice(
        result.destination.index,
        0,
        draggedItem
      );

      let columnsCopy = JSON.parse(JSON.stringify(columns));
      columnsCopy[sourceColumnId].items = filteredSourceColumnItems;
      setColumns(columnsCopy);
    } else {
      destinationColumnItems.splice(result.destination.index, 0, draggedItem);

      let columnsCopy = JSON.parse(JSON.stringify(columns));
      columnsCopy[sourceColumnId].items = filteredSourceColumnItems;
      columnsCopy[destinationColumnId].items = destinationColumnItems;
      setColumns(columnsCopy);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <DragDropContext onDragEnd={onDragEnd}>
        {columns.map((column) => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h1>{column.name}</h1>
            <Droppable droppableId={column.id} key={column.id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  style={{
                    backgroundColor: "lightblue",
                    width: 250,
                    height: 500,
                    padding: 10,
                    margin: 10,
                  }}
                >
                  {column.items.map((item, index) => (
                    <Draggable
                      draggableId={item.id}
                      index={index}
                      key={item.id}
                    >
                      {(provided) => (
                        <div
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                          style={{
                            backgroundColor: "gray",
                            height: 40,
                            marginBottom: 10,
                            ...provided.draggableProps.style,
                          }}
                        >
                          {item.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </DragDropContext>
    </div>
  );
}

function main() {
  try {
    const testFunction = new App();
    throw new Error(testFunction);
  } catch (error) {
    console.log(error.message);
  }
}

export default App;
