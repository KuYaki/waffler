package modules

import (
	"github.com/yaroslavvasilenko/waffler/internal/modules/waffler/controller"
	"go.uber.org/zap"
)

type Controllers struct {
	Waffler controller.Waffler
}

func NewControllers(zapLog *zap.Logger) *Controllers {
	authController := controller.NewWaffl(zapLog)

	return &Controllers{
		Waffler: authController,
	}
}
