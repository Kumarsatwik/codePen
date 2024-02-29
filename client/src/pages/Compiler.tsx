import CodeEditor from "@/components/CodeEditor";
import HelperHeader from "@/components/HelperHeader";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import RenderCode from "@/components/RenderCode";
import { useParams } from "react-router-dom";
import { useCallback, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateFullCode } from "@/redux/slices/compilerSlice";
import { handleError } from "@/components/utils/handleError";
import toast from "react-hot-toast";

const Compile = () => {
  const { urlId } = useParams();
  const dispatch = useDispatch();
  const serverUrl = process.env.VITE_SERVER_URL;
  const loadCode = useCallback(async () => {
    try {
      const response = await axios.post(`${serverUrl}/compiler/load`, {
        urlId: urlId,
      });
      console.log(response.data.fullCode);
      dispatch(updateFullCode(response.data.fullCode));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error?.response?.status == 500) {
          toast.error("Invalid URL, Default Code Loaded");
        }
      }
      handleError(error);
    }
  }, [urlId, dispatch]);

  useEffect(() => {
    if (urlId) {
      loadCode();
    }
  }, [urlId, loadCode]);

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
      <ResizablePanel
        className="h-[calc(100dvh-60px)] min-w-[350px]"
        defaultSize={50}
      >
        <RenderCode />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Compile;
