"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { client } from "@/lib/appwrite";
import { AppwriteException } from "appwrite";
import Image from "next/image";

// ✅ Tipe untuk log data
interface LogEntry {
  date: Date;
  method: string;
  path: string;
  status: number;
  response: string;
}

type StatusType = "idle" | "loading" | "success" | "error";

export default function Home() {
  const [detailHeight, setDetailHeight] = useState<number>(55);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [status, setStatus] = useState<StatusType>("idle");
  const [showLogs, setShowLogs] = useState<boolean>(false);

  const detailsRef = useRef<HTMLDetailsElement | null>(null);

  const updateHeight = useCallback(() => {
    if (detailsRef.current) {
      setDetailHeight(detailsRef.current.clientHeight);
    }
  }, [logs, showLogs]);

  useEffect(() => {
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [updateHeight]);

  useEffect(() => {
    const el = detailsRef.current;
    if (!el) return;

    el.addEventListener("toggle", updateHeight);
    return () => el.removeEventListener("toggle", updateHeight);
  }, [updateHeight]);

  const sendPing = async (): Promise<void> => {
    if (status === "loading") return;
    setStatus("loading");

    try {
      const result = await client.ping();
      const log: LogEntry = {
        date: new Date(),
        method: "GET",
        path: "/v1/ping",
        status: 200,
        response: JSON.stringify(result),
      };
      setLogs((prev) => [log, ...prev]);
      setStatus("success");
    } catch (err: unknown) {
      const isAppwriteError = err instanceof AppwriteException;
      const log: LogEntry = {
        date: new Date(),
        method: "GET",
        path: "/v1/ping",
        status: isAppwriteError ? err.code : 500,
        response: isAppwriteError ? err.message : "Something went wrong",
      };
      setLogs((prev) => [log, ...prev]);
      setStatus("error");
    }
    setShowLogs(true);
  };

  return (
    <main className="checker-background flex flex-col items-center p-5" style={{ marginBottom: `${detailHeight}px` }}>
      <div className="mt-25 flex w-full max-w-[40em] items-center justify-center lg:mt-34">
        <div className="rounded-[25%] border border-[#19191C0A] bg-[#F9F9FA] p-3 shadow-[0px_9.36px_9.36px_0px_hsla(0,0%,0%,0.04)]">
          <div className="rounded-[25%] border border-[#FAFAFB] bg-white p-5 shadow-[0px_2px_12px_0px_hsla(0,0%,0%,0.03)] lg:p-9">{/* <Image alt="Next.js logo" src={NextjsLogo} width={56} height={56} /> */}</div>
        </div>
        <div className={`flex w-38 items-center transition-opacity duration-2500 ${status === "success" ? "opacity-100" : "opacity-0"}`}>
          <div className="to-[rgba(253, 54, 110, 0.15)] h-[1px] flex-1 bg-gradient-to-l from-[#f02e65]" />
          <div className="icon-check flex h-5 w-5 items-center justify-center rounded-full border border-[#FD366E52] bg-[#FD366E14] text-[#FD366E]" />
          <div className="to-[rgba(253, 54, 110, 0.15)] h-[1px] flex-1 bg-gradient-to-r from-[#f02e65]" />
        </div>
        <div className="rounded-[25%] border border-[#19191C0A] bg-[#F9F9FA] p-3 shadow-[0px_9.36px_9.36px_0px_hsla(0,0%,0%,0.04)]">
          <div className="rounded-[25%] border border-[#FAFAFB] bg-white p-5 shadow-[0px_2px_12px_0px_hsla(0,0%,0%,0.03)] lg:p-9">{/* <Image alt="Appwrite logo" src={AppwriteLogo} width={56} height={56} /> */}</div>
        </div>
      </div>

      <section className="mt-12 flex h-52 flex-col items-center">
        {status === "loading" ? (
          <div className="flex flex-row gap-4">
            <div role="status">
              <svg aria-hidden="true" className="h-5 w-5 animate-spin fill-[#FD366E] text-gray-200 dark:text-gray-600" viewBox="0 0 100 101" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591..." fill="currentColor" />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
            <span>Waiting for connection...</span>
          </div>
        ) : status === "success" ? (
          <h1 className="font-[Poppins] text-2xl font-light text-[#2D2D31]">Congratulations!</h1>
        ) : (
          <h1 className="font-[Poppins] text-2xl font-light text-[#2D2D31]">Check connection</h1>
        )}

        <p className="mt-2 mb-8">{status === "success" ? <span>You connected your app successfully.</span> : status === "error" || status === "idle" ? <span>Send a ping to verify the connection</span> : null}</p>

        <button onClick={sendPing} className={`cursor-pointer rounded-md bg-[#FD366E] px-2.5 py-1.5 ${status === "loading" ? "hidden" : "visible"}`}>
          <span className="text-white">Send a ping</span>
        </button>
      </section>

      {/* 🔽 Logs Section */}
      <aside className="fixed bottom-0 flex w-full cursor-pointer border-t border-[#EDEDF0] bg-white">
        <details open={showLogs} ref={detailsRef} className="w-full">
          <summary className="flex w-full flex-row justify-between p-4 marker:content-none">
            <div className="flex gap-2">
              <span className="font-semibold">Logs</span>
              {logs.length > 0 && (
                <div className="flex items-center rounded-md bg-[#E6E6E6] px-2">
                  <span className="font-semibold">{logs.length}</span>
                </div>
              )}
            </div>
            <div className="icon">
              <span className="icon-cheveron-down" aria-hidden="true" />
            </div>
          </summary>

          <div className="flex w-full flex-col lg:flex-row">
            <div className="flex flex-col border-r border-[#EDEDF0]">
              <div className="border-y border-[#EDEDF0] bg-[#FAFAFB] px-4 py-2 text-[#97979B]">Project</div>
              <div className="grid grid-cols-2 gap-4 p-4">
                <div className="flex flex-col">
                  <span className="text-[#97979B]">Endpoint</span>
                  <span className="truncate">{process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[#97979B]">Project-ID</span>
                  <span className="truncate">{process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[#97979B]">Project name</span>
                  <span className="truncate">{process.env.NEXT_PUBLIC_APPWRITE_PROJECT_NAME}</span>
                </div>
              </div>
            </div>

            <div className="flex-grow">
              <table className="w-full">
                <thead>
                  <tr className="border-y border-[#EDEDF0] bg-[#FAFAFB] text-[#97979B]">
                    {logs.length > 0 ? (
                      <>
                        <td className="w-52 py-2 pl-4">Date</td>
                        <td>Status</td>
                        <td>Method</td>
                        <td className="hidden lg:table-cell">Path</td>
                        <td className="hidden lg:table-cell">Response</td>
                      </>
                    ) : (
                      <td className="py-2 pl-4">Logs</td>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {logs.length > 0 ? (
                    logs.map((log, index) => (
                      <tr key={`log-${index}-${log.date.getTime()}`}>
                        <td className="py-2 pl-4 font-[Fira_Code]">
                          {log.date.toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                        <td>{log.status > 400 ? <div className="w-fit rounded-sm bg-[#FF453A3D] px-1 text-[#B31212]">{log.status}</div> : <div className="w-fit rounded-sm bg-[#10B9813D] px-1 text-[#0A714F]">{log.status}</div>}</td>
                        <td>{log.method}</td>
                        <td className="hidden lg:table-cell">{log.path}</td>
                        <td className="hidden font-[Fira_Code] lg:table-cell">{log.response}</td>
                      </tr>
                    ))
                  ) : (
                    <tr key="no-logs">
                      <td className="py-2 pl-4 font-[Fira_Code]">There are no logs to show</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </details>
      </aside>
    </main>
  );
}
