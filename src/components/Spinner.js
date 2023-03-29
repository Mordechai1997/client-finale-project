import { SpinnerDiamond } from "spinners-react";

export default function Spinner({isLoading}) {

  return (
    <div style={{height:`${isLoading?"100vh":""}`,display:"flex", justifyContent:"center", alignItems:"center"}}>
      <SpinnerDiamond enabled={isLoading} speed={200} size={120} color="blue" />
    </div>
  );
}


