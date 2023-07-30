package run

import (
	"context"
	"fmt"
	"github.com/go-chi/chi/v5"
	"github.com/yaroslavvasilenko/waffler/config"
	"github.com/yaroslavvasilenko/waffler/internal/infrastructure/server"
	"github.com/yaroslavvasilenko/waffler/internal/modules"
	"github.com/yaroslavvasilenko/waffler/internal/router"
	"go.uber.org/zap"
	"golang.org/x/sync/errgroup"
	"net/http"
	"os"
)

const (
	NoError = iota
	GeneralError
)

// Application - application interface
type Application interface {
	Runner
	Bootstraper
}

// Runner - application launch interface
type Runner interface {
	Run() int
}

// Bootstraper - application initialization interface
type Bootstraper interface {
	Bootstrap(options ...interface{}) Runner
}

// App - application structure
type App struct {
	conf   config.AppConf
	logger *zap.Logger
	srv    server.Server
	Sig    chan os.Signal
}

// NewApp - application builder
func NewApp(conf config.AppConf, logger *zap.Logger) *App {
	return &App{conf: conf, logger: logger, Sig: make(chan os.Signal, 1)}
}

// Run - application launch
func (a *App) Run() int {
	// create context for graceful shutdown
	ctx, cancel := context.WithCancel(context.Background())

	errGroup, ctx := errgroup.WithContext(ctx)

	// start goroutines for graceful shutdown
	// when a signal is received SIGINT
	// call cancel for context
	errGroup.Go(func() error {
		sigInt := <-a.Sig
		a.logger.Info("signal interrupt received", zap.Stringer("os_signal", sigInt))
		cancel()
		return nil
	})

	errGroup.Go(func() error {
		err := a.srv.Serve(ctx)
		if err != nil && err != http.ErrServerClosed {
			a.logger.Error("app: server error", zap.Error(err))
			return err
		}
		return nil
	})

	if err := errGroup.Wait(); err != nil {
		return GeneralError
	}

	return NoError
}

// Bootstrap - init application
func (a *App) Bootstrap() Runner {
	controller := modules.NewControllers(a.logger)
	// init router
	var r *chi.Mux
	r = router.NewApiRouter(controller)
	// server configuration
	srv := &http.Server{
		Addr:    fmt.Sprintf(":%s", a.conf.Server.Port),
		Handler: r,
	}
	// server initialization
	a.srv = server.NewHttpServer(a.conf.Server, srv, a.logger)

	return a
}
