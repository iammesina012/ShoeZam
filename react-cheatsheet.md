# React Cheatsheet

## State Variables

```ts
const [value, setValue] = useState(initialValue);
const [value, setValue] = useState(""); // Empty String
const [value, setValue] = useState(false); // Boolean
const [value, setValue] = useState(0); // A number
```

|           Part           |                Meaning                |
| :----------------------: | :-----------------------------------: |
|   `[value, setValue]`    |  Receives two values from `useState`  |
|         `value`          |     Holds the current state value     |
|        `setValue`        |    Function that updates the state    |
| `useState(initialValue)` | Creates a state with an initial value |

### onClick

**Boolean**

```ts
onClick={() => setValue(!value)}
```

**Empty String ("") Ex. Dropdown**

```ts
const [selectedValue, setSelectedValue] = useState("");

value={selectedValue}
onChange={(e) => setSelectedValue(e.target.value)}
```
