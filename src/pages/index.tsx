import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";

const Homepage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/spotify");
  }, []);
  return (
    <div className="w-screen h-screen flex items-center justify-center text-green-400 font-bold">
      <div className="text-center">
        <h1 className="text-brand">On Repeat</h1>
        Loading...
      </div>
    </div>
  );
};

export default Homepage;
