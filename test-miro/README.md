# Share Modal

Pop up to enter emails.

## How to use

```js
document.getElementById('email-input').onchange = () => {
  addEmailBox(this.value);
  this.value = null;
}
```

This example will add email box component to panel.