export const ARC_0027_PREFIX = 'arc0027'
export const ARC_0027_CHANNEL_NAME = `${ARC_0027_PREFIX}:channel`
export const ARC_0027_ENABLE_REQUEST = `${ARC_0027_PREFIX}:enable:request`
export const ARC_0027_GET_PROVIDERS_REQUEST = `${ARC_0027_PREFIX}:get_providers:request`
export const ARC_0027_PROVIDER_ID = 'f6d1c86b-4493-42fb-b88d-a62407b4cdf6'
export const ARC_0027_SIGN_TXNS_REQUEST = `${ARC_0027_PREFIX}:sign_txns:request`

export const UNKNOWN_ERROR = 4000
export const METHOD_CANCELED_ERROR = 4001
export const METHOD_TIMED_OUT_ERROR = 4002
export const METHOD_NOT_SUPPORTED_ERROR = 4003
export const NETWORK_NOT_SUPPORTED_ERROR = 4004
export const UNAUTHORIZED_SIGNER_ERROR = 4100
export const INVALID_INPUT_ERROR = 4200
export const INVALID_GROUP_ID_ERROR = 4201
export const NO_ALGO_WALLET_INSTALLED = 4300
export const KIBISIS_NOT_INSTALLED = 4301

export const DEFAULT_REQUEST_TIMEOUT = 180000 // 3 minutes in milliseconds

export const ICON = 'data:image/jpeg;base64,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'
