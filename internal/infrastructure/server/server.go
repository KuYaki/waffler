package server

import (
	"context"
	"github.com/yaroslavvasilenko/waffler/config"

	"go.uber.org/zap"
	"net/http"
	"time"
)

type Server interface {
	Serve(ctx context.Context) error
}

type HttpServer struct {
	conf   config.Server
	logger *zap.Logger
	srv    *http.Server
}

func NewHttpServer(conf config.Server, server *http.Server, logger *zap.Logger) Server {
	return &HttpServer{conf: conf, logger: logger, srv: server}
}

func (s *HttpServer) Serve(ctx context.Context) error {
	var err error

	chErr := make(chan error)
	go func() {
		s.logger.Info("server started", zap.String("port", s.conf.Port))
		if err = s.srv.ListenAndServe(); err != http.ErrServerClosed {
			s.logger.Error("http listen and serve error", zap.Error(err))
			chErr <- err
		}
	}()

	select {
	case <-chErr:
		return err
	case <-ctx.Done():
	}

	ctxShutdown, cancel := context.WithTimeout(context.Background(), s.conf.ShutdownTimeout*time.Second)
	defer cancel()
	err = s.srv.Shutdown(ctxShutdown)

	return err
}
