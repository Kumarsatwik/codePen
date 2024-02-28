import CodeEditor from "@/components/CodeEditor";
import HelperHeader from "@/components/HelperHeader";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

const Compile = () => {
  const html = useSelector((state: RootState) => state.compilerSlice.html);

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel
        defaultSize={50}
        className="h-[calc(100dvh-60px)] min-w-[350px]"
      >
        <HelperHeader />
        <CodeEditor />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel className="h-[calc(100dvh-60px)] min-w-[350px]">
        right
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Compile;
