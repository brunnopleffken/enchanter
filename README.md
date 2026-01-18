# Enchanter

Enchanter is a lightweight vanilla JS form wizard plugin for Bootstrap 5 — with no dependencies!

![Screenshot 2022-12-02 at 10-41-46 Enchanter](https://user-images.githubusercontent.com/3427344/205306100-7f3c0212-ff7e-495b-9824-01626d69bc69.png)

## Quick Start

### 1. Installation

Add Enchanter to your `package.json`:

```json
{
  "dependencies": {
    "enchanter": "https://github.com/brunnopleffken/enchanter"
  }
}
```

### 2. Basic Setup

Create your form with three main components:

**Step 1: Create the navigation tabs**
```html
<nav class="nav nav-pills nav-fill" id="nav-tab">
  <a class="nav-link active" id="step1-tab" data-bs-toggle="tab" href="#step1">Step 1</a>
  <a class="nav-link" id="step2-tab" data-bs-toggle="tab" href="#step2">Step 2</a>
  <a class="nav-link" id="step3-tab" data-bs-toggle="tab" href="#step3">Step 3</a>
</nav>
```

**Step 2: Add your form content using the `tab-pane` classes**
```html
<div class="tab-content" id="nav-tabContent">
  <div class="tab-pane fade show active" id="step1">
    <!-- Step 1 content here -->
  </div>
  <div class="tab-pane fade" id="step2">
    <!-- Step 2 content here -->
  </div>
  <div class="tab-pane fade" id="step3">
    <!-- Step 3 content here -->
  </div>
</div>
```

**Step 3: Add navigation buttons**
```html
<button type="button" class="btn btn-secondary" data-enchanter="previous">Previous</button>
<button type="button" class="btn btn-primary" data-enchanter="next">Next</button>
<button type="submit" class="btn btn-primary" data-enchanter="finish">Finish</button>
```

**Complete Example:**
```html
<form action="" method="post" id="registration">
  <!-- Navigation tabs -->
  <nav class="nav nav-pills nav-fill" id="nav-tab">
    <a class="nav-link active" id="step1-tab" data-bs-toggle="tab" href="#step1">Step 1</a>
    <a class="nav-link" id="step2-tab" data-bs-toggle="tab" href="#step2">Step 2</a>
    <a class="nav-link" id="step3-tab" data-bs-toggle="tab" href="#step3">Step 3</a>
  </nav>

  <!-- Form content -->
  <div class="tab-content" id="nav-tabContent">
    <div class="tab-pane fade show active" id="step1">Page 1</div>
    <div class="tab-pane fade" id="step2">Page 2</div>
    <div class="tab-pane fade" id="step3">Page 3</div>
  </div>

  <!-- Navigation buttons -->
  <button type="button" class="btn btn-secondary" data-enchanter="previous">Previous</button>
  <button type="button" class="btn btn-primary" data-enchanter="next">Next</button>
  <button type="submit" class="btn btn-primary" data-enchanter="finish">Finish</button>
</form>
```

### 3. Initialize Enchanter

Add this to your JavaScript file:

```js
// Pass the form's ID attribute as a parameter
const enchanter = new Enchanter('registration');
```

That's it! Your form wizard is now ready to use.

## Advanced Features

### Add form validation

Validate form data before moving to the next step using the `onNext` callback:

```js
const wizard = new Enchanter('registration', {}, {
  onNext: () => {
    // Perform validation here
    if (!formIsValid()) {
      return false; // Stay on current step
    }
    return true; // Proceed to next step
  }
});
```

**Example with jQuery Validation Plugin:**

> ⚠️ This example requires [jQuery](https://jquery.com/) and [jQuery Validation](https://jqueryvalidation.org/) plugin to be installed.

```js
const wizard = new Enchanter('registration', {}, {
  onNext: () => {
    if (!$('#registration').valid()) {
      return false;
    }
  }
});
```

### Hide the Navigation Bar

Hide the step tabs to prevent direct navigation between steps:

```js
// Pass the form ID as the first parameter
const wizard = new Enchanter('registration', {
  hideNav: true
});
```

Use this if you want to:
- Enforce sequential step navigation
- Implement a custom progress bar
- Create a custom title display

## Project status

Enchanter is **battle-tested and production-ready**. It has been actively used in production for **4+ years** across mission-critical applications:

- **[Sinaxys](https://sinaxys.com)** — A healthcare platform handling sensitive data and medical workflows;
- **[ContaExpert](https://www.contaexpert.com.br)** — An accounting software managing financial records, employees and payrolls for thousands of businesses.

The codebase is stable, well-maintained, and trusted by companies processing real, mission-critical business data every single day.

## Roadmap

I'm planning these improvements:

- [ ] Merge default options with user options: `new Enchanter('form_id', { option1: 'value', option2: 'value' })`
- [ ] Built-in form validation without external plugins
- [ ] Option to disable direct clicks on `.nav-link` (enforce Next/Prev buttons)

## Contributing

Found a bug? Have a suggestion? I'd love to hear from you! Feel free to open an issue or contribute to the project.

Are you using Enchanter? Let me know on GitHub!
