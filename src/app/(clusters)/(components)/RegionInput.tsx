"use client";
import React, { useState } from "react";
import { useAppDispatch } from "~/app/redux/hooks";
import { setRegion } from "~/app/redux/features/createClusterSlice";

interface ProviderProps {
  inFocusHandler: (string: string) => void;
  regions: string[];
}

const RegionInput: React.FC<ProviderProps> = ({ inFocusHandler }) => {
  const regions: ProviderProps["regions"] = [
    "N. Virginia (us-east-1)",
    "Ohio (us-east-2)",
    "Ireland (eu-west-1)",
    "Tokyo (ap-northeast-1)",
    "Oregon (us-west-2)",
  ];

  const dispatch = useAppDispatch();
  const [regionsArray, setRegionsArray] = useState(regions);
  const [currentRegion, setCurrentRegion] = useState(regions[0]);

  const onSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentRegion(e.target.value);
  };

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(setRegion(currentRegion));
    inFocusHandler("name");
  };

  return (
    <div className="flex h-[70vh] flex-col items-center justify-center">
      <h1 className="mb-8 text-2xl font-bold">Select Region</h1>
      <form onSubmit={onSubmitHandler}>
        <select
          className="select w-full max-w-xs shadow-xl"
          onChange={onSelectHandler}
        >
          <option disabled value={"Select Region"}>
            Select Region
          </option>
          {regionsArray.map((region) => {
            return (
              <option key={region} value={region}>
                {region}
              </option>
            );
          })}
        </select>
        <button type="submit" className="btn-primary btn mt-8 w-full">
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegionInput;