import { format, createLogger, transports } from 'winston'

const { combine, timestamp, label, colorize, printf, prettyPrint } = format

const customFormat = printf(
  ({ level, message, label, timestamp }) =>
    `${timestamp} [${label}] ${level}: ${message}`,
)

const logger = createLogger({
  level: 'info',
  format: combine(
    label({ label: 'CATEG' }),
    timestamp(),
    colorize(),
    prettyPrint(),
    customFormat,
  ),
  transports: [new transports.Console()],
})

export default logger
