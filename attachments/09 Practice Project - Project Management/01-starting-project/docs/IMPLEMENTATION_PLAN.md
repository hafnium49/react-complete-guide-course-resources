# Project Management App - Implementation Plan

## Status: COMPLETED

## Overview
Build a React Project Management app practicing components, state, refs, and portals.

## File Structure
```
src/
├── App.jsx                    (✅ updated - central state)
├── main.jsx                   (no changes)
├── index.css                  (no changes)
├── assets/
│   └── no-projects.png        (existing)
└── components/
    ├── Button.jsx             (✅ created - reusable button)
    ├── Input.jsx              (✅ created - reusable input with forwardRef)
    ├── Modal.jsx              (✅ created - portal-based validation modal)
    ├── ProjectsSidebar.jsx    (✅ created - left sidebar)
    ├── NoProjectSelected.jsx  (✅ created - empty state view)
    ├── NewProject.jsx         (✅ created - project creation form)
    ├── SelectedProject.jsx    (✅ created - project details view)
    ├── Tasks.jsx              (✅ created - task list container)
    └── NewTask.jsx            (✅ created - task input)
```

## State Architecture (in App.jsx)

```jsx
const [projectsState, setProjectsState] = useState({
  selectedProjectId: undefined,  // undefined=empty | null=adding | id=viewing
  projects: [],                  // [{ id, title, description, dueDate }]
  tasks: [],                     // [{ id, projectId, text }]
});
```

### State Values:
- `selectedProjectId === undefined` → Show `NoProjectSelected`
- `selectedProjectId === null` → Show `NewProject` form
- `selectedProjectId === <id>` → Show `SelectedProject` with details

---

## Implementation Order

### Phase 1: Reusable Components

#### 1. Button.jsx
Styled button with Tailwind, spreads props for flexibility.

```jsx
export default function Button({ children, ...props }) {
  return (
    <button
      className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100"
      {...props}
    >
      {children}
    </button>
  );
}
```

#### 2. Input.jsx
Reusable input/textarea with `forwardRef` for ref access.

```jsx
import { forwardRef } from 'react';

const Input = forwardRef(function Input({ label, textarea, ...props }, ref) {
  const classes = 'w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600';

  return (
    <p className="flex flex-col gap-1 my-4">
      <label className="text-sm font-bold uppercase text-stone-500">{label}</label>
      {textarea ? (
        <textarea ref={ref} className={classes} {...props} />
      ) : (
        <input ref={ref} className={classes} {...props} />
      )}
    </p>
  );
});

export default Input;
```

#### 3. Modal.jsx
Portal-based modal with `useImperativeHandle` to expose `open()` method.

```jsx
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';
import Button from './Button.jsx';

const Modal = forwardRef(function Modal({ children, buttonCaption }, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => ({
    open() {
      dialog.current.showModal();
    },
  }));

  return createPortal(
    <dialog ref={dialog} className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md">
      {children}
      <form method="dialog" className="mt-4 text-right">
        <Button>{buttonCaption}</Button>
      </form>
    </dialog>,
    document.getElementById('modal-root')
  );
});

export default Modal;
```

---

### Phase 2: View Components

#### 4. NoProjectSelected.jsx
Empty state with clipboard image and "Create new project" button.

```jsx
import noProjectImage from '../assets/no-projects.png';
import Button from './Button.jsx';

export default function NoProjectSelected({ onStartAddProject }) {
  return (
    <div className="mt-24 text-center w-2/3">
      <img src={noProjectImage} alt="An empty task list" className="w-16 h-16 object-contain mx-auto" />
      <h2 className="text-xl font-bold text-stone-500 my-4">No Project Selected</h2>
      <p className="text-stone-400 mb-4">Select a project or get started with a new one</p>
      <p className="mt-8">
        <Button onClick={onStartAddProject}>Create new project</Button>
      </p>
    </div>
  );
}
```

