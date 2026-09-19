# Tailwind CSS Cheat Sheet

---

## Layout

| Class             | Simple meaning                    |
| ----------------- | --------------------------------- |
| `flex`            | Places children in a row          |
| `flex-col`        | Stacks children vertically        |
| `flex-1`          | Fills available space             |
| `items-center`    | Centers children vertically       |
| `justify-center`  | Centers children horizontally     |
| `justify-between` | Pushes children to opposite sides |
| `gap-2`           | Adds space between children       |
| `self-center`     | Centers one child                 |

---

## Width and Height

| Class           | Simple meaning                      |
| --------------- | ----------------------------------- |
| `w-full`        | Uses the full parent width          |
| `w-1/2`         | Uses half the parent width          |
| `w-3/5`         | Uses 60% of the parent width        |
| `w-[550px]`     | Sets width to exactly 550px         |
| `max-w-xl`      | Prevents content becoming too wide  |
| `h-[400px]`     | Sets height to exactly 400px        |
| `min-h-[450px]` | Minimum height is 450px             |
| `min-h-screen`  | Minimum height is the screen height |
| `h-auto`        | Height adjusts automatically        |

---

## Spacing

| Class     | Simple meaning                  |
| --------- | ------------------------------- |
| `p-4`     | Padding on all sides            |
| `px-8`    | Left and right padding          |
| `py-8`    | Top and bottom padding          |
| `pl-4`    | Left padding                    |
| `pr-4`    | Right padding                   |
| `mt-5`    | Top margin                      |
| `mx-auto` | Centers an element horizontally |

---

## Borders and Shape

| Class             | Simple meaning               |
| ----------------- | ---------------------------- |
| `border`          | Adds a 1px border            |
| `border-2`        | Adds a 2px border            |
| `border-blue-500` | Makes the border blue        |
| `rounded-lg`      | Slightly rounded corners     |
| `rounded-3xl`     | Very rounded corners         |
| `rounded-full`    | Makes a circle or pill shape |
| `shadow-lg`       | Adds a large shadow          |

---

## Text

| Class                       | Simple meaning                   |
| --------------------------- | -------------------------------- |
| `text-sm`                   | Small text                       |
| `text-lg`                   | Large text                       |
| `text-3xl`                  | Very large text                  |
| `font-normal`               | Normal text weight               |
| `font-semibold`             | Semi-bold text                   |
| `font-bold`                 | Bold text                        |
| `text-black`                | Black text                       |
| `text-white`                | White text                       |
| `text-center`               | Centers text                     |
| `leading-tight`             | Reduces space between text lines |
| `placeholder:text-gray-400` | Changes placeholder color        |

---

## Colors

| Class               | Simple meaning              |
| ------------------- | --------------------------- |
| `bg-white`          | White background            |
| `bg-black`          | Black background            |
| `bg-gray-200`       | Gray background             |
| `bg-[#9C2327]`      | Custom background color     |
| `text-[#1877F2]`    | Custom text color           |
| `hover:bg-gray-100` | Background changes on hover |
| `accent-black`      | Changes checkbox color      |

---

## Positioning

| Class      | Simple meaning                                                 |
| ---------- | -------------------------------------------------------------- |
| `relative` | Makes this element an anchor for absolute children             |
| `absolute` | Positions an element freely inside the nearest relative parent |
| `top-1/2`  | Moves the top edge to the halfway point                        |
| `left-1/2` | Moves the left edge to the halfway point                       |
| `right-5`  | Moves an element 5 spacing units from the right                |
| `z-10`     | Places an element above lower layers                           |

---

## Moving and Transforming

| Class            | Simple meaning                             |
| ---------------- | ------------------------------------------ |
| `translate-x-6`  | Moves right                                |
| `-translate-x-6` | Moves left                                 |
| `translate-y-6`  | Moves down                                 |
| `-translate-y-6` | Moves up                                   |
| `scale-110`      | Makes an element 10% larger                |
| `scale-x-[-1]`   | Flips an element horizontally              |
| `rotate-6`       | Rotates clockwise                          |
| `-rotate-6`      | Rotates counterclockwise                   |
| `object-contain` | Keeps the whole image visible              |
| `shrink-0`       | Prevents a flex item from becoming smaller |
| `max-w-none`     | Removes the default maximum width          |

---

## Interaction

| Class            | Simple meaning                |
| ---------------- | ----------------------------- |
| `cursor-pointer` | Shows a hand cursor           |
| `hover:`         | Applies a style when hovering |
| `focus:`         | Applies a style when focused  |

## Grid and Responsive Layout

| Class                      | Simple meaning                                    |
| -------------------------- | ------------------------------------------------- |
| `grid`                     | Enables CSS Grid layout                           |
| `grid-cols-1`              | Creates one column                                |
| `sm:grid-cols-2`           | Creates two columns from 640px                    |
| `lg:grid-cols-4`           | Creates four columns from 1024px                  |
| `max-w-[1440px]`           | Limits the width to 1440px                        |
| `lg:grid-cols-[240px_1fr]` | Creates a 240px sidebar and flexible content area |
| `gap-4`                    | Adds spacing between grid items                   |
| `gap-6`                    | Adds larger spacing between grid items            |

---

## Cards and Hover Effects

| Class                   | Simple meaning                                      |
| ----------------------- | --------------------------------------------------- |
| `group`                 | Allows child elements to respond to parent hover    |
| `overflow-hidden`       | Keeps content inside the element’s boundaries       |
| `rounded-2xl`           | Adds large rounded corners                          |
| `shadow-sm`             | Adds a small shadow                                 |
| `transition`            | Smoothly animates changes                           |
| `duration-300`          | Makes the animation last 300ms                      |
| `hover:-translate-y-1`  | Moves the element slightly upward on hover          |
| `hover:shadow-lg`       | Adds a larger shadow on hover                       |
| `group-hover:scale-105` | Enlarges a child to 105% when the parent is hovered |
| `line-clamp-2`          | Limits text to two lines                            |
| `min-h-12`              | Sets a minimum height                               |

---

## Forms and Focus States

| Class                     | Simple meaning                                  |
| ------------------------- | ----------------------------------------------- |
| `appearance-none`         | Removes the browser’s default select styling    |
| `outline-none`            | Removes the browser’s default focus outline     |
| `focus:border-black`      | Changes the border to black when focused        |
| `focus:ring-2`            | Adds a focus ring                               |
| `focus:ring-[#9C2327]/20` | Adds a transparent red focus ring               |
| `pointer-events-none`     | Prevents an element from receiving mouse events |
| `pr-10`                   | Adds right padding for an icon                  |

---

## React and Next.js

| Term                | Simple meaning                    |
| ------------------- | --------------------------------- |
| `className`         | Adds CSS classes in React         |
| `useState`          | Stores changing data              |
| `condition ? A : B` | Short if/else statement           |
| `"use client"`      | Allows state and click events     |
| `Link`              | Navigates between pages           |
| `Image`             | Optimized Next.js image component |
