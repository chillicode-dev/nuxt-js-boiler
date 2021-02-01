// Vendor
import queryString from 'query-string';
// Internals
import {HttpMethod} from '@/utils/enums';
import {concatLinks} from '@/utils/url';

/**
 * Wrapper around fetch() for AJAX requests
 * @class Api
 */
export default class Api {
  /**
   * Default requests options for all Api instances
   * @typedef {Object} ApiOptions
   * @property {string} route
   * @property {Object} [data]
   * @property {'json'|'urlencoded'|'plain'|'form-data'} [dataType]
   * @property {'json'|'text'|'formData'|'blob'|'arrayBuffer'} [convertResponseData]
   * @property {function(response: ApiResponse): void} [onResponse]
   * @property {function(response: ApiResponse): void} [onError]
   * @property {function(percentage: number, event: ProgressEvent): void} [onUploadProgress]
   * @property {function(event: ProgressEvent): void} [onUploadProgressStart]
   * @property {function(event: ProgressEvent): void} [onUploadProgressEnd]
   * @property {Object} [statusMessages]
   * @property {Object} [headers]
   * @property {'fetch'|'xhr'} [executor]
   */
  static defaultOptions = {
    route: '/',
    data: {},
    dataType: 'json',
    convertResponseData: 'json',
    onResponse: () => {},
    onError: () => {},
    onUploadProgress: () => {},
    onUploadProgressStart: () => {},
    onUploadProgressEnd: () => {},
    statusMessages: {},
    headers: {},
    executor: 'fetch',
  };

  /**
   * Base API URL
   * @type {string}
   */
  baseUrl = '';

  /**
   * Options merged with Api.defaultOptions when instance created
   * @type {ApiOptions}
   */
  baseOptions = {};

  /**
   * @constructor
   * @param baseUrl {string}
   * @param options {ApiOptions=}
   */
  constructor(baseUrl, options = {}) {
    this.baseUrl = baseUrl;
    this.baseOptions = {
      ...Api.defaultOptions,
      ...options,
    };
  }

  /**
   * GET request
   * @param options {ApiOptions}
   * @return {Promise<ApiResponse>}
   */
  get(options) {
    return this.makeRequest(HttpMethod.GET, options);
  }

  /**
   * POST request
   * @param options {ApiOptions}
   * @return {Promise<ApiResponse>}
   */
  post(options) {
    return this.makeRequest(HttpMethod.POST, options);
  }

  /**
   * PUT request
   * @param options {ApiOptions}
   * @return {Promise<ApiResponse>}
   */
  put(options) {
    return this.makeRequest(HttpMethod.PUT, options);
  }

  /**
   * PATCH request
   * @param options {ApiOptions}
   * @return {Promise<ApiResponse>}
   */
  patch(options) {
    return this.makeRequest(HttpMethod.PATCH, options);
  }

  /**
   * DELETE request
   * @param options {ApiOptions}
   * @return {Promise<ApiResponse>}
   */
  delete(options) {
    return this.makeRequest(HttpMethod.DELETE, options);
  }

  /**
   * @typedef ApiResponse
   * @property success {boolean} - is status between 200 and 399
   * @property payload {any} - response data
   * @property status {number} - response status
   * @property message {string} - response message
   */

  /**
   * Common method for API requests
   * @async
   * @param method {HttpMethod}
   * @param options {ApiOptions}
   * @return {Promise<ApiResponse>}
   */
  async makeRequest(method, options) {
    /**
     * Create request specific options
     * @type {ApiOptions}
     */
    const reqOptions = {
      ...this.baseOptions,
      ...options,
    };

    // create headers per request
    if (typeof options.headers === 'object') {
      reqOptions.headers = {
        ...this.baseOptions.headers,
        ...options.headers,
      };
    }

    switch (reqOptions.executor) {
      case 'fetch':
        return await this.makeFetchRequest(method, reqOptions);
      case 'xhr':
        return await this.makeXhrRequest(method, reqOptions);
      default:
        return this.makeResponse({}, -1, 'Invalid executor');
    }
  }

  /**
   * Invokes request with fetch
   * @async
   * @param method {HttpMethod}
   * @param options {ApiOptions}
   * @return {Promise<ApiResponse>}
   */
  async makeFetchRequest(method, options) {
    try {
      // Create fetch init options
      const fetchOptions = this.makeFetchOptions(method, options);

      // Make request
      const response = await fetch(this.makeUrl(method, options), fetchOptions);
      const message = this.getResponseMessage(response, options.statusMessages);
      const payload = await response[options.convertResponseData]();

      if (this.isStatusSuccessful(response.status)) {
        // Success response
        const apiResponse = this.makeResponse(payload, response.status, message);
        options.onResponse(apiResponse);
        return apiResponse;
      } else {
        // Rejected response with status >= 400
        const apiResponse = this.makeResponse(payload, response.status, message);
        options.onError(apiResponse);
        return apiResponse;
      }
    } catch (err) {
      // Runtime and internet connection errors
      const apiResponse = this.makeResponse({}, 400, err.message);
      options.onError(apiResponse);
      return apiResponse;
    }
  }

