# Backend Cheatsheet

---

## Retrieving and Displaying Data (Add to Cart button)

1. Get product first from Supabase to product page

```javascript
const { data, error } = await supabase.from("products").select("*").eq("id", id).single();
```

2. Pass the information into a component

```javascript
type AddToBagButtonProps = {
  product: any;
};
```

`export default function AddToBagButton({ product }: AddToBagButtonProps) {}`

`<AddToBagButton product={data} />`

3. Enable interaction with components

`"use client";`

Always need when the page needs interactivity

```javascript
<button
  type="button"
  onClick={() => {
    console.log(product);
  }}
>
  Add to Bag
</button>
```

4. Save the product to localStorage

`localStorage.setItem("shoppingBag", JSON.stringify(product));`

Converts the javascript object into text

5. Retrieve the product from localStorage

```javascript
const savedProduct = localStorage.getItem("shoppingBag");

if (savedProduct) {
  const product = JSON.parse(savedProduct);
}
```

Converts text into javascript object

6. Define localStorage (useEffect)

```javascript
useEffect(() => {
  const savedProduct = localStorage.getItem("shoppingBag");

  if (savedProduct) {
    const product = JSON.parse(savedProduct);
  }
}, []);
```

7. Keeping the product

`const [product, setProduct] = useState<any>(null);`

8. Display the product

### Product Name

`<p>{product?.name}</p>`

### Product Image

```javascript
{
  product && <Image src={product.image_url} alt={product.name} width={100} height={100} />;
}
```

- product && prevents an error where the image temporarily receive an empty src. This means render this part if the product exists, else, no display.

### Product Price

```javascript
product?.price?.toLocaleString("en-PH", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
```

### Total Price

```javascript
{
  (product.price * quantity).toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
```

### Delete button

```javascript
onClick={() => {
  localStorage.removeItem("shoppingBag");
  setProduct(null);
}}
```
