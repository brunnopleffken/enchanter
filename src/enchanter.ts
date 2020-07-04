/**
 * ENCHANTER
 * Native JS/TS form wizard plugin for Bootstrap 5
 * Created by Brunno Pleffken Hosti
 * Repository: https://github.com/brunnopleffken/enchanter
 */

declare var bootstrap: any;

interface EnchanterOptions {
    enableFormValidation: boolean,
    finishSelector: string,
    navItemSelector: string,
    nextSelector: string,
    previousSelector: string
}

class Enchanter {
    private container: HTMLElement;
    private navItem: NodeListOf<HTMLElement>;
    private options: EnchanterOptions;
    private tabCurrentIndex: number;
    private tabNextIndex: number;
    private tabPreviousIndex: number;

    constructor(containerSelector: string) {
        this.container = document.getElementById(containerSelector);
        this.bootstrap();
    }

    public next(): boolean {
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

        return true;
    }

    public previous(): boolean {
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

        return true;
    }

    private bootstrap() {
        this.options = {
            enableFormValidation: true,
            finishSelector: '[data-enchanter="finish"]',
            navItemSelector: '[data-toggle="tab"]',
            nextSelector: '[data-enchanter="next"]',
            previousSelector: '[data-enchanter="previous"]'
        };

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
