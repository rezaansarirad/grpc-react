/**
 * @fileoverview gRPC-Web generated client stub for protobuf
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.5.0
// 	protoc              v5.26.1
// source: src/event.proto


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.protobuf = require('./event_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.protobuf.StreamServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname.replace(/\/+$/, '');

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.protobuf.StreamServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname.replace(/\/+$/, '');

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.protobuf.Request,
 *   !proto.protobuf.Response>}
 */
const methodDescriptor_StreamService_FetchResponse = new grpc.web.MethodDescriptor(
  '/protobuf.StreamService/FetchResponse',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.protobuf.Request,
  proto.protobuf.Response,
  /**
   * @param {!proto.protobuf.Request} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.protobuf.Response.deserializeBinary
);


/**
 * @param {!proto.protobuf.Request} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.protobuf.Response>}
 *     The XHR Node Readable Stream
 */
proto.protobuf.StreamServiceClient.prototype.fetchResponse =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/protobuf.StreamService/FetchResponse',
      request,
      metadata || {},
      methodDescriptor_StreamService_FetchResponse);
};


/**
 * @param {!proto.protobuf.Request} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.protobuf.Response>}
 *     The XHR Node Readable Stream
 */
proto.protobuf.StreamServicePromiseClient.prototype.fetchResponse =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/protobuf.StreamService/FetchResponse',
      request,
      metadata || {},
      methodDescriptor_StreamService_FetchResponse);
};


module.exports = proto.protobuf;

