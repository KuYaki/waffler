package router

import (
	"github.com/go-chi/chi/v5"
	"net/http"
)

func NewRouter() *chi.Mux {
	r := chi.NewRouter()
	r.Get("/", func(writer http.ResponseWriter, request *http.Request) {
		writer.Write([]byte("Hello, world!"))
	})
	return r
}
