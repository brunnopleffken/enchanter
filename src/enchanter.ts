/**
 * ENCHANTER
 * Native JS/TS form wizard plugin for Bootstrap 5
 * Created by Brunno Pleffken Hosti
 * Repository: https://github.com/brunnopleffken/enchanter
 */

declare var bootstrap: any;

interface EnchanterOptions {
    finishSelector: string,
    navItemSelector: string,
    nextSelector: string,
    previousSelector: string
}

interface EnchanterCallbacks {
    onNext: Function,
    onPrevious: Function
}

class Enchanter {
    private callbacks: EnchanterCallbacks;
    private options: EnchanterOptions;

    private container: HTMLElement;
    private tabCurrentIndex: number;
    private tabNextIndex: number;
    private tabPreviousIndex: number;

    constructor(containerSelector: string, options: Object = {}, callbacks: Object = {}) {
        this.options = {
            finishSelector: '[data-enchanter="finish"]',
            navItemSelector: '[data-toggle="tab"]',
            nextSelector: '[data-enchanter="next"]',
            previousSelector: '[data-enchanter="previous"]'
        };

        this.callbacks = {
            onNext: null,
            onPrevious: null,
        };

        Object.assign(this.options, options);
        Object.assign(this.callbacks, callbacks);

        this.container = document.getElementById(containerSelector);
        this.bootstrap();
    }

    public next(): boolean {
        if (this.callbacks.onNext() != null && this.callbacks.onNext() == false) {
            return false;
        }

        let nextElement: Element = this.container.querySelector('.nav .nav-link:nth-child(' + this.tabNextIndex + ')');
        new bootstrap.Tab(nextElement).show();

        this.tabCurrentIndex = this.tabNextIndex;
        this.tabPreviousIndex = this.previousIndex();
        this.tabNextIndex = this.nextIndex();

        if (this.tabCurrentIndex > 1) {
            this.container.querySelector(this.options.previousSelector).removeAttribute('disabled');
        }

        if (this.tabNextIndex == null) {
            this.container.querySelector(this.options.nextSelector).classList.add('d-none');
            this.container.querySelector(this.options.finishSelector).classList.remove('d-none');
        }
    }

    public previous(): boolean {
        if (this.callbacks.onPrevious() != null && this.callbacks.onPrevious() == false) {
            return false;
        }

        let nextElement = this.container.querySelector('.nav .nav-link:nth-child(' + this.tabPreviousIndex + ')');
        new bootstrap.Tab(nextElement).show();

        this.tabCurrentIndex = this.tabPreviousIndex;
        this.tabPreviousIndex = this.previousIndex();
        this.tabNextIndex = this.nextIndex();

        if (this.tabPreviousIndex == null) {
            this.container.querySelector(this.options.previousSelector).setAttribute('disabled', 'disabled');
        }

        if (this.tabNextIndex != null) {
            this.container.querySelector(this.options.nextSelector).classList.remove('d-none');
            this.container.querySelector(this.options.finishSelector).classList.add('d-none');
        }
    }

    private bootstrap() {
        this.tabCurrentIndex = this.currentIndex();
        this.tabNextIndex = this.nextIndex();

        this.container.querySelector(this.options.previousSelector).setAttribute('disabled', 'disabled');
        this.container.querySelector(this.options.finishSelector).classList.add('d-none');

        this.addEventBindings();
    }

    private addEventBindings() {
        this.container.querySelector(this.options.previousSelector).addEventListener('click', () => this.previous());
        this.container.querySelector(this.options.nextSelector).addEventListener('click', () => this.next());
    }

    private getIndex(element: HTMLElement): number {
        return [...element.parentNode.children].findIndex(c => c == element) + 1;
    }

    private currentIndex(): number {
        return this.getIndex(this.container.querySelector('.nav .nav-link.active'));
    }

    private nextIndex(): number {
        let nextIndexCandidate: number = this.tabCurrentIndex + 1;

        if (this.container.querySelector('.nav .nav-link:nth-child(' + nextIndexCandidate + ')') == null) {
            return null;
        }

        return nextIndexCandidate;
    }

    private previousIndex(): number {
        let nextIndexCandidate: number = this.tabCurrentIndex - 1;

        if (this.container.querySelector('.nav .nav-link:nth-child(' + nextIndexCandidate + ')') == null) {
            return null;
        }

        return nextIndexCandidate;
    }
}
