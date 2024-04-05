import {
  Code,
  Copy,
  Download,
  Loader2,
  PencilLine,
  Save,
  Share2,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import {
  CompilerSliceStateType,
  updateCurrentLanguage,
} from "@/redux/slices/compilerSlice";
import { handleError } from "./utils/handleError";
import { RootState } from "@/redux/store";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useEditCodeMutation, useSaveCodeMutation } from "@/redux/slices/api";
import toast from "react-hot-toast";

export default function HelperHeader() {
  const isOwner = useSelector(
    (state: RootState) => state.compilerSlice.isOwner
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [shareBtn, setShareBtn] = useState<boolean>(false);
  const [postTitle, setPostTitle] = useState<string>("");

  const fullCode = useSelector(
    (state: RootState) => state.compilerSlice.fullCode
  );
  const [saveCode, { isLoading }] = useSaveCodeMutation();
  const [editCode, { isLoading: codeEditLoading }] = useEditCodeMutation();

  const { urlId } = useParams();
  useEffect(() => {
    if (urlId) {
      setShareBtn(true);
    } else {
      setShareBtn(false);
    }
  }, [urlId]);

  const handleSaveCode = async () => {
    const body = { fullCode: fullCode, title: postTitle };
    try {
      const response = await saveCode(body).unwrap();
      navigate(`/compiler/${response.url}`, { replace: true });
    } catch (error) {
      handleError(error);
    }
  };

  const handleDownloadCode = () => {
    if (
      fullCode.html == "" &&
      fullCode.css == "" &&
      fullCode.javascript == ""
    ) {
      toast.error("Code is Empty");
      return;
    }

    const htmlCode = new Blob([fullCode.html], { type: "text/html" });
    const cssCode = new Blob([fullCode.css], { type: "text/css" });
    const jsCode = new Blob([fullCode.javascript], { type: "text/javascript" });

    const htmlLink = document.createElement("a");
    const cssLink = document.createElement("a");
    const jsLink = document.createElement("a");

    htmlLink.href = URL.createObjectURL(htmlCode);
    htmlLink.download = "index.html";
    document.body.appendChild(htmlLink);

    cssLink.href = URL.createObjectURL(cssCode);
    cssLink.download = "style.css";
    document.body.appendChild(cssLink);

    jsLink.href = URL.createObjectURL(jsCode);
    jsLink.download = "script.js";
    document.body.appendChild(jsLink);

    if (fullCode.html != "") {
      htmlLink.click();
    }
    if (fullCode.css != "") {
      cssLink.click();
    }
    if (fullCode.javascript != "") {
      jsLink.click();
    }

    document.body.removeChild(htmlLink);
    document.body.removeChild(cssLink);
    document.body.removeChild(jsLink);

    toast.success("Code downloaded successfully");
  };

  const handleEditCode = async () => {
    try {
      if (urlId) {
        await editCode({ fullCode, id: urlId }).unwrap();
        toast.success("Code Updated Successfully");
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="__helper_header h-[50px] bg-black text-white p-2 flex justify-between items-center">
      <div className="__btn_container flex gap-1">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="success"
              // onClick={handleSaveCode}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" />
                  Saving
                </>
              ) : (
                <>
                  <Save size={16} /> Save
                </>
              )}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex gap-2 justify-center items-center">
                <Code />
                Save your code !
              </DialogTitle>
              <DialogDescription className="flex flex-col gap-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your code title"
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                  />
                  <Button variant="success" onClick={handleSaveCode}>
                    Save
                  </Button>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <Button variant={"blue"} size="icon" onClick={handleDownloadCode}>
          <Download size={16} />
        </Button>

        {shareBtn && (
          <>
            {isOwner && (
              <Button
                disabled={codeEditLoading}
                size="icon"
                onClick={handleEditCode}
                variant="blue"
              >
                <PencilLine size={16} />
              </Button>
            )}
            <Dialog>
              <DialogTrigger className="whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2 flex justify-center items-center gap-1">
                <Share2 size={16} />
                Share
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="flex gap-2 justify-center items-center">
                    <Code />
                    Share your code !
                  </DialogTitle>
                  <DialogDescription className="flex flex-col gap-3">
                    <div className="flex gap-2">
                      <Input value={window.location.href} disabled />
                      <Button
                        variant="secondary"
                        onClick={() =>
                          window.navigator.clipboard.writeText(
                            window.location.href
                          )
                        }
                      >
                        <Copy size={12} />
                      </Button>
                    </div>
                    <p className="text-center">
                      Share this link with your friends
                    </p>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>
      <div className="__tab_switcher flex justify-center items-center gap-1">
        <small>Current Language:</small>
        <Select
          defaultValue="html"
          onValueChange={(value) =>
            dispatch(
              updateCurrentLanguage(
                value as CompilerSliceStateType["currentLanguage"]
              )
            )
          }
        >
          <SelectTrigger className="w-[180px] bg-gray-800 outline-none focus:ring-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="html">HTML</SelectItem>
            <SelectItem value="css">CSS</SelectItem>
            <SelectItem value="javascript">Javascript</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
