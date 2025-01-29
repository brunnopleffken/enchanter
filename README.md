# Enchanter

Enchanter is a native form wizard plugin for Bootstrap 5.

Bootstrap version 5 is on air, and since Bootstrap 5 no longer has jQuery as a dependency, this is a plugin made from scratch using vanilla JavaScript.

![Screenshot 2022-12-02 at 10-41-46 Enchanter](https://user-images.githubusercontent.com/3427344/205306100-7f3c0212-ff7e-495b-9824-01626d69bc69.png)

## How to use

### Installation

Just add to your `package.json`:

```json
"dependencies": {
  "enchanter": "https://github.com/brunnopleffken/enchanter"
}
```

### Configuration

Your `<form>` tag should wrap the `.nav` and `.tab-content` elements. The footer of the form must contain "Back", "Next" and "Finish" buttons with the `data-enchanter` attributes, as shown below:

```html
<form action="" method="post" id="registration">
  <!-- The tab bar -->
  <nav>
    <div class="nav nav-pills nav-fill" id="nav-tab">
      <a class="nav-link active" id="step1-tab" data-bs-toggle="tab" href="#step1">Step 1</a>
      <a class="nav-link" id="step2-tab" data-bs-toggle="tab" href="#step2">Step 2</a>
      <a class="nav-link" id="step3-tab" data-bs-toggle="tab" href="#step3">Step 3</a>
    </div>
  </nav>
  <!-- The content -->
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
  <!-- The buttons -->
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

Enchanter has support for callbacks, it means you can use `onNext` and `onPrevious` for validations, for example. Our sample uses jQuery Validation for this (yeah, I know, jQuery), but my goal for the future is to create an embedded validation system that works the same way our sample does.

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

![Screenshot 2023-03-17 at 13-20-45 Enchanter](https://user-images.githubusercontent.com/3427344/225961488-6b86b3d1-6c38-412b-8e0f-1b9756739b24.png)

## Is it stable?

Well... I've been using Enchanter for more than four years now on almost every form on the [Sinaxys](https://sinaxys.com) adnd [ContaExpert](https://www.contaexpert.com.br) website.

Are you also using Enchanter? Let me know.

## How to help

We have some improvements in progress, if you want to help:

* Overwrite default options with `new Enchanter('form_id', { option1: 'value', option2: 'value' });`.
* Get rid of jquery-validation and implement an out-of-the-box form validation in each step.
* Add option to disable clicks on `.nav-link` in case Next/Prev button clicks are mandatory.
