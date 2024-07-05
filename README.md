# My Notes on Learning React
Along with `trouble-shooting.md`, a debugging record. 

Some of the bugs, small as they were, took me hours, if not longer.
## Structure of full-stack app
```
├── frontend  
│   └── src  
│       ├── components  
│       │   ├── Navigation.js  
│       │   ├── Footer.js  
│       │   ├── Home.js  
│       │   └── About.js  
│       ├── App.js  
│       └── index.js  
└── backend
    └── src
        ├── main
        │   └── java
        │       └── com
        │           └── example
        │               ├── Application.java
        │               ├── controller
        │               │   └── TimeController.java
        │               └── model
        │                   └── Time.java
```
- components: reusable components that make up your user interface.
- Navigation.js: The navigation component for your application (e.g., header, menu).
- App.js: The root component of your React application. It typically renders the main layout and routes.
- index.js: The entry point for your React application. It usually renders the App component.

- Application.java: The Spring Boot application class, annotated with @SpringBootApplication. This is the entry point for your application.
# Questions
- No way to format nicely the whole js file in VScode? 
- How to use `React Developer Tools`, Chrome extension? 
# Tutorial Tic-Tac-Toe
### App.js creates a component
a component is a piece of reusable code to render, manage, and update the UI elements
```
export default function Square() {
  return <button className="square">X</button>;
}
```
`<button>` is a `JSX` element. A JSX element is a combination of JavaScript code and HTML tags that describes what you’d like to display. 

`className="square"` is a button property or `prop` that tells `CSS` how to style the button.

`components` need to return a single `JSX` element and not multiple adjacent JSX elements like two `buttons`. To fix this you can use Fragments (`<>` and `</>`) to wrap multiple adjacent JSX elements

unlike the standard HTML elements like `div`, custom components `Board` and `Square` should begin with a capital letter.
### To “remember” things, components use state
React provides a special function called `useState` that you can call from your component to let it “remember” things

`useState` hook always return an array of 2 elements:
1) the current state value, e.g. number, string, boolean, object, etc
2) a function to update the state

To collect data from multiple children, or to have two child components communicate with each other, declare the shared state in their parent component instead. The parent component can pass that state back down to the children via `props`.

The `Board` component maintains which squares are filled. You’ll need to create a way for the `Square` to update the Board’s state. Since state is __private__ to a component that defines it, you cannot update the Board’s state directly from `Square`.

When you were passing `onSquareClick={handleClick}`, you were passing the handleClick function down as a `prop`. You were not calling it

you are calling that function right away—in `handleClick(0)`

The `DOM <button>` element’s `onClick` attribute has a special meaning to React because it is a built-in component.

standard practice to name `props` representing events as `onSomething` and to name the corresponding function definitions that handle these events as `handleSomething`.
### Immutability
- Avoiding direct data mutation lets you keep previous versions of the data intact, and reuse them later. Redo
- skip re-rendering a part of the tree that clearly wasn’t affected by it for performance reasons

```
if (squares[i]) { // if the square already has a X or an O 
      return;
    }
```
`squares[i]` is not explicitly a boolean, but its value is interpreted as true or false within `if`statement based on whether it is filled or empty.