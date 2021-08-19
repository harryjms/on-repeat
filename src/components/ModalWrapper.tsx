import { ReactPortal, useEffect } from "react";
import ReactDOM from "react-dom";

const ModalWrapper =
  (Component: any) =>
  ({ onDismiss, ...props }): ReactPortal => {
    useEffect(() => {
      document.getElementsByTagName("body")[0].style.overflowY = "hidden";
      return () => {
        document.getElementsByTagName("body")[0].style.overflowY = "";
      };
    }, []);
    return ReactDOM.createPortal(
      <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
        <div className="m-4 p-6 dark:bg-gray-700 dark:text-white bg-white text-black rounded-xl text-center">
          <Component {...props} />
          {onDismiss && (
            <button onClick={onDismiss} className="mt-2">
              Okay
            </button>
          )}
        </div>
      </div>,
      document.getElementById("modal")
    );
  };

export default ModalWrapper;
