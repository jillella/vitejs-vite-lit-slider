import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
// import { classMap } from 'lit/directives/class-map.js';
import style from './slider.scss?inline';

@customElement('lit-slider')
export class LitSlider extends LitElement {
  @property({ type: Number }) min = 0;
  @property({ type: Number }) max = 100;
  @state() private minVal = this.min;
  @state() private maxVal = this.max;
  @query('.slider__range') private range!: HTMLDivElement;

  static styles = unsafeCSS(style);

  updated(changedProperties: Map<string | number | symbol, unknown>): void {
    if (changedProperties.has('minVal') || changedProperties.has('maxVal')) {
      this.updateRangeStyle();
    }
  }

  private getPercent(value: number): number {
    return Math.round(((value - this.min) / (this.max - this.min)) * 100);
  }

  private updateRangeStyle(): void {
    const minPercent = this.getPercent(this.minVal);
    const maxPercent = this.getPercent(this.maxVal);

    if (this.range) {
      this.range.style.left = `${minPercent}%`;
      this.range.style.width = `${maxPercent - minPercent}%`;
    }
  }

  private handleMinChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = Math.min(Number(input.value), this.maxVal - 1);
    this.minVal = value;
  }

  private handleMaxChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = Math.max(Number(input.value), this.minVal + 1);
    this.maxVal = value;
  }

  render() {
    return html`
      <div class="container">
        <input
          type="range"
          min="${this.min}"
          max="${this.max}"
          .value="${this.minVal.toString()}"
          @input="${this.handleMinChange}"
          class="thumb thumb--left"
          style="z-index: ${this.minVal > this.max - 100 ? '5' : ''}"
        />
        <input
          type="range"
          min="${this.min}"
          max="${this.max}"
          .value="${this.maxVal.toString()}"
          @input="${this.handleMaxChange}"
          class="thumb thumb--right"
        />
        <div class="slider">
          <div class="slider__track"></div>
          <div class="slider__range"></div>
          <div class="slider__left-value">${this.minVal}</div>
          <div class="slider__right-value">${this.maxVal}</div>
        </div>
      </div>
    `;
  }
}
