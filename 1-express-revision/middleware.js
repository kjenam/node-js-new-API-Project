const express = require('express');
const app = express()

const middleware = (req, res, next) => {
  console.log("IM DA MIDDLWARE DAWG")
  console.log(next)
  next()
}

const requestTimeStampLogger = (req, res, next) => {
  const timestamp = new Date()
  console.log(`${timestamp} from ${req.method} to ${req.url}`);
  next()
}

app.use(middleware);
app.use(requestTimeStampLogger);

app.get('/', (req, res) => {
  res.send("YO")
})

app.get('/about', (req, res) => {
  res.send("about")
})


const PORT = 3000
app.listen(PORT, () => {
  console.log("yo the server is up")
})


// Great question — understanding **why `next()` matters** is key to understanding Express.

// Let’s walk through the control flow *exactly* as Express sees it.

// ---

// # 🚦 **Express Control Flow: What Happens on Every Request**

// When a request comes in (example: `GET /about`), Express processes it **in order** through a *pipeline* of functions:

// 1. **Global middleware** (your `app.use(...)`)
// 2. **Route matchers** (`app.get(...)`, `app.post(...)`, etc.)
// 3. **Error handlers** (if something throws or calls `next(err)`)

// Think of it like a conveyor belt: each middleware must either
// 👉 **pass the request on** using `next()`,
// or
// 👉 **stop the chain** by sending a response (`res.send`, `res.json`, etc.).

// ---

// # 🧩 **What Your Middleware Looked Like**

// ```js
// const middleware = () => {
//   console.log("IM DA MIDDLWARE DAWG")
// }
// ```

// What’s missing?

// * It never calls `next()`
// * It never sends a response (e.g., `res.send()`)

// So Express hits your middleware and goes:

// > “Okay… do you want to send a response?
// > No?
// > Are you passing it on with `next()`?
// > No?
// > …Then I will wait. Forever.”

// The request **never reaches your route handler**, so the browser keeps spinning.

// ---

// # 🧠 **Why `next()` Is Important**

// ### ✔ **`next()` tells Express: “I’m done — continue to the next thing.”**

// Example correct middleware:

// ```js
// const middleware = (req, res, next) => {
//   console.log("IM DA MIDDLWARE DAWG");
//   next(); // 🔥 this hands control to the next middleware/route
// };
// ```

// After `next()`, Express moves forward:

// ```
// Incoming Request
//      ↓
// [ middleware ]  --calls next()-->  
//      ↓
// [ route handler ]  --res.send-->  
//      ↓
// Response sent to client
// ```

// ---

// # ❌ **What Was Happening in Your Case**

// Since you didn’t call `next()` or send a response:

// ```
// Incoming Request
//      ↓
// [ middleware ] -- hangs here -->
//      ✋ (never moves on)
// ```

// Nothing else runs.

// Your route handler never executes, so `res.send("...")` never fires.

// ---

// # 🎯 TL;DR — Why `next()` Matters

// * Express works like a pipeline.
// * Middleware must either:

//   * **End the pipeline** (`res.send(...)`), or
//   * **Pass control on** (`next()`).
// * If it does neither, Express doesn’t know what to do → so the request **waits forever**.

// ---

// If you want, I can also illustrate:

// * the difference between global middleware vs. route-level middleware
// * what happens when middleware is async
// * how errors move through the Express pipeline (`next(err)`)

// Just tell me!
