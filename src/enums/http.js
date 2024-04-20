// Informational HTTP Status Codes
export let HttpInformational;
(function (HttpInformational) {
  HttpInformational[(HttpInformational['Continue'] = 100)] = 'Continue';
  HttpInformational[(HttpInformational['SwitchingProtocols'] = 101)] = 'SwitchingProtocols';
  HttpInformational[(HttpInformational['Processing'] = 102)] = 'Processing';
  HttpInformational[(HttpInformational['EarlyHints'] = 103)] = 'EarlyHints';
})(HttpInformational || (HttpInformational = {}));

// Success HTTP Status Codes
export let HttpSuccess;
(function (HttpSuccess) {
  HttpSuccess[(HttpSuccess['Ok'] = 200)] = 'Ok';
  HttpSuccess[(HttpSuccess['Created'] = 201)] = 'Created';
  HttpSuccess[(HttpSuccess['Accepted'] = 202)] = 'Accepted';
  HttpSuccess[(HttpSuccess['NonAuthoritativeInformation'] = 203)] = 'NonAuthoritativeInformation';
  HttpSuccess[(HttpSuccess['NoContent'] = 204)] = 'NoContent';
  HttpSuccess[(HttpSuccess['ResetContent'] = 205)] = 'ResetContent';
  HttpSuccess[(HttpSuccess['PartialContent'] = 206)] = 'PartialContent';
  HttpSuccess[(HttpSuccess['MultiStatus'] = 207)] = 'MultiStatus';
  HttpSuccess[(HttpSuccess['AlreadyReported'] = 208)] = 'AlreadyReported';
  HttpSuccess[(HttpSuccess['IMUsed'] = 226)] = 'IMUsed';
})(HttpSuccess || (HttpSuccess = {}));

// Redirection HTTP Status Codes
export let HttpRedirection;
(function (HttpRedirection) {
  HttpRedirection[(HttpRedirection['MultipleChoices'] = 300)] = 'MultipleChoices';
  HttpRedirection[(HttpRedirection['MovedPermanently'] = 301)] = 'MovedPermanently';
  HttpRedirection[(HttpRedirection['Found'] = 302)] = 'Found';
  HttpRedirection[(HttpRedirection['SeeOther'] = 303)] = 'SeeOther';
  HttpRedirection[(HttpRedirection['NotModified'] = 304)] = 'NotModified';
  HttpRedirection[(HttpRedirection['UseProxy'] = 305)] = 'UseProxy';
  HttpRedirection[(HttpRedirection['SwitchProxy'] = 306)] = 'SwitchProxy';
  HttpRedirection[(HttpRedirection['TemporaryRedirect'] = 307)] = 'TemporaryRedirect';
  HttpRedirection[(HttpRedirection['PermanentRedirect'] = 308)] = 'PermanentRedirect';
})(HttpRedirection || (HttpRedirection = {}));

// Client Error HTTP Status Codes
export let HttpClientError;
(function (HttpClientError) {
  HttpClientError[(HttpClientError['BadRequest'] = 400)] = 'BadRequest';
  HttpClientError[(HttpClientError['Unauthorized'] = 401)] = 'Unauthorized';
  HttpClientError[(HttpClientError['PaymentRequired'] = 402)] = 'PaymentRequired';
  HttpClientError[(HttpClientError['Forbidden'] = 403)] = 'Forbidden';
  HttpClientError[(HttpClientError['NotFound'] = 404)] = 'NotFound';
  HttpClientError[(HttpClientError['MethodNotAllowed'] = 405)] = 'MethodNotAllowed';
  HttpClientError[(HttpClientError['NotAcceptable'] = 406)] = 'NotAcceptable';
  HttpClientError[(HttpClientError['ProxyAuthenticationRequired'] = 407)] = 'ProxyAuthenticationRequired';
  HttpClientError[(HttpClientError['RequestTimeout'] = 408)] = 'RequestTimeout';
  HttpClientError[(HttpClientError['Conflict'] = 409)] = 'Conflict';
  HttpClientError[(HttpClientError['Gone'] = 410)] = 'Gone';
  HttpClientError[(HttpClientError['LengthRequired'] = 411)] = 'LengthRequired';
  HttpClientError[(HttpClientError['PreconditionFailed'] = 412)] = 'PreconditionFailed';
  HttpClientError[(HttpClientError['PayloadTooLarge'] = 413)] = 'PayloadTooLarge';
  HttpClientError[(HttpClientError['URITooLong'] = 414)] = 'URITooLong';
  HttpClientError[(HttpClientError['UnsupportedMediaType'] = 415)] = 'UnsupportedMediaType';
  HttpClientError[(HttpClientError['RangeNotSatisfiable'] = 416)] = 'RangeNotSatisfiable';
  HttpClientError[(HttpClientError['ExpectationFailed'] = 417)] = 'ExpectationFailed';
  HttpClientError[(HttpClientError['ImATeapot'] = 418)] = 'ImATeapot';
  HttpClientError[(HttpClientError['MisdirectedRequest'] = 421)] = 'MisdirectedRequest';
  HttpClientError[(HttpClientError['UnprocessableEntity'] = 422)] = 'UnprocessableEntity';
  HttpClientError[(HttpClientError['Locked'] = 423)] = 'Locked';
  HttpClientError[(HttpClientError['FailedDependency'] = 424)] = 'FailedDependency';
  HttpClientError[(HttpClientError['TooEarly'] = 425)] = 'TooEarly';
  HttpClientError[(HttpClientError['UpgradeRequired'] = 426)] = 'UpgradeRequired';
  HttpClientError[(HttpClientError['PreconditionRequired'] = 428)] = 'PreconditionRequired';
  HttpClientError[(HttpClientError['TooManyRequests'] = 429)] = 'TooManyRequests';
  HttpClientError[(HttpClientError['RequestHeaderFieldsTooLarge'] = 431)] = 'RequestHeaderFieldsTooLarge';
  HttpClientError[(HttpClientError['UnavailableForLegalReasons'] = 451)] = 'UnavailableForLegalReasons';
})(HttpClientError || (HttpClientError = {}));

// Server Error HTTP Status Codes
export let HttpServerError;
(function (HttpServerError) {
  HttpServerError[(HttpServerError['InternalServerError'] = 500)] = 'InternalServerError';
  HttpServerError[(HttpServerError['NotImplemented'] = 501)] = 'NotImplemented';
  HttpServerError[(HttpServerError['BadGateway'] = 502)] = 'BadGateway';
  HttpServerError[(HttpServerError['ServiceUnavailable'] = 503)] = 'ServiceUnavailable';
  HttpServerError[(HttpServerError['GatewayTimeout'] = 504)] = 'GatewayTimeout';
  HttpServerError[(HttpServerError['HTTPVersionNotSupported'] = 505)] = 'HTTPVersionNotSupported';
  HttpServerError[(HttpServerError['VariantAlsoNegotiates'] = 506)] = 'VariantAlsoNegotiates';
  HttpServerError[(HttpServerError['InsufficientStorage'] = 507)] = 'InsufficientStorage';
  HttpServerError[(HttpServerError['LoopDetected'] = 508)] = 'LoopDetected';
  HttpServerError[(HttpServerError['NotExtended'] = 510)] = 'NotExtended';
  HttpServerError[(HttpServerError['NetworkAuthenticationRequired'] = 511)] = 'NetworkAuthenticationRequired';
})(HttpServerError || (HttpServerError = {}));
