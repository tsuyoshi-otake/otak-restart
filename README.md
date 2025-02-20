<p align="center">
  <h1 align="center">otak-restart</h1>
  <p align="center">One-click restart for Extension Host and VSCode window.</p>
</p>

---

This extension adds a button to VSCode that lets you instantly restart the Extension Host or reload the entire window with a single click (or via mouse-over). It simplifies the development process by eliminating the need to search for commands in the Command Palette, thereby enhancing efficiency and easing debugging.

# Features

- Adds a customizable status bar button for quick access
- Provides two restart options via one-click:
  - **Restart Extension Host:** Restarts only the Extension Host process
  - **Reload Window:** Reloads the entire VS Code window
- Instantly accessible via a simple click or by hovering over the status bar button

# Usage

![](images/otak-restart.png)

1. **Click or Hover:** Click the status bar button or mouse over it to reveal the restart options.
2. **Select an Operation:** Choose one of the following:
   - **`Restart Extension Host`:** Restarts only the Extension Host process
   - **`Reload Window`:** Performs a full window reload
   - **`Cancel`:** Closes the options without taking any action

You can also trigger the functionality via the Command Palette (F1):

- `Extension Host: Restart Extension Host`
- `Extension Host: Reload Window`
- `Extension Host: Show Restart Options`