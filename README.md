# dialogsF JavaScript Utility

## Overview

The `dialogsF` function is a reusable JavaScript dialog management utility that creates and controls various modal dialogs (such as alerts, confirmations, prompts, logins, uploads, and informational pop-ups).

It uses native `<dialog>` elements and adds dynamic styling, language localization (German and English), draggable functionality, and caching of dialog instances to optimize performance.

---

## Features

-  **Multi-language support**: English (`en`) and German (`de`)
- **Dialog types**:
  - `myAlert(text)` Displays an alert dialog
  - `myInform(text)` Displays an informational dialog
  - `myConfirm(text, yesCallback, noCallback)` Displays a confirmation dialog
  - `myPrompt(text, value, saveCallback, noCallback)` Displays a prompt input dialog
  - `myLogin(text, saveCallback, noCallback)` Displays a login dialog with username and password fields
  - `myUpload(text, actionUrl, hiddenFields)` Displays an upload dialog with file input
- **Singleton pattern**: Ensures only one instance of the dialog system exists.
- **Draggable dialogs**: Allows users to drag dialogs around the screen.
- **Auto-injected styles**: Generates necessary CSS if not already present.
-  **Hook support**: `setCloseHook(fn)` allows custom logic before closing dialogs.

---

## Example Usage

```html
<script src="dialogsF.js"></script>
<script>
  const dialogs = dialogsF('en');

  dialogs.myAlert("This is an alert!");

  dialogs.myConfirm("Are you sure?", () => {
      console.log("Confirmed!");
  }, () => {
      console.log("Cancelled!");
  });

  dialogs.myPrompt("Enter your name:", "", (value) => {
      console.log("You entered:", value);
  }, () => {
      console.log("Prompt cancelled.");
  });

  dialogs.myLogin("Please log in", (username, password) => {
      console.log("User:", username, "Password:", password);
  }, () => {
      console.log("Login cancelled.");
  });
</script>
```

---

## Localization

You can initialize `dialogsF` with a language parameter:

```js
dialogsF('de'); // for German
dialogsF('en'); // for English
```

---

## Technical Notes

- Uses HTML `<dialog>` API for modal functionality.
- Automatically calculates the **highest z-index** to ensure dialogs appear above other elements.
- Maintains a **cache (`diagCache`)** of dialog types to avoid recreating elements.
- Supports **draggable dialogs** on both mouse and touch devices.
- Includes built-in CSS for consistent styling.

---

## License

This utility is provided as-is and may be freely modified or integrated into your projects.
