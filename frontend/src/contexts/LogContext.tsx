import React, { createContext, useState } from "react";

interface LogContextType {
  logs: string[];
  addLog: (message: string) => void;
}

export const LogContext = createContext<LogContextType | undefined>(undefined);

const LogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleString();
    setLogs((prevLogs) => [...prevLogs, `${timestamp} - ${message}`]);
  };

  return (
    <LogContext.Provider value={{ logs, addLog }}>
      {children}
    </LogContext.Provider>
  );
};

export default LogProvider;