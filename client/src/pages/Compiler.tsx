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
import { updateFullCode, updateIsOwner } from "@/redux/slices/compilerSlice";
import { handleError } from "@/components/utils/handleError";
import toast from "react-hot-toast";
import { useLoadCodeMutation } from "@/redux/slices/api";
import Loader from "@/components/Loader/Loader";

const Compile = () => {
  const { urlId } = useParams();
  const dispatch = useDispatch();

  const [loadExisting, { isLoading }] = useLoadCodeMutation();

  const loadCode = useCallback(async () => {
    try {
      // const response = await axios.post(`${serverUrl}/compiler/load`, {
      //   urlId: urlId,
      // });
      // console.log(response.data.fullCode);
      if (urlId) {
        const response = await loadExisting({ urlId }).unwrap();
        dispatch(updateFullCode(response.fullCode));
        dispatch(updateIsOwner(response.isOwner));
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error?.response?.status == 500) {
          toast.error("Invalid URL, Default Code Loaded");
        }
      }
      handleError(error);
    }
  }, [urlId, dispatch, loadExisting]);

  useEffect(() => {
    if (urlId) {
      loadCode();
    }
  }, [urlId, loadCode]);

  if (isLoading) {
    return (
      <div className="w-full h-[calc(100dvh-60px)] flex justify-center items-center">
        <Loader />
      </div>
    );
  }

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
