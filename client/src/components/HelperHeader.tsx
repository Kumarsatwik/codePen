import { Save, Share2 } from "lucide-react";
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
import { RootState } from "@/redux/store";

export default function HelperHeader() {
  const dispatch = useDispatch();
  const currentLanguage = useSelector(
    (state: RootState) => state.compilerSlice.currentLanguage
  );

  return (
    <div className="__helper_header h-[50px] bg-black text-white p-2 flex justify-between items-center">
      <div className="__btn_container flex gap-1">
        <Button variant="success">
          <Save size={16} />
          Save
        </Button>
        <Button
          variant="secondary"
          className="flex justify-center items-center gap-1"
        >
          <Share2 size={16} />
          Share
        </Button>
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
