import React, { useState, useEffect } from "react";

import { GameArea } from "./pong";

import * as module_const from './constant'


import { UseGameDto } from "./dto/useGame.dto";

interface GamePageProps {
	gamer: UseGameDto;
}

export default function GamePage({ gamer }: GamePageProps) {

	useEffect(() => {
		gamer.gameArea.current?.get_elements();
		gamer.gameArea.current?.render();

	}, [gamer.gameArea.current])


	const styles = {
		myProgress: {
			width: "100%",
			backgroundColor: "#ddd"
		},

		myBar: {
			width: "0%",
			height: "30px",
			backgroundColor: "#4CBB17"
		},
	};


	let keys: string[] = [];
	let controls = ["w", "s"];

	window.onkeyup = (e: KeyboardEvent): any => {
		if (controls.indexOf(e.key) == -1)
			return;

		let ind = keys.indexOf(e.key);

		if (ind != -1)
			keys.splice(ind, 1);


		if (keys.length == 0)
			gamer.playGame("");

	}

	window.onkeydown = (e: KeyboardEvent): any => {

		if (controls.indexOf(e.key) == -1 || keys.indexOf(e.key) != -1)
			return;

		keys.push(e.key);

		if (keys.length > 0)
			gamer.playGame(e.key);
	}


	return (
		<div className="bg-yellow-400 w-full h-full">
			{/* <h2>ICI !!! on game !!</h2> */}
			<div className="bg-gray-800 w-full z-50 top-10 px-40">
				<div className="flex flex-row space-x-4 rounded bg-gray-400 border border-gray-300 w-40 text-center items-center basis-1 md:basis-1/2 ld:basis-1/4 bg-gray-300">
					<div className="rounded bg-gray-400 border border-gray-300 w-40 text-center items-center md:basis-1/2 ld:basis-1/4 bg-gray-300">01</div>
					<div className="rounded bg-gray-400 border border-gray-300 w-40 text-center items-center md:basis-1/2 ld:basis-1/4 bg-gray-300">02</div>
					<div className="rounded bg-gray-400 border border-gray-300 w-40 text-center items-center md:basis-1/2 ld:basis-1/4 bg-gray-300">03</div>
					<div className="rounded bg-gray-400 border border-gray-300 w-40 text-center items-center md:basis-1/2 ld:basis-1/4 bg-gray-300">04</div>
				</div>
			</div>
			<div>
				<div>
					<p>ULTIME :</p>
					{/* <button className="rounded bg-gray-400 border border-gray-300 w-40 text-center items-center md:basis-1/2 ld:basis-1/4 bg-gray-300" type="button" id="btn_add_ball" onClick={() => { gameArea.boost_ult() }}>
						ADMIN: BOOST ULT
					</button> */}
					<a className="rounded bg-gray-400 border border-gray-300 w-40 text-center items-center md:basis-1/2 ld:basis-1/4 bg-gray-300" id="btn_ult0">
						1: Add a ball
					</a>
					<a className="rounded bg-gray-400 border border-gray-300 w-40 text-center items-center md:basis-1/2 ld:basis-1/4 bg-gray-300" id="btn_ult1">
						2 :Paddle Dash
					</a>
					<a className="rounded bg-gray-400 border border-gray-300 w-40 text-center items-center md:basis-1/2 ld:basis-1/4 bg-gray-300" id="btn_ult2">
						3: Reduce paddle
					</a>
					<div id="myProgress" style={styles.myProgress}>
						<div id="myBar" style={styles.myBar}>
						</div>
					</div>
				</div>
				<canvas className="rounded bg-gray-400 border border-gray-300 w-40 text-center items-center md:basis-1/2 ld:basis-1/4 bg-gray-300" id="canvas" style={{ border: '1px solid rgba(255, 255, 255, 0.85)', backgroundColor: 'rgba(0, 0, 0, 0.85)', width: '100%', maxWidth: '2000px' }}>
				</canvas>
				<script>  </script>
			</div>
			<div>
				<button className="rounded bg-gray-400 border border-gray-300 w-40 text-center items-center md:basis-1/2 ld:basis-1/4 bg-gray-300" type="button" id="btn_start" onClick={() => { gamer.createGame() }}>
					Create
				</button>
				<button className="rounded bg-gray-400 border border-gray-300 w-40 text-center items-center md:basis-1/2 ld:basis-1/4 bg-gray-300" type="button" id="btn_start" onClick={() => { gamer.joinGame() }}>
					Join
				</button>
				<button className="rounded bg-gray-400 border border-gray-300 w-40 text-center items-center md:basis-1/2 ld:basis-1/4 bg-gray-300" type="button" id="btn_start" onClick={() => { gamer.gameArea.current?.get_elements(); }}>
					Get
				</button>
				<button className="rounded bg-gray-400 border border-gray-300 w-40 text-center items-center md:basis-1/2 ld:basis-1/4 bg-gray-300" type="button" id="btn_start" onClick={() => { gamer.gameArea.current?.startGame() }}>
					Start
				</button>
				<button className="rounded bg-gray-400 border border-gray-300 w-40 text-center items-center md:basis-1/2 ld:basis-1/4 bg-gray-300" type="button" id="btn_pause" style={{ visibility: 'hidden' }} onClick={() => { gamer.gameArea.current?.do_pause() }}>
					Pause
				</button>
				<button className="rounded bg-gray-400 border border-gray-300 w-40 text-center items-center md:basis-1/2 ld:basis-1/4 bg-gray-300" type="button" id="btn_restart" style={{ visibility: 'hidden' }} onClick={() => { gamer.gameArea.current?.restart() }}>
					restart
				</button>
				{/* <button className="rounded bg-gray-400 border border-gray-300 w-40 text-center items-center md:basis-1/2 ld:basis-1/4 bg-gray-300" type="button" style={{visibility: 'hidden'}} id="btn_exportToJson" onClick={gameArea.exportToJson_pone}>
					export to JSON for P1
				</button>
				<button className="rounded bg-gray-400 border border-gray-300 w-40 text-center items-center md:basis-1/2 ld:basis-1/4 bg-gray-300" type="button" style={{visibility: 'hidden'}} id="btn_exportToJson" onClick={gameArea.exportToJson_ptwo}>
					export to JSON for P2
				</button> */}
			</div>
			<p>/!CONTROL!\</p>
			<p>W: UP</p>
			<p>S: DOWN</p>
			<p>NUMBERS: ULTIMATE</p>
		</div>
	);
}