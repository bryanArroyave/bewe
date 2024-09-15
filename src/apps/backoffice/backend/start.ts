import { MoocBackendApp } from './app';
import * as dotenv from 'dotenv';

try {
	dotenv.config();
	console.log('Starting Mooc Backend App');
	
	
	new MoocBackendApp().start();
} catch (e) {
	console.log(e);
	process.exit(1);
}

process.on('uncaughtException', err => {
	console.log('uncaughtException', err);
	process.exit(1);
});
