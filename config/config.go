package config

import (
	"go.uber.org/zap"
	"os"
	"strconv"
	"time"
)

type AppConf struct {
	AppName string `yaml:"app_name"`
	Server  Server `yaml:"server"`
	Logger  Logger `yaml:"logger"`
}

type Logger struct {
	Level string `yaml:"level"`
}

type Server struct {
	Port            string        `yaml:"port"`
	ShutdownTimeout time.Duration `yaml:"shutdown_timeout"`
}

func NewAppConf() AppConf {
	return AppConf{
		AppName: os.Getenv("APP_NAME"),
		Logger: Logger{
			Level: os.Getenv("LOG_LEVEL"),
		},
		Server: Server{
			Port: os.Getenv("SERVER_PORT"),
		},
	}
}

func (a *AppConf) Init(logger *zap.Logger) {
	shutDownTimeOut, err := strconv.Atoi(os.Getenv("SHUTDOWN_TIMEOUT"))
	if err != nil {
		logger.Fatal("config: parse server shutdown timeout error")
	}
	shutDownTimeout := time.Duration(shutDownTimeOut) * time.Second
	if err != nil {
		logger.Fatal("config: parse rpc server shutdown timeout error")
	}

	a.Server.ShutdownTimeout = shutDownTimeout
}
