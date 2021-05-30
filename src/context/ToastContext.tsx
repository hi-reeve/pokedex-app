import React, { createContext, useState } from "react";

interface IToastContext {
    visible: boolean;
    message: string;
    resetToast: () => void;
    setMessageHandler: (inputMessage: string) => void;
    openToast: () => void;
    closeToast: () => void;
}

const initState: IToastContext = {
    visible: false,
    message: "",
    resetToast: () => {},
    setMessageHandler: (inputMessage: string) => {},
    openToast: () => {},
    closeToast: () => {},
};

export const ToastContext = createContext(initState);

const ToastContextProvider: React.FC = ({ children }) => {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState("");

    const setMessageHandler = (inputMessage: string) => {
        setMessage(inputMessage);
    };

    const resetToast = () => {
        setMessage("");
    };
    const openToast = () => {
        setVisible(true);
    };
    const closeToast = () => {
        setVisible(false);
    };

    return (
        <ToastContext.Provider
            value={{
                visible,
                message,
                setMessageHandler,
                resetToast,
                openToast,
                closeToast,
            }}
        >
            {children}
        </ToastContext.Provider>
    );
};

export default ToastContextProvider;
