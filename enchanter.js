"use strict";

/**
 * ENCHANTER
 * Native JS/TS form wizard plugin for Bootstrap 5
 * Created by Brunno Pleffken Hosti
 * Repository: https://github.com/brunnopleffken/enchanter
 */

class Enchanter {
    #elements = {};

    constructor(containerSelector, options = {}, callbacks = {}) {
        const container = document.getElementById(containerSelector);

        this.options = {
            finishSelector: '[data-enchanter="finish"]',
            navItemSelector: '[data-toggle="tab"]',
            nextSelector: '[data-enchanter="next"]',
            previousSelector: '[data-enchanter="previous"]'
        };

        this.callbacks = {
            onNext: null,
            onPrevious: null,
            onFinish: null
        };

        Object.assign(this.options, options);
        Object.assign(this.callbacks, callbacks);

        if (!container) {
            throw new Error(`Enchanter: container element with ID "${containerSelector}" not found`);
        }

        this.container = container;
        this.cacheElements();
        this.bootstrap();
    }

    cacheElements() {
        this.#elements = {
            previous: this.container.querySelector(this.options.previousSelector),
            next: this.container.querySelector(this.options.nextSelector),
            finish: this.container.querySelector(this.options.finishSelector)
        };
    }

    next() {
        if (this.callbacks.onNext != null && this.callbacks.onNext() == false) {
            return false;
        }

        let nextElement = this.container.querySelector('.nav .nav-link:nth-child(' + this.tabNextIndex + ')');
        new bootstrap.Tab(nextElement).show();

        this.tabCurrentIndex = this.tabNextIndex;
        this.tabPreviousIndex = this.previousIndex();
        this.tabNextIndex = this.nextIndex();

        if (this.tabCurrentIndex > 1) {
            this.#elements.previous.removeAttribute('disabled');
        }

        if (this.tabNextIndex == null) {
            this.#elements.next.classList.add('d-none');
            this.#elements.finish.classList.remove('d-none');
        }
    }

    previous() {
        if (this.callbacks.onPrevious != null && this.callbacks.onPrevious() == false) {
            return false;
        }

        let nextElement = this.container.querySelector('.nav .nav-link:nth-child(' + this.tabPreviousIndex + ')');
        new bootstrap.Tab(nextElement).show();

        this.tabCurrentIndex = this.tabPreviousIndex;
        this.tabPreviousIndex = this.previousIndex();
        this.tabNextIndex = this.nextIndex();

        if (this.tabPreviousIndex == null) {
            this.#elements.previous.setAttribute('disabled', 'disabled');
        }

        if (this.tabNextIndex != null) {
            this.#elements.next.classList.remove('d-none');
            this.#elements.finish.classList.add('d-none');
        }
    }

    finish() {
        if (this.callbacks.onFinish != null && this.callbacks.onFinish() == false) {
            return false;
        }

        return true;
    }

    bootstrap() {
        this.tabCurrentIndex = this.currentIndex();
        this.tabNextIndex = this.nextIndex();
        this.#elements.previous.setAttribute('disabled', 'disabled');
        this.#elements.finish.classList.add('d-none');
        this.addEventBindings();
    }

    addEventBindings() {
        this.#elements.previous.addEventListener('click', () => this.previous());
        this.#elements.next.addEventListener('click', () => this.next());
        this.#elements.finish.addEventListener('click', () => this.finish());
    }

    getIndex(element) {
        return [...element.parentNode.children].findIndex(c => c == element) + 1;
    }

    currentIndex() {
        return this.getIndex(this.container.querySelector('.nav .nav-link.active'));
    }

    nextIndex() {
        let nextIndexCandidate = this.tabCurrentIndex + 1;

        if (this.container.querySelector('.nav .nav-link:nth-child(' + nextIndexCandidate + ')') == null) {
            return null;
        }

        return nextIndexCandidate;
    }

    previousIndex() {
        let nextIndexCandidate = this.tabCurrentIndex - 1;

        if (this.container.querySelector('.nav .nav-link:nth-child(' + nextIndexCandidate + ')') == null) {
            return null;
        }

        return nextIndexCandidate;
    }
}
