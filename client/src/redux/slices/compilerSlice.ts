import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface CompilerSliceStateType {
  fullCode: {
    html: string;
    css: string;
    javascript: string;
  };
  currentLanguage: "html" | "css" | "javascript";
  currentCode: string;
  isOwner: boolean;
}

const initialState: CompilerSliceStateType = {
  fullCode: {
    html: `
<div class="container">
  <h2>To-Do List</h2>
  <input type="text" id="taskInput" placeholder="Add new task...">
  <button onclick="addTask()">Add Task</button>
  <ul id="taskList"></ul>
</div>`,
    css: ` body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #f4f4f4;
    }
    .container {
      width: 300px;
      background-color: #fff;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      padding: 20px;
    }
    input[type="text"] {
      width: 100%;
      padding: 10px;
      margin-bottom: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
      box-sizing: border-box;
    }
    button {
      padding: 10px 20px;
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    button:hover {
      background-color: #0056b3;
    }
    ul {
      list-style-type: none;
      padding: 0;
    }
    li {
      padding: 10px;
      border-bottom: 1px solid #ddd;
    }
    li:last-child {
      border-bottom: none;
    }
    .delete-btn {
      float: right;
      background-color: #ff4d4d;
      color: #fff;
      border: none;
      border-radius: 3px;
      cursor: pointer;
    }`,
    javascript: `  function addTask() {
      const taskInput = document.getElementById("taskInput");
      const taskList = document.getElementById("taskList");
      const taskText = taskInput.value.trim();
      if (taskText !== "") {
        const li = document.createElement("li");
        li.innerText = taskText;
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.onclick = function() {
          li.remove();
        };
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
        taskInput.value = "";
      }
    }`,
  },
  currentLanguage: "html",
  currentCode: "",
  isOwner: false,
};

const compilerSlice = createSlice({
  name: "compilerSlice",
  initialState,
  reducers: {
    updateCurrentLanguage: (
      state,
      action: PayloadAction<CompilerSliceStateType["currentLanguage"]>
    ) => {
      state.currentLanguage = action.payload;
    },
    updateCodeValue: (state, action: PayloadAction<string>) => {
      state.fullCode[state.currentLanguage] = action.payload;
    },
    updateIsOwner: (state, action: PayloadAction<boolean>) => {
      state.isOwner = action.payload;
    },
    updateFullCode: (
      state,
      action: PayloadAction<CompilerSliceStateType["fullCode"]>
    ) => {
      state.fullCode = action.payload;
    },
  },
});

export default compilerSlice.reducer;
export const {
  updateCurrentLanguage,
  updateCodeValue,
  updateIsOwner,
  updateFullCode,
} = compilerSlice.actions;