#### 5. ProjectsSidebar.jsx
Dark sidebar with project list and "+ Add Project" button.

```jsx
import Button from './Button.jsx';

export default function ProjectsSidebar({ onStartAddProject, projects, onSelectProject, selectedProjectId }) {
  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">Your Projects</h2>
      <div>
        <Button onClick={onStartAddProject}>+ Add Project</Button>
      </div>
      <ul className="mt-8">
        {projects.map((project) => {
          let cssClasses = "w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800";
          cssClasses += project.id === selectedProjectId
            ? ' bg-stone-800 text-stone-200'
            : ' text-stone-400';
          return (
            <li key={project.id}>
              <button className={cssClasses} onClick={() => onSelectProject(project.id)}>
                {project.title}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
```

#### 6. NewProject.jsx
Form with title/description/dueDate inputs and validation modal.

```jsx
import { useRef } from 'react';
import Input from './Input.jsx';
import Modal from './Modal.jsx';

export default function NewProject({ onAdd, onCancel }) {
  const modal = useRef();
  const title = useRef();
  const description = useRef();
  const dueDate = useRef();

  function handleSave() {
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDueDate = dueDate.current.value;

    if (enteredTitle.trim() === '' || enteredDescription.trim() === '' || enteredDueDate.trim() === '') {
      modal.current.open();
      return;
    }

    onAdd({ title: enteredTitle, description: enteredDescription, dueDate: enteredDueDate });
  }

  return (
    <>
      <Modal ref={modal} buttonCaption="Okay">
        <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
        <p className="text-stone-600 mb-4">Oops ... looks like you forgot to enter a value.</p>
        <p className="text-stone-600 mb-4">Please make sure you provide a valid value for every input field.</p>
      </Modal>
      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li><button className="text-stone-800 hover:text-stone-950" onClick={onCancel}>Cancel</button></li>
          <li><button className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950" onClick={handleSave}>Save</button></li>
        </menu>
        <div>
          <Input type="text" ref={title} label="Title" />
          <Input ref={description} label="Description" textarea />
          <Input type="date" ref={dueDate} label="Due Date" />
        </div>
      </div>
    </>
  );
}
```

---

### Phase 3: Project Details

#### 7. NewTask.jsx
Controlled input for adding tasks.

```jsx
import { useState } from 'react';

export default function NewTask({ onAdd }) {
  const [enteredTask, setEnteredTask] = useState('');

  function handleChange(event) {
    setEnteredTask(event.target.value);
  }

  function handleClick() {
    if (enteredTask.trim() === '') return;
    onAdd(enteredTask);
    setEnteredTask('');
  }

  return (
    <div className="flex items-center gap-4">
      <input type="text" className="w-64 px-2 py-1 rounded-sm bg-stone-200" onChange={handleChange} value={enteredTask} />
      <button className="text-stone-700 hover:text-stone-950" onClick={handleClick}>Add Task</button>
    </div>
  );
}
```

#### 8. Tasks.jsx
Task list container with add/delete functionality.

```jsx
import NewTask from './NewTask.jsx';

export default function Tasks({ tasks, onAdd, onDelete }) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      <NewTask onAdd={onAdd} />
      {tasks.length === 0 && <p className="text-stone-800 my-4">This project does not have any tasks yet.</p>}
      {tasks.length > 0 && (
        <ul className="p-4 mt-8 rounded-md bg-stone-100">
          {tasks.map((task) => (
            <li key={task.id} className="flex justify-between my-4">
              <span>{task.text}</span>
              <button className="text-stone-700 hover:text-red-500" onClick={() => onDelete(task.id)}>Clear</button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
```

#### 9. SelectedProject.jsx
Project details view with tasks.

