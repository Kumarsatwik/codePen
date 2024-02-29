import { Code, Copy, Loader2, Save, Share2 } from "lucide-react";
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
import axios from "axios";
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

export default function HelperHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [shareBtn, setShareBtn] = useState<boolean>(false);
  const [saveLoading, setSaveLoading] = useState<boolean>(false);

  const fullCode = useSelector(
    (state: RootState) => state.compilerSlice.fullCode
  );

  const serverUrl = import.meta.env.VITE_SERVER_URL;

  const { urlId } = useParams();
  useEffect(() => {
    if (urlId) {
      setShareBtn(true);
    } else {
      setShareBtn(false);
    }
  }, []);

  const handleSaveCode = async () => {
    setSaveLoading(true);
    try {
      const response = await axios.post(`${serverUrl}/compiler/save`, {
        fullCode: fullCode,
      });
      navigate(`/compiler/${response.data.url}`, { replace: true });
    } catch (error) {
      handleError(error);
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <div className="__helper_header h-[50px] bg-black text-white p-2 flex justify-between items-center">
      <div className="__btn_container flex gap-1">
        <Button
          variant="success"
          onClick={handleSaveCode}
          disabled={saveLoading}
        >
          {saveLoading ? (
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
        {shareBtn && (
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
