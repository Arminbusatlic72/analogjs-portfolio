---
title: "Angular Signal State Management with NgRx"
slug: game-changer-with-ngrx-signal-state
description: In this blog post, we’ll dive deep into Angular Signals, explore how NgRx Signal State works, and why this combination is being hailed as a game changer.
coverImage: /blog/angularSignalStore.webp
previousPost: ""
nextPost: "understanding-ssr-csr-ssg-isr-pros-cons"
---

# Angular Signals: Angular Signal State Management with NgRx

Angular Signal State is a powerful utility designed to simplify the management of state in Angular applications by leveraging the new Signals API introduced in Angular v16. With the addition of Signal Inputs and Outputs in Angular v17, converting existing applications to this new approach has become seamless. This article explores how Signal State, particularly through the NgRx library, can optimize state management, enabling fine-grained reactivity and efficient updates.

## Introduction to Angular Signals

Angular has re imagined reactive application development with its Signals API. This modern approach enhances the capabilities of Angular by allowing developers to manage state more effectively, especially in applications with complex data structures. With NgRx’s introduction of Signal State, developers can simplify state management without the overhead of traditional Redux patterns, making it more accessible for various use cases.

### What is NgRx Signal State?

NgRx is the go-to library for state management in Angular applications, known for its comprehensive API and robust functionality. With the release of NgRx v14, many of the complexities associated with Redux patterns have been streamlined, making it easier to define actions and manage state.

The latest addition, NgRx SignalState, builds on the Signals API to provide a minimalist state management solution. Unlike traditional NgRx, which involves actions, reducers, and effects, SignalState focuses on defining and updating states directly within components or services. This approach significantly reduces boilerplate code and simplifies state management for developers.

## Getting Started with NgRx SignalState

To use NgRx SignalState, you need to install it in your Angular project. This can be done conveniently using the Angular CLI:

```typescript
// Using Angular CLI
ng add @ngrx/signals@latest

// Using npm
npm install @ngrx/signals@latest --save


```

### Defining Signal State

Once installed, defining state with SignalState is straightforward. For example, to manage a list of todos, you can define your state like this:

```typescript
import { signalState } from "@ngrx/signals";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

type TodoState = { todos: Todo[]; selectedTodo: Todo | null };

const todoState = signalState<TodoState>({
  todos: [],
  selectedTodo: null,
});
```

Here, we define a TodoState interface and use the signalState function to initialize it.

### Consuming Signal State

To consume the state, you can access its properties as signals. This ensures read-only access, preventing external manipulation of the state:

```typescript
import { computed, effect } from "@angular/core";

const todosCounter = computed(() => todoState().todos.length);
effect(() => console.log("selectedTodo", todoState().selectedTodo));
```

The signalState function automatically creates signals for each property, allowing you to track changes efficiently. For nested objects, NgRx SignalState employs DeepSignals to provide access to individual properties:

```typescript
const selectedTodo = todoState.selectedTodo;
const selectedTodoId = selectedTodo.id; // Access nested properties
console.log(selectedTodoId());
```

### Updating Signal State

Updating state in SignalState must be done immutably. You can utilize the patchState function to update specific parts of your state easily:

```typescript
import { patchState } from "@ngrx/signals";

patchState(todoState, {
  selectedTodo: {
    id: 1,
    text: "Lorem ipsum",
    completed: false,
  },
});
```

For repetitive updates, you can encapsulate the logic in helper functions to maintain clean and DRY code:

```typescript
import { PartialStateUpdater } from "@ngrx/signals";

function setCompleted(completed: boolean): PartialStateUpdater<TodoState> {
  return (state) => ({
    selectedTodo: {
      ...state.selectedTodo!,
      completed,
    },
  });
}
```

## Example: Managing Component State

Let’s look at how to implement a simple todo application using NgRx SignalState:

```typescript
import { Component, computed, effect } from '@angular/core';
import { patchState, signalState } from '@ngrx/signals';
import { Todo } from '../../models/todo';

type TodoPageState = {
  todos: Todo[];
};

@Component({
  selector: 'app-todo-page',
  standalone: true,
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.css',
})
export class TodoPageComponent {
  private readonly todoPageState = signalState<TodoPageState>({ todos: [] });

  private idCounter = 1;

  protected readonly todos = this.todoPageState.todos;
  protected readonly todoCounter = computed(() => this.todos().length);

  constructor() {
    effect(() => console.log('Todos changed:', this.todoPageState.todos()));
  }

  addTodo(todo: Omit<Todo, 'id'>): void {
    const todos = this.todoPageState.todos();
    patchState(this.todoPageState, {
      todos: [...todos, { ...todo, id: this.idCounter++ }],
    });
  }

  removeTodo(id: number): void {
    const todos = this.todoPageState.todos();
    patchState(this.todoPageState, {
      todos: todos.filter((todo) => todo.id !== id),
    });
  }

  completeTodo(id: number, completed: boolean): void {
    const todos = this.todoPageState.todos();
    patchState(this.todoPageState, {
      todos: todos.map((todo) => (todo.id === id ? { ...todo, completed } : todo)),
    });
  }
}

```

## Example: Managing Service State

In addition to component state, you can manage feature state through services, enhancing code reusability:

```typescript
import { Injectable, computed } from "@angular/core";
import { patchState, signalState } from "@ngrx/signals";
import { Todo } from "../models/todo";

export type TodoState = {
  todos: Todo[];
  selectedTodo: Todo | null;
};

@Injectable({
  providedIn: "root",
})
export class TodoService {
  private readonly todoState = signalState<TodoState>({
    todos: [],
    selectedTodo: null,
  });

  private idCounter = 1;

  public readonly todos = this.todoState.todos;
  public readonly selectedTodo = this.todoState.selectedTodo;
  public readonly todoCounter = computed(() => this.todos().length);

  public add(todo: Omit<Todo, "id">): void {
    patchState(this.todoState, {
      todos: [...this.todoState.todos(), { ...todo, id: this.idCounter++ }],
    });
  }

  public delete(id: number): void {
    const todos = this.todos();
    patchState(this.todoState, {
      todos: todos.filter((todo) => todo.id !== id),
    });
  }

  public select(id: number): void {
    const todos = this.todos();
    patchState(this.todoState, {
      selectedTodo: todos.find((todo) => todo.id === id) || null,
    });
  }

  public complete(completed: boolean): void {
    const selectedTodo = this.selectedTodo();
    if (selectedTodo) {
      patchState(this.todoState, {
        selectedTodo: {
          ...selectedTodo,
          completed: completed,
        },
      });
    }
  }
}
```

## Conclusion

As Angular evolves, the introduction of the Signals API provides a new standard for building reactive applications. NgRx SignalState simplifies state management, making it a valuable tool for developers. Its minimalist approach eliminates unnecessary complexity while providing robust functionality for managing component and service states. By adopting NgRx SignalState, you can enhance your Angular applications with efficient and responsive state management, paving the way for future developments based on this innovative API.
