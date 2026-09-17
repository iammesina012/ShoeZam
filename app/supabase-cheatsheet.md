# Supabase Cheat Sheet

---

## Library Imports

`import { createClient } from "@supabase/supabase-js";`

Creates connection to Supabase after having Project URL and Anon Key

`import { supabase } from "@/lib/supabaseClient";`

Current file that imported this can access Supabase

---

## State Hooks

`const [showPassword, setShowPassword] = useState(false);` or `const [fullName, setFullName] = useState("");`

Setting a default value for the specific variable

`const router = useRouter();`

Navigation without reloading the page

## Functions

`const handleRegister = async () => {}`

Where we store a whole block of instructions for handling something (specifically register)

- `async` means to wait for something (Supabase)
- `() =>` called "arrow function", means "leads to"

### Using Supabase's function to send user's email and password to Supabase to create a new account.

```javascript
const { data, error } = await supabase.auth.signUp({
  email: email,
  password: password,
});
```

- `const { data, error } =` Supabase response if it worked or failed. `data` means new used saved to auth.users table, and `error` means detailes of what went wrong.
- `await` means pauses this line until Supabase responds
- `supabase.auth.signUp({...});` Supabase's function for creating new accounts
- `{ email: email, password: password }` The information Supabase needs

```javascript
const { error } = await supabase.auth.signInWithPassword({
  email,
  password,
});
```

- `supabase.auth.signInWithPassword({...});` sends the information typed by user to Supabase Auth, to check the registered user or credentials.

## If/Else Statements

### If something do not match...

```javascript
if (password !== confirmPassword) {
  alert("Passwords do not match");
  return;
}
```

- `return;` means stopping that function to prevent continuing to the next block of code.

### If theres an error and else...

```javascript
if (error) {
  alert(error.message);
} else {
  alert("Account created! Check your email to confirm.");
}
```

### If Email and Password is empty...

```javascript
if (!email) {
  alert("Please enter your email.");
  return;
} else if (!password) {
  alert("Please enter your password.");
  return;
}
```
### If credentials are incorrect...

```javascript
if (error) {
      alert("Incorrect email or password. Please try again.");
      return;
    }

    alert("Successfully Logged In. Welcome back!");
    router.push("/");
```