@echo off

if "%~1"=="-FIXED_CTRL_C" (
   SHIFT
) ELSE (
   %0 <NUL -FIXED_CTRL_C %*
)

docker-compose ^
	-f docker-compose.networks.yml ^
	-f docker-compose.infrastructure.yml ^
	-f docker-compose.infrastructure.local.yml ^
	up --build

@echo on