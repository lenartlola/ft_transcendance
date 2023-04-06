import React, { useEffect } from "react";
import { UseGameDto } from "./dto/useGame.dto";
import PlayerCard from "./PlayerCard";
import { createPortal } from "react-dom";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";

interface GamePageProps {
  gamer: UseGameDto;
}

export default function GamePage({ gamer }: GamePageProps) {
  let keys: string[] = [];
  let controls = ["w", "s", "ArrowUp", "ArrowDown", "1", "2", "3"];
  const rootEl = document.getElementById("around");
  const [effect, setEffect] = React.useState(false);
  const [minSize, setMinSize] = React.useState("1200");

  function handleResize() {
    let around = document.getElementById("around");

    if (gamer.gameArea.current && gamer.gameArea.current?.canvas && around) {
      // console.log(around.clientWidth, around.clientHeight);

      let min = Math.min(around.clientWidth, around.clientHeight * 1.5) * 0.8;

      setMinSize(`${min}px`);
      gamer.gameArea.current.canvas.style.width = `${min}`;
      gamer.gameArea.current.canvas.style.height = `${min / 1.5}px`;

      gamer.gameArea.current?.render();
    }
  }

  useEffect(() => {
    gamer.gameArea.current?.get_elements();
    gamer.gameArea.current?.render();

    handleResize();
    window.addEventListener("resize", handleResize);
  }, [gamer.gameArea.current]);

  window.onkeyup = (e: KeyboardEvent): any => {
    if (controls.indexOf(e.key) === -1) return;

    let ind = keys.indexOf(e.key);

    if (ind !== -1) keys.splice(ind, 1);

    // if (!keys.some((action) => { return move_actions.indexOf(action) != -1 }))
    gamer.playGame(keys);
  };

  window.onkeydown = (e: KeyboardEvent): any => {
    if (controls.indexOf(e.key) === -1 || keys.indexOf(e.key) !== -1) return;

    keys.push(e.key);

    if (keys.length > 0) {
      gamer.playGame(keys);
    }
  };

  const css = {
    width: minSize,
  };

  return (
    <div id="around" className="h-full px-3">
      {((gamer.myGame && gamer.amReady === false) || effect === true) &&
        rootEl !== null &&
        createPortal(
          <div
            className={`${
              effect === true
                ? "animate-fadeOut opacity-0"
                : "opacity-1 animate-fadeIn"
            } absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-gray-100 p-4 text-center dark:bg-gray-700 dark:text-white`}
            onAnimationEnd={() => {
              setEffect(false);
            }}
          >
            <h2 className="text-2xl">How to play ?</h2>
            <ul className="inline-block text-left">
              <li>
                W and <FiArrowUp className="inline" />: Move to UP
              </li>
              <li>
                S and <FiArrowDown className="inline" />: Move to DOWN
              </li>
            </ul>
            <p className="pt-3">
              You have 3 powers, press to numbers to active it
            </p>
            <ul className="inline-block text-left">
              <li>1: Add a ball</li>
              <li>2: Paddle Dash</li>
              <li>3: Reduce paddle</li>
            </ul>
            <button
              type="button"
              className="mx-auto mt-3 block rounded-lg bg-cyan-500 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => {
                setEffect(true);
                gamer.playGame(["ready"]);
              }}
            >
              Ready
            </button>
          </div>,
          rootEl
        )}

      <div
        style={css}
        id="playersCard"
        className={`mx-auto flex flex-row items-center py-3 max-w-[${minSize}px]`}
      >
        <PlayerCard
          user={gamer.user1}
          status={gamer.user1?.status || ""}
          id={1}
        />
        <PlayerCard
          user={gamer.user2}
          status={gamer.user2?.status || ""}
          id={2}
        />
      </div>

      <canvas className="mx-auto rounded-lg bg-black" id="canvas"></canvas>
      <button
        type="button"
        className="mx-auto mt-3 flex rounded-lg bg-cyan-500 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={() => {
          setEffect(false);
          gamer.playGame(["unready"]);
        }}
      >
        Show rules
      </button>

      <button
        type="button"
        className="mx-auto mt-3 flex rounded-lg bg-cyan-500 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={() => {
          gamer.inviteGame(2);
        }}
      >
        Invite
      </button>
      <button
        type="button"
        className="mx-auto mt-3 flex rounded-lg bg-cyan-500 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={() => {
          gamer.joinGame(1);
        }}
      >
        Join
      </button>
    </div>
  );
}