```jsx
import Tasks from './Tasks.jsx';

export default function SelectedProject({ project, onDelete, onAddTask, onDeleteTask, tasks }) {
  const formattedDate = new Date(project.dueDate).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });

  return (
    <div className="w-[35rem] mt-16">
      <header className="pb-4 mb-4 border-b-2 border-stone-300">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-stone-600 mb-2">{project.title}</h1>
          <button className="text-stone-600 hover:text-stone-950" onClick={onDelete}>Delete</button>
        </div>
        <p className="mb-4 text-stone-400">{formattedDate}</p>
        <p className="text-stone-600 whitespace-pre-wrap">{project.description}</p>
      </header>
      <Tasks onAdd={onAddTask} onDelete={onDeleteTask} tasks={tasks} />
    </div>
  );
}
```

---

### Phase 4: Wire Up App.jsx

```jsx
import { useState } from 'react';
import NewProject from './components/NewProject.jsx';
import NoProjectSelected from './components/NoProjectSelected.jsx';
import ProjectsSidebar from './components/ProjectsSidebar.jsx';
import SelectedProject from './components/SelectedProject.jsx';

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  function handleAddTask(text) {
    setProjectsState((prevState) => {
      const newTask = { text, projectId: prevState.selectedProjectId, id: Math.random() };
      return { ...prevState, tasks: [newTask, ...prevState.tasks] };
    });
  }

  function handleDeleteTask(id) {
    setProjectsState((prevState) => ({
      ...prevState,
      tasks: prevState.tasks.filter((task) => task.id !== id),
    }));
  }

  function handleSelectProject(id) {
    setProjectsState((prevState) => ({ ...prevState, selectedProjectId: id }));
  }

  function handleStartAddProject() {
    setProjectsState((prevState) => ({ ...prevState, selectedProjectId: null }));
  }

  function handleCancelAddProject() {
    setProjectsState((prevState) => ({ ...prevState, selectedProjectId: undefined }));
  }

  function handleAddProject(projectData) {
    setProjectsState((prevState) => {
      const newProject = { ...projectData, id: Math.random() };
      return { ...prevState, selectedProjectId: undefined, projects: [...prevState.projects, newProject] };
    });
  }

  function handleDeleteProject() {
    setProjectsState((prevState) => ({
      ...prevState,
      selectedProjectId: undefined,
      projects: prevState.projects.filter((project) => project.id !== prevState.selectedProjectId),
    }));
  }

  const selectedProject = projectsState.projects.find((project) => project.id === projectsState.selectedProjectId);
  const projectTasks = projectsState.tasks.filter((task) => task.projectId === projectsState.selectedProjectId);

  let content = <SelectedProject project={selectedProject} onDelete={handleDeleteProject} onAddTask={handleAddTask} onDeleteTask={handleDeleteTask} tasks={projectTasks} />;

  if (projectsState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />;
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar onStartAddProject={handleStartAddProject} projects={projectsState.projects} onSelectProject={handleSelectProject} selectedProjectId={projectsState.selectedProjectId} />
      {content}
    </main>
  );
}

export default App;
```

---

## React Concepts Practiced

| Concept | Component |
|---------|-----------|
| forwardRef | Input.jsx, Modal.jsx |
| useImperativeHandle | Modal.jsx |
| createPortal | Modal.jsx |
| Refs for form | NewProject.jsx |
| Controlled input | NewTask.jsx |
| Lifting state | App.jsx manages all |
| Conditional render | App.jsx |
| List rendering | ProjectsSidebar, Tasks |
| Props spreading | Button.jsx, Input.jsx |
| children prop | Button.jsx, Modal.jsx |

---

## How to Run

```bash
cd "attachments/09 Practice Project - Project Management/01-starting-project"
npm run dev
```

## Features Implemented

- ✅ Create new projects with title, description, and due date
- ✅ View project list in sidebar
- ✅ Select projects to view details
- ✅ Delete projects
- ✅ Add tasks to projects
- ✅ Delete tasks from projects
- ✅ Form validation with modal error messages
- ✅ Portal-based modal rendering
- ✅ Conditional rendering based on app state
