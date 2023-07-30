package router

import (
	"github.com/go-chi/chi/v5"
	"github.com/yaroslavvasilenko/waffler/internal/modules"
)

func NewApiRouter(controllers *modules.Controllers) *chi.Mux {
	r := chi.NewRouter()

	r.Get("/", controllers.Waffler.Hello)

	return r
}
