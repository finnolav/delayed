# delayed-call
For making delayed function calls.  
Arguments to a delayed function is optional.

## Install

```
$ npm install --save delayed-call
```

## Functions

### create(ms, func, ...args)
Create a delayed call.

```
Arguments
  ms       (number)     Delay in milliseconds.
  func     (function)   The function to be called after the delay.
  ...args  (*)          Optional any number of arguments supplied to the delayed function.

Returns the id (number) of the delayed call.
```

#### Usage
```js
const delayedCall = require('delayed-call');
```

```js
delayedCall.create(500, () => {
    console.log('I am delayed');
});

// Prints "I am delayed" after 500 ms.
```

```js
delayedCall.create(1000, (arg1, arg2) => {
  console.log(arg1 + ' ' + arg2);
}, 'Hello', 'world!');

// Prints "Hello world!" after 1000 ms.
```

### clearById(id)
Clear a single created delayed call.

```
Arguments
  id       (number)     The id of the delayed call.
```

#### Usage
```js
const delayId = delayedCall.create(500, () => {
    console.log('Hello!');
});

delayedCall.clearById(delayId);

// Prints nothing.
// The delayed call is cleared before 500 ms.
```

### clearAll()
Clear all created delayed calls.

#### Usage
```js
delayedCall.create(500, () => {
    console.log('Hello');
});
delayedCall.create(1000, () => {
    console.log('world!');
});

delayedCall.clearAll();

// Prints nothing.
// The delayed calls are cleared before execution.
```


## License

MIT © Finn-Olav Myrvold