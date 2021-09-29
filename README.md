# Enchanter

Enchanter is a form wizard plugin for Bootstrap 5.

Bootstrap version 5 is on air, and since Bootstrap 5 no longer has jQuery as a dependency, this is a plugin made from scratch using TypeScript. This plugin is still under development and should not be used in production environments (yet).

## How to use

Your `<form>` tag should wrap the `.nav` and `.tab-content` elements. The footer of the form must contain "Back", "Next" and "Finish" buttons with the `data-enchanter` attributes, as shown below:

```html
<form action="" method="post" id="registration">
  <nav>
    <div class="nav nav-pills nav-fill" id="nav-tab">
      <a class="nav-link active" id="step1-tab" data-bs-toggle="tab" href="#step1">Step 1</a>
      <a class="nav-link" id="step2-tab" data-bs-toggle="tab" href="#step2">Step 2</a>
      <a class="nav-link" id="step3-tab" data-bs-toggle="tab" href="#step3">Step 3</a>
    </div>
  </nav>
  <div class="tab-content" id="nav-tabContent">
    <div class="tab-pane fade show active" id="step1">
      Page 1
    </div>
    <div class="tab-pane fade" id="step2">
      Page 2
    </div>
    <div class="tab-pane fade" id="step3">
      Page 3
    </div>
  </div>
  <button type="button" class="btn btn-secondary" data-enchanter="previous">Previous</button>
  <button type="button" class="btn btn-primary" data-enchanter="next">Next</button>
  <button type="submit" class="btn btn-primary" data-enchanter="finish">Finish</button>
</form>
```

Within the `<script>` tag, just declare the class by passing the form ID as a parameter:

```js
// "registration" is the <form> ID
const enchanter = new Enchanter('registration');
```

And that's all!

### Callbacks and validations

Enchanter has support for callbacks, it means you can use `onNext` and `onPrevious` for validations, for example. Our sample uses jQuery Validation for this (yeah, I know, jQuery), but my goal for the future is to create an embedded validation system thar works the same way our sample does.

```js
const wizard = new Enchanter('registration', {}, {
  onNext: () => {
    if (!registrationForm.valid()) {
      formValidate.focusInvalid();
      return false;
    }
  }
});
```

## How to help

We have some improvement items until the final version of Bootstrap 5 comes out:

* Overwrite default options with `new Enchanter('form_id', { option1: 'value', option2: 'value' });`.
* Validate form fields in each step.
* Make navigation compatible by clicking on the `.nav-link`.
* Add option to disable clicks on `.nav-link` (in case the buttons are mandatory).
