"use client";
import React, { Suspense, useState } from "react";
import { useAppDispatch } from "~/app/redux/hooks";
import {
  setAwsId,
  setAwsSecret
} from "~/app/redux/features/createClusterSlice";

interface ProviderProps {
  inFocusHandler: (string: string) => void;
}

const AwsSecrets: React.FC<ProviderProps> = ({ inFocusHandler }) => {
  const dispatch = useAppDispatch();
  const [awsIdValue, setAwsIdValue] = useState<string>("");
  const [awsSecretValue, setAwsSecretValue] = useState<string>("");

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(setAwsId(awsIdValue));
    dispatch(setAwsSecret(awsSecretValue));
    inFocusHandler("region");
  };

  const idChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    console.log(event.currentTarget.value);
    setAwsIdValue(event.currentTarget.value);
  };
  const secretChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    console.log(event.currentTarget.value);
    setAwsSecretValue(event.currentTarget.value);
  };

  return (
    <Suspense
    <div className="flex h-[70vh] flex-col items-center justify-center">
      <h1 className="mb-8 text-2xl font-bold">AWS Credentials</h1>
      <div className="form-control w-full max-w-xs ">
        <form id="aws-form" onSubmit={onSubmitHandler}>
          <label htmlFor="aws-form" className="label ">
            AWS Id
          </label>
          <input
            onChange={idChangeHandler}
            type="text"
            placeholder="Id"
            className="input-bordered input mt-1 w-full max-w-xs rounded-md p-2"
          />
          <div className="mt-6">
            <label htmlFor="aws-form" className="label  ">
              AWS Secret
            </label>
            <input
              onChange={secretChangeHandler}
              type="text"
              placeholder="Secret"
              className="input-bordered input mt-1 w-full max-w-xs rounded-md p-2"
            />
          </div>
          <button className="btn-primary btn mt-6 w-full" type="submit">
            Button
          </button>
        </form>
      </div>
    </div>
  );
};

export default AwsSecrets;