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
Functions starting with `use` are called Hooks. 

Hooks are more restrictive than other functions. You can only call Hooks at the top of your components (or other Hooks)

React provides a special function called `useState` that you can call from your component to let it “remember” things

`state` as the minimal set of changing data that your app needs to remember

#### two types of “model” data in React: props and state.

- Props are like arguments you pass to a function. They let a parent component pass data to a child component and customize its appearance. 
- State is like a component’s memory. It lets a component keep track of some information and change it in response to interactions. 
- A parent component will often keep some information in state (so that it can change it), and pass it down to child components as their props
#### `useState` hook always return an array of 2 elements:
1) the current state value, e.g. number, string, boolean, object, etc
2) a function to update the state

To collect data from multiple children, or to have two child components communicate with each other, declare the shared state in their parent component instead. The parent component can pass that state back down to the children via `props`.

```
<div>
  <SearchBar 
   // The first 'filterText' is the prop name, and the second is the value being passed to this prop.
   // filterText prop receives the value from the state 'filterText'
    filterText={filterText} 
    inStockOnly={inStockOnly} />
  <ProductTable 
    products={products}
    filterText={filterText}
    inStockOnly={inStockOnly} />
</div>
```
`filterText` prop of `SearchBar` and `ProductTable` will receive the value of the `filterText` state variable.


The `Board` component maintains which squares are filled. You’ll need to create a way for the `Square` to update the Board’s state. Since state is __private__ to a component that defines it, you cannot update the Board’s state directly from `Square`.

When you were passing `onSquareClick={handleClick}`, you were passing the handleClick function down as a `prop`. You were not calling it

you are calling that function right away—in `handleClick(0)`

The `DOM <button>` element’s `onClick` attribute has a special meaning to React because it is a built-in component.

standard practice to name `props` representing events as `onSomething` and to name the corresponding function definitions that handle these events as `handleSomething`.
### Immutability
props are immutable

- Avoiding direct data mutation lets you keep previous versions of the data intact, and reuse them later. Redo
- skip re-rendering a part of the tree that clearly wasn’t affected by it for performance reasons

```
if (squares[i]) { // if the square already has a X or an O 
      return;
    }
```
`squares[i]` is not explicitly a boolean, but its value is interpreted as true or false within `if`statement based on whether it is filled or empty.

## useEffect

- Performs side effects in functional components. Side effects are actions that can't be directly done within the render function, such as data fetching, subscriptions, or manual DOM manipulation.
- Executes code after the component renders, or after specific state changes.
- An empty dependency array tells React that the effect doesn't rely on any values from the component's props or state (i.e., it doesn't care about changes in them). Without an empty dependency array, if the effect involves any logic that might trigger a re-render (e.g., setting state, making API calls), it would create an infinite loop of re-renders.
- `useState` deals with internal component state and re-renders, while `useEffect` handles external interactions and side effects.

# Quick Start

##### How to Distinguish JSX from HTML:
- File Extension: React components using JSX are typically written in .jsx or .js files.
- Context: If the code is inside a React component or function, it's JSX.
- JavaScript Expressions: Look for curly braces `{}` containing JavaScript expressions.
- Attributes: Check for camelCase attributes (e.g., `className` instead of `class`).
- Components: JSX can include custom components, which are not valid HTML elements.

JSX attributes (like `count` and `onClick`) must be valid JavaScript expressions.

`<MyButton count={count} onClick={handleClick} /> `: a JSX element that creates a `<MyButton>` component.

`count={count} `: This assigns a prop called count. The value of the prop is taken from the `count` state variable within the MyApp component.

`onClick={handleClick}` : This assigns a prop called onClick. The value of the prop is the `handleClick` function defined within the MyApp component.
```
function MyButton({ count, onClick }) {
  return (
    <button onClick={onClick}>
      Clicked {count} times
    </button>
  );
}
```

- The MyApp component holds the `count` state and the `handleClick` function.
- MyApp passes the count state and the handleClick function as props to the MyButton component.
- The MyButton component uses the received `count` prop to display the click count and uses the `onClick` prop to handle clicks.

```
const user = {
  name: 'Hedy Lamarr',
  imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
  imageSize: 90,
};

export default function Profile() {
  return (
    <>
      <h1>{user.name}</h1>
      <img
        className="avatar"
        src={user.imageUrl}
        alt={'Photo of ' + user.name}
        //React uses JavaScript object literals to define inline styles. This object literal is passed to 
        //the style attribute of an element. dynamically set styles
        style={{  // inner {} is to create JS object literal
          width: user.imageSize. 
          height: user.imageSize
        }}
      />
    </>
  );
}
```
```
export default function ShoppingList() {
// variable listItems
// .map() function
// arrow (transformation) function that's passed to the .map() 
const listItems = products.map(product =>
  <li key={product.id}>
    {product.title}
  </li>
);

return (
  //JSX element: unordered list (<ul>) containing list items (<li>) generated from the products array.
  <ul>{listItems}</ul>
);
}

//Output:
//Cabbage
//Garlic
//Apple
```
components are typically written as functions

```
function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    // this statement is calling the setCount function and passing it a new value for the count state
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      Clicked {count} times
    </button>
  );
}
```
`setCount` a function provided by the useState hook to update the state value

`( )`: enclose the argument passed to the `setCount` function.
### Conditional styling
```
function ProductRow({ product }) {
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}
```
can't directly apply inline styles to text within JSX. JSX treats text as a primitive value, not an element. To apply styles to text, we need to wrap it in a styled element.

 The `<span>` element is a generic HTML element that acts as a container. it doesn't add any semantic meaning to the text. It's purely for styling.

 - `&&` is like saying, "If everything on the left side is true, give me the last thing on the right side."

If you had `isPacked && '✔' && 'abc'`, the expression would return `'abc'` since that's the last "truthy" value encountered.s

- `{cond ? <A /> : <B />}` means if cond, render `<A />`, otherwise `<B />`.
- `{cond && <A />}` means if cond, render `<A />`, otherwise nothing.

React considers `false` as a “hole” in the JSX tree, just like `null or undefined`, and doesn’t render anything in its place.

can reassign variables defined with `let`
### Destructuring assignment
you don’t need the whole props object itself, so you destructure it into individual props
```
function Avatar({ person, size }) {
  // ...
}
```
equivalent to
```
function Avatar(props) {
  let person = props.person;
  let size = props.size;
  // ...
}
```
`function Avatar({ person, size = 100 }) {}`  The default value is only used if the size prop is missing or if you pass `size={undefined}`. But if you pass `size={null} or size={0}`, the default value will not be used.


`SearchBar` function receives a single argument, which is an object that has four properties: filterText, inStockOnly, onFilterTextChange, and onInStockOnlyChange.

### `children` prop
children prop is a special prop in React. It represents any content that is passed between the opening and closing tags of the Card component when it's used __elsewhere__.

Nested JSX like `<Card><Avatar /></Card>` will appear as `Card` component’s children prop.

```
<Card>
  <h2>My Profile</h2>
  <Avatar person={somePersonObject} size={100} />
  <p>Some information about the user...</p>
</Card>
```
`<h2>, <Avatar>, and <p>` elements are considered the "children" of the Card component

## UI Components
```
<PageLayout>
  <NavigationHeader>
    <SearchBar />
    <Link to="/docs">Docs</Link>
  </NavigationHeader>
  <Sidebar />
  <PageContent>
    <TableOfContents />
    <DocumentationText />
  </PageContent>
</PageLayout>
```
React components are regular JavaScript functions except:

- Their names always begin with a capital letter.
- They return JSX markup.

`export default` prefix is a standard JavaScript syntax (not specific to React)

With `function Profile() { }` you define a JavaScript function with the name `Profile`

Never define a component inside another component! When a child component needs some data from a parent, pass it by `props` instead of nesting definitions.

Props are read-only snapshots in time: every render receives a new version of props.

root component is often defined in `pages/index.js`
```
  Syntax	          Export statement	                  Import statement
  Default	  export default function Button() {}	    import Button from './Button.js';
  Named	    export function Button() {}	            import { Button } from './Button.js';
```
## JSX

JSX is a syntax extension, while React is a JavaScript library

JSX (JavaScript XML) is React's way of writing HTML-like structures within your JavaScript code. JSX is not standard JavaScript; it needs to be compiled into regular JavaScript.  {}  allow you to insert JavaScript expressions directly into JSX.


Inside a React component's `return` statement, anything that looks like HTML but is written within curly braces ({}) is JSX.

`return <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />;`

- `<img />` is written like HTML, but it is actually JavaScript, the syntax is JSX
- To return multiple elements from a component, wrap them with a single parent tag. If you don’t want to add an extra `<div>` to your markup, you can write `<> and </>` instead. This empty tag is called a `Fragment`, which let you group things without leaving any trace in the browser HTML tree. 
- JSX is transformed into plain __JavaScript objects__. You can’t return two objects from a function without wrapping them into an array. This explains why you also can’t return two JSX tags without wrapping them into another tag.
- self-closing tags like <img> must become `<img />`, and wrapping tags like <li>oranges must be written as `<li>oranges</li>`
- if your markup isn’t all on the same line as the return keyword, you must wrap it in a pair of parentheses. 
Without parentheses, any code on the lines after return will be ignored!
```
return (
  <div>
    <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  </div>
);
```
- Objects are also denoted with curly braces, like `{ name: "Hedy Lamarr", inventions: 5 }`. Therefore, to pass a JS object in JSX, you must wrap the object in another pair of curly braces:` person={{ name: "Hedy Lamarr", inventions: 5 }}`.

  {{  }} just an JS object inside the JSX
- when you need an inline style, you pass an object to the `style` attribute
```
export default function TodoList() {
  return (
    <ul style={{
      backgroundColor: 'black',  //camelCase
      color: 'pink'
    }}>
      <li>Improve the videophone</li>
      <li>Prepare aeronautics lectures</li>
      <li>Work on the alcohol-fuelled engine</li>
    </ul>
  );
}
```
- Curly braces { } in JSX don't automatically do string concatenation.

`src={baseUrl + person.imageId + person.imageSize + '.jpg'}`
### Where to use curly braces 
- As text directly inside a JSX tag: `<h1>{name}'s To Do List</h1>` works
- As attributes immediately following the = sign: `src={avatar}`
```
export default function Profile() {
  return (
    <div>
      <Avatar
        size={100}   // {} unnecessary
        person={{ 
          name: 'Katsuko Saruhashi', 
          imageId: 'YfeOqp2'
        }}
      />
```
JSX handle simple values like numbers directly. You only need curly braces when you're passing JavaScript expressions that need to be evaluated before being used as attribute values.
## Rendering lists
```
// names as keys, values are nested objects themselves
// Each of the values (tea and coffee) is itself an object with its own key-value pairs
const drinks = {
  tea: {
    part: 'leaf',
    caffeine: '15–70 mg/cup',
    age: '4,000+ years'
  },
  coffee: {
    part: 'bean',
    caffeine: '80–185 mg/cup',
    age: '1,000+ years'
  }
};

function Drink({ name }) {
  const info = drinks[name];  
  return (
    <section>
      <h1>{name}</h1>
      <dl>
        <dt>Part of plant</dt>
        <dd>{info.part}</dd>
        <dt>Caffeine content</dt>
        <dd>{info.caffeine}</dd>
        <dt>Age</dt>
        <dd>{info.age}</dd>
      </dl>
    </section>
  );
}

export default function DrinkList() {
  return (
    <div>
      <Drink name="tea" />
      <Drink name="coffee" />
    </div>
  );
}
```
Arrow functions implicitly return the expression right after `=>`, so you didn’t need a return statement:
```
const listItems = chemists.map(person =>
  <li>...</li> // Implicit return! 
);
```
```
const listItems = chemists.map(person => { // Curly brace, must return
  return <li>...</li>;
});
```
JSX elements directly inside a `map()` call always need keys!
#### Displaying several DOM nodes for each list item
The short `<>...</>` Fragment syntax won’t let you pass a key, so you need to either group them into a single `<div>`, or use the slightly longer and more explicit `<Fragment>` syntax:
```
import { Fragment } from 'react';

// ...

const listItems = people.map(person =>
  <Fragment key={person.id}>
    <h1>{person.name}</h1>
    <p>{person.bio}</p>
  </Fragment>
);
```

- Strict Mode has no effect in production, so it won’t slow down the app for your users. To opt into Strict Mode, you can wrap your root component into `<React.StrictMode>`.
- Local mutation: Your component’s little secret 
- event handlers are defined inside your component, they don’t run during rendering! So event handlers don’t need to be pure.
- Strive to express your component’s logic in the JSX you return. When you need to “change things”, you’ll usually want to do it in an event handler. As a last resort, you can `useEffect`.

Leaf components are near the bottom of the tree and have no child components and are often frequently re-rendered.
### Module Dependency Tree -- don't understand
## Responding to events
- Built-in components like `<button>` only support built-in browser events like `onClick`
- Event handlers are your own functions that will be triggered in response to interactions like clicking
- first define a function (inside a component, e.g. `handleClick()`) and then pass it as a prop to the appropriate JSX tag

e.g. `onClick={handleClick}, onMouseEnter={handleMouseEnter}` or arrow function

```
<button onClick={() => {
  alert('You clicked me!');
}}>

passing a function (correct)	        calling a function (incorrect)
<button onClick={handleClick}>	       <button onClick={handleClick()}>
<button onClick={() => alert('...')}>	  <button onClick={alert('...')}>
```
### Event propagation
Event handlers receive an `event object` as their only argument. usually called `e`
```
export default function Signup() {
  return (
    <form onSubmit={e => {
      //e.preventDefault();
      alert('Submitting!');
    }}>
      <input />
      <button>Send</button>
    </form>
  );
}
```
`<form>` submit event: when a button inside of it is clicked, will reload the whole page by default
- `e.stopPropagation()` stops the event handlers attached to the tags above from firing.
- `e.preventDefault()` prevents the default browser behavior for the few events that have it.
```
return (
    <button onClick={handleClick}>
      Toggle the lights
    </button>
  );
  // or wrap the call into another function, like <button onClick={() => handleClick()}>:
  return (
    <button onClick={() => handleClick()}>
      Toggle the lights
    </button>
  );
  ```
  ```
  export default function ColorSwitch({  // 1st line to be executed
  onChangeColor
}) {
  return (     // 2nd line to be executed
    <button onClick={e => {
      e.stopPropagation();
      onChangeColor();
    }}>
      Change color
    </button>
  );
}
  ```
- props are like messages passed between components. `onChangeColor` as a prop, meaning it's expected to come from a parent component
- No Function Body: `ColorSwitch` doesn't define an `onChangeColor` function inside itself. assuming it exists outside.
- `ColorSwitch component` is to trigger a change. It doesn't change the color directly; it relies on the `onChangeColor` function provided by the parent component to do that.
## State
The `[` and `]` syntax here is called array destructuring and it lets you read values from an array. The array returned by useState always has exactly two items.
```
// multiple state variables
import { useState } from 'react';
import { sculptureList } from './data.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  function handleNextClick() {
    setIndex(index + 1);
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handleNextClick}>
        Next
      </button>
      <h2>
        <i>{sculpture.name} </i> 
        by {sculpture.artist}
      </h2>
      <h3>  
        ({index + 1} of {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? 'Hide' : 'Show'} details
      </button>
      //if showMore is true, the paragraph will be rendered.
      {showMore && <p>{sculpture.description}</p>}
      <img 
        src={sculpture.url} 
        alt={sculpture.alt}
      />
    </>
  );
}
```
state is fully private to the component declaring it
```
import { useState } from 'react';

export default function Form() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  function handleFirstNameChange(e) {
    setFirstName(e.target.value);
  }

  function handleLastNameChange(e) {
    setLastName(e.target.value);
  }

  function handleReset() {
    setFirstName('');
    setLastName('');
  }

  return (
    <form onSubmit={e => e.preventDefault()}>
      <input
        placeholder="First name"
        value={firstName}
        onChange={handleFirstNameChange}
      />
      <input
        placeholder="Last name"
        value={lastName}
        onChange={handleLastNameChange}
      />
      <h1>Hi, {firstName} {lastName}</h1>
      <button onClick={handleReset}>Reset</button>
    </form>
  );
}
```
```
export default function FeedbackForm() {
  const [isSent, setIsSent] = useState(false);
  const [message, setMessage] = useState('');

  if (isSent) {   // if true, render Thank you
    return <h1>Thank you!</h1>;
  } else {      // if false
    return (
      <form onSubmit={e => {  //defines an event handler that gets called when the form is submitted
        e.preventDefault();
        alert(`Sending: "${message}"`);
        setIsSent(true);
      }}>
        <textarea
          placeholder="Message"
          //Sets the value of the text area to the current value of the message state variable
          value={message}  
          //event handler that updates the message state variable whenever the user types in the text area.
          onChange={e => setMessage(e.target.value)}
        />
        <br />
        <button type="submit">Send</button>
      </form>
    );
  }
}
```
A `state` variable is only necessary to keep information between re-renders of a component. Within a single event handler, a regular variable will do fine. 
## Render and Commit