import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./Tabs";

const meta: Meta<typeof Tabs> = {
  title: "Molecules/Tabs",
  component: Tabs,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account settings here.</TabsContent>
      <TabsContent value="password">Password settings here.</TabsContent>
    </Tabs>
  ),
};
