import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { StudsFieldset } from '../fieldset';
import { FieldsetProps } from '../fieldset';

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: 'Studs/Fieldset',
  tags: ['autodocs'],
  render: (args: any) => html`<studs-fieldset
      label=${ifDefined(args.label)}
      direction=${ifDefined(args.direction)}
    >
    <div>
    <input
      type="checkbox"
      id="coding"
      name="interest"
      value="coding"
      checked
    />
    <label for="coding">Coding</label>
  </div>
  <div>
    <input type="checkbox" id="music" name="interest" value="music" />
    <label for="music">Music</label>
  </div>
  </studs-fieldset>
  `,
  argTypes: {
    label: { control: 'text' },
    direction: { control: 'inline-radio', options: ['vertical', 'horizontal'] },
  },
} satisfies Meta<FieldsetProps>;

export default meta;
type Story = StoryObj<FieldsetProps>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Default: Story = {
  args: {
    label: 'Fieldset label',
    direction: 'vertical',
  },
};
