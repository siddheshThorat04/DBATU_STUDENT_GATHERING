import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";


// const API =  "http://localhost:8080" 
const API =  "https://dbatu-student-gathering.onrender.com/" 

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
		server: {
			port: 3000,
			proxy:{
				"/api": {
					target:API,
					changeOrigin: true,
					secure: true,
				},
			},
		},
});