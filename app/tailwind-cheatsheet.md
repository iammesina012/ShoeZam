# Tailwind CSS Cheat Sheet

---

## Layout (Flexbox)

| Class | What it does |
|---|---|
| `flex` | Turns element into a flex container — lines up children side by side (row, by default) |
| `flex-col` | Changes flex direction to stack children top-to-bottom instead of side by side |
| `flex-1` | Makes this element grow to fill all remaining space in its flex container |
| `items-center` | Centers children along the **cross axis** (vertical, in a row; horizontal, in a column) |
| `justify-center` | Centers children along the **main axis** (horizontal, in a row; vertical, in a column) |
| `justify-between` | Pushes children to opposite ends, with equal space between them |
| `gap-2` | Adds space *between* flex children (no need for manual margins) |
| `self-center` | Overrides alignment for **one specific child**, instead of all children (like `items-center` but individual) |

---

## Sizing

| Class | What it does |
|---|---|
| `w-full` | Width = 100% of the parent |
| `w-1/2` | Width = 50% of the parent |
| `max-w-sm` | Caps max width at a small preset size |
| `max-w-xs` | Caps max width at an extra-small preset size |
| `max-w-6xl` | Caps max width at a large preset size (good for whole-page containers) |
| `min-h-screen` | Minimum height = full height of the browser window |
| `h-96` | Fixed height (used temporarily, before content decided real height) |

---

## Spacing (Margin & Padding)

| Class | What it does |
|---|---|
| `p-4`, `p-8` | Padding on **all sides** |
| `pl-14` | Padding on the **left** side only |
| `pr-4` | Padding on the **right** side only |
| `mt-5`, `mt-10` | Margin on the **top** only |
| `mx-auto` | Margin left + right set to `auto` — centers a block horizontally (needs a max-width to work) |

---

## Borders & Shape

| Class | What it does |
|---|---|
| `border` | Adds a default 1px border on all sides |
| `border-gray-400` | Sets the border's color |
| `border-t` | Border on the **top** side only (used to fake a horizontal divider line) |
| `rounded-lg` | Rounded corners (medium) |
| `rounded-3xl` | Rounded corners (very rounded, used for the card) |
| `shadow-lg` | Adds a drop shadow (the "floating card" look) |

---

## Typography

| Class | What it does |
|---|---|
| `text-sm`, `text-lg`, `text-xl`, `text-2xl`, `text-3xl`, `text-4xl` | Font size — gets bigger as the name goes up the scale |
| `font-bold` | Makes text bold |
| `text-black`, `text-white`, `text-gray-400` | Text color |
| `text-center` | Centers text horizontally within its own box |
| `placeholder:text-gray-400` | Special "variant" — only styles the *hint text* inside an input, not what you type |

---

## Colors

| Class | What it does |
|---|---|
| `bg-white`, `bg-black`, `bg-gray-200` | Background color (preset names) |
| `bg-[#9C2327]` | Custom **hex color** background — square brackets let you use any exact color not in the presets |
| `text-[#1877F2]` | Same idea, but for text/icon color |
| `hover:bg-[#B32C31]` | Another variant — only applies when the mouse is hovering over the element |
| `hover:bg-gray-100` | Subtle hover effect for white/outlined buttons |
| `accent-black` | Changes the color of native checkboxes/radio buttons when checked |

---

## Positioning

| Class | What it does |
|---|---|
| `relative` | Marks this element as the **anchor point** for any `absolute` children inside it |
| `absolute` | Pulls the element out of normal flow, positioning it exactly — measured from the nearest `relative` parent |
| `top-1/2` | Places the element's top edge at the halfway point of its parent |
| `-translate-y-1/2` | Shifts the element upward by half of **its own** height — used with `top-1/2` for true centering |
| `right-3`, `right-5` | Distance from the right edge of the `relative` parent |

---

## Interaction

| Class | What it does |
|---|---|
| `cursor-pointer` | Forces the hand/pointer cursor on hover (Tailwind removes this by default on buttons) |

---

## Concepts (not exactly classes, but related)

| Term | What it means |
|---|---|
| `className` | React's version of HTML's `class` attribute |
| `useState` | React tool for storing a value that can change (like show/hide password) |
| Ternary (`condition ? A : B`) | Shorthand if/else used inside JSX |
| ` "use client"` | Required at the top of a file when using `useState`/`onClick` in Next.js (marks it as browser-interactive) |
| `Link` (from `next/link`) | Used instead of `<a>` for links to your own pages (faster, no full reload) |
| `next/image` (`Image`) | Used instead of `<img>` — automatically optimizes images |
