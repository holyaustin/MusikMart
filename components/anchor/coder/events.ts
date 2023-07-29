import { Idl, Event, EventCoder } from '@coral-xyz/anchor'
import { IdlEvent } from '@coral-xyz/anchor/dist/cjs/idl'

export class PythOracleEventCoder implements EventCoder {
  decode<E extends IdlEvent = IdlEvent, T = Record<string, string>>(_log: string): Event<E, T> | null {
    throw new Error('Pyth oracle program does not have events')
  }
}
