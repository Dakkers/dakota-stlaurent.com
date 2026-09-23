import type { Meta, StoryObj } from "@storybook/react-vite";

import { Chip } from "./Chip";

const meta = {
  component: Chip,
  args: { children: "Chip" },
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = { args: { intent: "secondary" } };

export const Neutral: Story = { args: { intent: "neutral" } };
