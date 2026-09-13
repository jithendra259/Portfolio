import { Component } from "@/components/ui/pdf-viewer";

const DemoOne = () => {
  return (
    <div className="flex w-full h-screen justify-center items-center bg-background">
      <Component url="https://arxiv.org/pdf/1706.03762" />
    </div>
  );
};

export { DemoOne };
export default DemoOne;
