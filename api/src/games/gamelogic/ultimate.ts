import * as module_const from "./constant"


import { GameArea } from "./pong";
import { Paddle } from "./paddle";
import { Ball } from "./ball";


export function ext_boost_ult(this: GameArea) {
	this.playerOne.ultimate = 100;
}

export function paddle_dash(player: Paddle, balls : Ball[]) {
	/*if (player.last_input == false)
		player.y -= 100;
	if (player.last_input == true)
		player.y += 100;*/
	let closestW = module_const.canvas_width;
	let closestY = 0;
	let val = player.x;
	balls.forEach(element => {
		if (player.x < module_const.canvas_width && closestW > element.x)
		{
			closestW = element.x;
			closestY = element.y;
		}
		if (player.x > module_const.canvas_width && closestW < element.x)
		{
			closestW = element.x;
			closestY = element.y;
		}
	});
	player.y = closestY - (player.height / 2);
	player.color = "#FAFA33";
	setTimeout(function() {
		if (player.x < module_const.canvas_width / 2)
			player.color = module_const.paddle_color;
		else
			player.color = module_const.paddle2_color;
	}, 100);
}

export function paddle_reduce(player: Paddle) {
	player.reducePaddle = true;
	player.bonk = 0;
}

export function ext_add_ball(this: GameArea, angle: number, x: number, y: number) //create another ball
{
	this.balls.push(new Ball(x, y, module_const.ball_radius, Math.max(this.balls[this.balls.length - 1].speed / 1.5, module_const.ball_spawn_speed)));

	this.balls[this.balls.length - 1].changeAngle(-angle);
}
