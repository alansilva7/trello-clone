import React from "react";
import "./App.css";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Box, Button, Paper, Typography } from "@mui/material";
import Navbar from "./components/navbar/NavBar";
import AddIcon from "@mui/icons-material/Add";

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
    <Box
      sx={{
        backgroundImage: "linear-gradient(45deg, #8587f3 30%, #fd84ae 100%)",
      }}
    >
      <Navbar />
      <Box display="flex" justifyContent="center" height="100vh">
        <DragDropContext onDragEnd={onDragEnd}>
          {columns.map((column) => (
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Droppable droppableId={column.id} key={column.id}>
                {(provided) => (
                  <Box
                    ref={provided.innerRef}
                    style={{
                      backgroundColor: "#ebebf1",
                      width: 250,
                      height: "fit-content",
                      padding: 10,
                      margin: 10,
                    }}
                  >
                    <Typography variant="h4">{column.name}</Typography>
                    <Box ref={provided.innerRef} width="100%" height="100%">
                      {column.items.map((item, index) => (
                        <Draggable
                          draggableId={item.id}
                          index={index}
                          key={item.id}
                        >
                          {(provided) => (
                            <Paper
                              elevation={2}
                              {...provided.dragHandleProps}
                              {...provided.draggableProps}
                              ref={provided.innerRef}
                              style={{
                                height: 40,
                                marginTop: 10,
                                padding: 5,
                                ...provided.draggableProps.style,
                              }}
                            >
                              {item.content}
                            </Paper>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                      <Button
                        sx={{ marginTop: "10px", color: "#959dab" }}
                        size="large"
                        startIcon={<AddIcon />}
                      >
                        CARD
                      </Button>
                    </Box>
                  </Box>
                )}
              </Droppable>
            </Box>
          ))}
        </DragDropContext>
      </Box>
    </Box>
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