  /**
   * Invokes request with XMLHttpRequest.
   * This allows you to use 'onUploadProgress' event
   * @param method {HttpMethod}
   * @param options {ApiOptions}
   * @return {Promise<ApiResponse>}
   */
  makeXhrRequest(method, options) {
    return new Promise(resolve => {
      try {
        const xhr = new XMLHttpRequest();
        let body = options.data;

        xhr.responseType = options.convertResponseData;

        xhr.upload.onprogress = event => {
          const percentage = Math.floor((event.loaded / event.total) * 100);

          if (percentage === 0) {
            return options.onUploadProgressStart(event);
          }

          if (percentage === 100) {
            return options.onUploadProgressEnd(event);
          }

          return options.onUploadProgress(percentage, event);
        };

        xhr.onloadend = () => {
          const message = this.getResponseMessage(xhr, options.statusMessages);
          const payload = xhr.response || xhr.responseText;

          if (this.isStatusSuccessful(xhr.status)) {
            // Success response
            const apiResponse = this.makeResponse(payload, xhr.status, message);
            options.onResponse(apiResponse);
            return resolve(apiResponse);
          } else {
            // Rejected response with status >= 400
            const apiResponse = this.makeResponse(payload, xhr.status, message);
            options.onError(apiResponse);
            return resolve(apiResponse);
          }
        };

        xhr.open(method, this.makeUrl(method, options), true);

        // populate body by content specific headers and data conversions if method is not GET
        if (method !== HttpMethod.GET) {
          switch (options.dataType) {
            case 'json': {
              body = JSON.stringify(options.data);
              xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
              break;
            }
            case 'urlencoded': {
              body = queryString.stringify(options.data);
              xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
              break;
            }
          }
        }

        // Set headers
        for (const [header, value] of Object.entries(options.headers)) {
          xhr.setRequestHeader(header, value);
        }

        xhr.send(body);
      } catch (err) {
        // Runtime and internet connection errors
        const apiResponse = this.makeResponse({}, 400, err.message);
        options.onError(apiResponse);
        return resolve(apiResponse);
      }
    });
  }

  /**
   *
   * @param method {HttpMethod}
   * @param reqOptions {ApiOptions}
   * @return {string}
   */
  makeUrl(method, reqOptions) {
    const url = concatLinks(this.baseUrl, reqOptions.route);

    // populate query string params with data fields
    if (method === HttpMethod.GET && Object.keys(reqOptions.data).length > 0) {
      return `${url}?${queryString.stringify(reqOptions.data, {arrayFormat: 'bracket'})}`;
    }

    return url;
  }

  /**
   *
   * @param method {HttpMethod}
   * @param reqOptions {ApiOptions}
   * @return {Object}
   */
  makeFetchOptions(method, reqOptions) {
    const options = {
      method,
      headers: {},
    };

    // populate body by content specific headers and data conversions if method is not GET
    if (method !== HttpMethod.GET) {
      switch (reqOptions.dataType) {
        case 'json': {
          options.body = JSON.stringify(reqOptions.data);
          options.headers['Content-Type'] = 'application/json;charset=utf-8';
          break;
        }
        case 'urlencoded': {
          options.body = queryString.stringify(reqOptions.data);
          options.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
          break;
        }
        case 'form-data': {
          options.body = reqOptions.data;
          break;
        }
        default:
          options.body = reqOptions.data;
      }
    }

    // merge content specific headers and user request headers
    options.headers = {
      ...options.headers,
      ...reqOptions.headers,
    };

    return options;
  }

  /**
   *
   * @param response {Response|XMLHttpRequest}
   * @param statusMessages {Object}
   * @return {string}
   */
  getResponseMessage(response, statusMessages) {
    for (const status in statusMessages) {
      if (Number(status) === response.status) {
        return statusMessages[status];
      }
    }

    return response.statusText || 'Unknown server error';
  }

  /**
   * @param status {number}
   * @return {boolean}
   */
  isStatusSuccessful(status) {
    return status >= 200 && status <= 399;
  }

  /**
   * Returns instance of ApiResponse
   * @param payload {*}
   * @param status {number}
   * @param message {string}
   * @return {ApiResponse}
   */
  makeResponse(payload, status, message) {
    return {
      success: this.isStatusSuccessful(status),
      payload,
      status,
      message,
    };
  }
}
