import { Component } from '@/components/ui/pdf-viewer';

const DemoOne = () => {
  return (
    <div className="bg-background flex h-screen w-full items-center justify-center">
      <Component url="https://arxiv.org/pdf/1706.03762" />
    </div>
  );
};

export { DemoOne };
export default DemoOne;
