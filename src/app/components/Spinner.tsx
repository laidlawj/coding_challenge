import React from "react";
import { TailSpin } from "react-loader-spinner";

export default function SpinnerLoading(): JSX.Element {
  return (
    <div>
      <TailSpin
        color="#00BFFF"
        height={50}
        width={50}
        visible={true}
        wrapperStyle={{}}
        wrapperClass=""
        ariaLabel="puff-loading"
      />
    </div>
  );
}
