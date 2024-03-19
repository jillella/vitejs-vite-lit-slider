import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
// import { classMap } from 'lit/directives/class-map.js';
import style from './slider.scss?inline';

@customElement('lit-slider')
export class LitSlider extends LitElement {
  @property({ type: Number }) min = 0;
  @property({ type: Number }) max = 100;
  @property({ type: Number }) step = 1;
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
    let value = Number(input.value);
    this.minVal = Math.max(value, this.min);
    this.preventOverlap('min');
  }
  
  private handleMaxChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = Number(input.value);
    this.maxVal = Math.min(value, this.max);
    this.preventOverlap('max');
  }

  private preventOverlap(changedThumb: string): void {
    if (changedThumb === 'min' && this.minVal > this.maxVal - this.step) {
      // If moving the min thumb past the max thumb - step, push the max thumb ahead
      this.maxVal = Math.min(this.minVal + this.step, this.max);
    } else if (changedThumb === 'max' && this.maxVal < this.minVal + this.step) {
      // If moving the max thumb before the min thumb + step, pull the min thumb back
      this.minVal = Math.max(this.maxVal - this.step, this.min);
    }
  
    this.updateRangeStyle();
  }

  render() {
    return html`
      <div class="container">
        <input
          type="range"
          min="${this.min}"
          max="${this.max}"
          step="${this.step}"
          .value="${this.minVal.toString()}"
          @input="${this.handleMinChange}"
          class="thumb thumb--left"
          style="z-index: ${this.minVal > this.max - 100 ? '5' : ''}"
        />
        <input
          type="range"
          min="${this.min}"
          max="${this.max}"
          step="${this.step}"
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
