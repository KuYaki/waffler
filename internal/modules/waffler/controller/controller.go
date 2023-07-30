package controller

import (
	"go.uber.org/zap"
	"net/http"
)

type Waffler interface {
	Hello(http.ResponseWriter, *http.Request)
}

type Waffl struct {
	log *zap.Logger
}

func NewWaffl(zapLog *zap.Logger) Waffler {
	return &Waffl{log: zapLog}
}

func (w *Waffl) Hello(writer http.ResponseWriter, request *http.Request) {
	_, err := writer.Write([]byte("Hello, world!"))
	if err != nil {
		w.log.Error("error writing response", zap.Error(err))
	}
}
