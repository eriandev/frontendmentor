declare global {
  interface DocumentEventMap {
    'region-change': CustomEvent<{ region: string | null }>
  }
}

export {}
