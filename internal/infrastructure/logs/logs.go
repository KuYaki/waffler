package logs

import (
	"github.com/yaroslavvasilenko/waffler/config"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

const (
	Debug  = "debug"
	Info   = "info"
	Empty  = ""
	Warn   = "warn"
	Error  = "error"
	Dpanic = "dpanic"
	Panic  = "panic"
	Fatal  = "fatal"
)

func NewLogger(conf config.AppConf, sync zapcore.WriteSyncer) *zap.Logger {
	levels := map[string]zapcore.Level{
		Debug:  zapcore.DebugLevel,
		Info:   zapcore.InfoLevel,
		Empty:  zapcore.InfoLevel,
		Warn:   zapcore.WarnLevel,
		Error:  zapcore.ErrorLevel,
		Dpanic: zapcore.DPanicLevel,
		Panic:  zapcore.PanicLevel,
		Fatal:  zapcore.FatalLevel,
	}

	zapConf := zap.NewProductionConfig()
	zapConf.EncoderConfig.EncodeTime = zapcore.ISO8601TimeEncoder
	zapConf.EncoderConfig.EncodeDuration = zapcore.SecondsDurationEncoder
	atom := zap.NewAtomicLevelAt(levels[conf.Logger.Level])
	zapConf.Level = atom
	core := zapcore.NewCore(
		zapcore.NewJSONEncoder(zapConf.EncoderConfig),
		sync,
		atom,
	)

	logger := zap.New(core, zap.AddCaller(), zap.AddStacktrace(zapcore.ErrorLevel))

	return logger.Named(conf.AppName)
}
