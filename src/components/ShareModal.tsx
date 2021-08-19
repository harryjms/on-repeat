import React from "react";
import ModalWrapper from "./ModalWrapper";

const ShareModal = () => {
  return (
    <div>
      <h2>Woah, you're keen!</h2>
      <p>
        The share function is not quite ready yet. Check back in the future.
      </p>
    </div>
  );
};

export default ModalWrapper(ShareModal);
