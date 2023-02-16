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
];

function App() {
  const [columns, setColumns] = useState(inicialColumns);

  const onDragEnd = (result) => {
    console.log(result);
    let sourceColumnItems = columns[0].items;
    let draggableItem = {};

    for (let i in sourceColumnItems) {
      if (sourceColumnItems[i].id === result.draggableId) {
        draggableItem = sourceColumnItems[i];
      }
    }

    // Excluir o objeto arrastado;
    let filteredSourceColumnItems = sourceColumnItems.filter(
      (item) => item.id != result.draggableId
    );

    // Adicionar o mesmo na nova posição;
    filteredSourceColumnItems.splice(
      result.destination.index,
      0,
      draggableItem
    );
    console.log(filteredSourceColumnItems);

    // Mudar o state
    let columnsCopy = JSON.parse(JSON.stringify(columns));
    columnsCopy[0].items = filteredSourceColumnItems;
    setColumns(columnsCopy);

    // columns[0].items = filteredSourceColumnItems;
    // let columnsCopy = columns;
    // columnsCopy.items = filteredSourceColumnItems;
    // // setColumns(columnsCopy);
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

export default App;
