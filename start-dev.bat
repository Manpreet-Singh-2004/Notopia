@echo off
REM Start backend in a new cmd window
start "Backend Server" cmd /k "cd backend && npm run dev"

REM Start frontend in another new cmd window
start "Frontend Server" cmd /k "cd frontend && npm start"
