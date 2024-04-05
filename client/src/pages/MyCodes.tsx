import CodeItem from "@/components/CodeItem";
import { useGetMyCodesQuery } from "@/redux/slices/api";
import * as React from "react";

interface IMyCodesProps {}

const MyCodes: React.FunctionComponent<IMyCodesProps> = () => {
  const { data: myCodes } = useGetMyCodesQuery();

  return myCodes?.length !== 0 ? (
    <div className="border-2 p-3 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3">
      {myCodes?.map((item) => {
        return <CodeItem deleteBtn={false} key={item.title} data={item} />;
      })}
    </div>
  ) : (
    <>
      <p className="text-center font-mono text-slate-600 p-3">
        You don't have any saved codes
      </p>
    </>
  );
};

export default MyCodes;
