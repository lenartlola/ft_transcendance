import React, { useEffect, SyntheticEvent } from "react";
import { createPortal } from "react-dom";
import classNames from "classnames";
import axios from "axios";

import { UseLoginDto } from "../Log/dto/useLogin.dto";
import { ParticipantDto } from "src/_shared_dto/participant.dto";
import { UseChatDto } from "./dto/useChat.dto";

const startEL = document.getElementById("root");

interface OwnerCommandsProps {
  loginer: UseLoginDto;
  sendMessage: Function;
  participants: ParticipantDto[];
  role: string;
}

export default function OwnerCommands({
  loginer,
  sendMessage,
  participants,
  role,
}: OwnerCommandsProps) {
  const [users, setUsers] = React.useState<ParticipantDto[]>([]);
  const [portal, setPortal] = React.useState(false);
  const [effect, setEffect] = React.useState(false);

  const [invite, setInvite] = React.useState("");
  const [password, setPassword] = React.useState("");

  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    axios
      .get("/api/users", loginer.get_headers())
      .then((res) => {
        if (res.status === 200) {
          const allUsers = res.data as ParticipantDto[];
          setUsers(
            allUsers.filter((value) => {
              return (
                participants.find((parti) => {
                  return parti.id === value.id;
                }) === undefined
              );
            })
          );

          return;
        }
      })
      .catch((error) => {});
  }, [participants]);

  const handleClickPortal = (event: SyntheticEvent) => {
    event.preventDefault();
    setEffect(true);
    setPortal(true);
  };

  const handleClickInvite = (event: SyntheticEvent) => {
    event.preventDefault();

    if (invite.length > 0) {
      sendMessage(`/invite ${invite}`);
      setInvite("");
    }
    // ...
  };

  const handleClickPassword = (event: SyntheticEvent) => {
    event.preventDefault();
    // ...
  };

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (ref) {
        if (portal && !ref.current?.contains(e.target)) {
          setEffect(false);
        }
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [portal]);

  return (
    <>
      <button className="pl-1 hover:underline" onClick={handleClickPortal}>
        - {role} settings
        <svg
          className="ml-1 inline-block h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g>
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M22 12h-2V5H4v13.385L5.763 17H12v2H6.455L2 22.5V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v8zm-7.855 7.071a4.004 4.004 0 0 1 0-2.142l-.975-.563 1-1.732.976.563A3.996 3.996 0 0 1 17 14.126V13h2v1.126c.715.184 1.353.56 1.854 1.071l.976-.563 1 1.732-.975.563a4.004 4.004 0 0 1 0 2.142l.975.563-1 1.732-.976-.563c-.501.51-1.14.887-1.854 1.071V23h-2v-1.126a3.996 3.996 0 0 1-1.854-1.071l-.976.563-1-1.732.975-.563zM18 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
          </g>
        </svg>
      </button>

      {portal &&
        startEL !== null &&
        createPortal(
          <div
            ref={ref}
            className={classNames(
              "absolute left-1/2 top-1/2 z-50 min-w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-gray-300 p-6 dark:bg-cyan-800 dark:text-white",
              effect ? "opacity-1 animate-fadeIn" : "animate-fadeOut opacity-0"
            )}
            onAnimationEnd={() => {
              if (!effect) setPortal(false);
            }}
          >
            <h3 className="text-center text-xl">Actions</h3>

            <div className="mb-6 h-16 w-full py-2">
              <label className="">Invite user</label>
              <div className="flex h-full w-full items-center justify-around gap-4 rounded-full bg-cyan-500 shadow-lg transition duration-500 ease-in-out hover:bg-blue-400 focus:outline-none">
                <select
                  defaultValue={""}
                  onChange={(event) => {
                    setInvite(event.target.value);
                  }}
                  className="ml-2 w-full rounded-full bg-gray-200 p-1 px-4 text-gray-600 placeholder-gray-600 focus:placeholder-gray-400 focus:outline-none"
                >
                  <option key={-1} value="">
                    Pseudo
                  </option>
                  ;
                  {users.map((user) => {
                    return (
                      <option key={user.id} value={user.id}>
                        {user.pseudo}
                      </option>
                    );
                  })}
                </select>

                <button className="mr-1 text-white" onClick={handleClickInvite}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="ml-1 h-10 w-10"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="mb-6 h-16 w-full py-2">
              <label className="">
                Change password <small>(leave empty to remove)</small>
              </label>
              <div className="flex h-full w-full items-center justify-around gap-4 rounded-full bg-cyan-500 shadow-lg transition duration-500 ease-in-out hover:bg-blue-400 focus:outline-none">
                <input
                  type="text"
                  placeholder="New password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  className="ml-2 w-full rounded-full bg-gray-200 p-1 px-4 text-gray-600 placeholder-gray-600 focus:placeholder-gray-400 focus:outline-none"
                />

                <button
                  className="mr-1 text-white"
                  onClick={handleClickPassword}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="ml-1 h-10 w-10"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>,
          startEL
        )}
    </>
  );
}
