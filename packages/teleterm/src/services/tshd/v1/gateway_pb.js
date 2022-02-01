// source: v1/gateway.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.teleport.terminal.v1.Gateway', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.teleport.terminal.v1.Gateway = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.teleport.terminal.v1.Gateway, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.teleport.terminal.v1.Gateway.displayName = 'proto.teleport.terminal.v1.Gateway';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.teleport.terminal.v1.Gateway.prototype.toObject = function(opt_includeInstance) {
  return proto.teleport.terminal.v1.Gateway.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.teleport.terminal.v1.Gateway} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.teleport.terminal.v1.Gateway.toObject = function(includeInstance, msg) {
  var f, obj = {
    uri: jspb.Message.getFieldWithDefault(msg, 1, ""),
    targetName: jspb.Message.getFieldWithDefault(msg, 2, ""),
    targetUri: jspb.Message.getFieldWithDefault(msg, 3, ""),
    targetUser: jspb.Message.getFieldWithDefault(msg, 4, ""),
    localAddress: jspb.Message.getFieldWithDefault(msg, 5, ""),
    localPort: jspb.Message.getFieldWithDefault(msg, 6, ""),
    protocol: jspb.Message.getFieldWithDefault(msg, 7, ""),
    caCertPath: jspb.Message.getFieldWithDefault(msg, 8, ""),
    certPath: jspb.Message.getFieldWithDefault(msg, 9, ""),
    keyPath: jspb.Message.getFieldWithDefault(msg, 10, ""),
    nativeClientPath: jspb.Message.getFieldWithDefault(msg, 11, ""),
    nativeClientArgs: jspb.Message.getFieldWithDefault(msg, 12, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.teleport.terminal.v1.Gateway}
 */
proto.teleport.terminal.v1.Gateway.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.teleport.terminal.v1.Gateway;
  return proto.teleport.terminal.v1.Gateway.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.teleport.terminal.v1.Gateway} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.teleport.terminal.v1.Gateway}
 */
proto.teleport.terminal.v1.Gateway.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUri(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setTargetName(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setTargetUri(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setTargetUser(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setLocalAddress(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setLocalPort(value);
      break;
    case 7:
      var value = /** @type {string} */ (reader.readString());
      msg.setProtocol(value);
      break;
    case 8:
      var value = /** @type {string} */ (reader.readString());
      msg.setCaCertPath(value);
      break;
    case 9:
      var value = /** @type {string} */ (reader.readString());
      msg.setCertPath(value);
      break;
    case 10:
      var value = /** @type {string} */ (reader.readString());
      msg.setKeyPath(value);
      break;
    case 11:
      var value = /** @type {string} */ (reader.readString());
      msg.setNativeClientPath(value);
      break;
    case 12:
      var value = /** @type {string} */ (reader.readString());
      msg.setNativeClientArgs(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.teleport.terminal.v1.Gateway.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.teleport.terminal.v1.Gateway.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.teleport.terminal.v1.Gateway} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.teleport.terminal.v1.Gateway.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUri();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getTargetName();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getTargetUri();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getTargetUser();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getLocalAddress();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getLocalPort();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
  f = message.getProtocol();
  if (f.length > 0) {
    writer.writeString(
      7,
      f
    );
  }
  f = message.getCaCertPath();
  if (f.length > 0) {
    writer.writeString(
      8,
      f
    );
  }
  f = message.getCertPath();
  if (f.length > 0) {
    writer.writeString(
      9,
      f
    );
  }
  f = message.getKeyPath();
  if (f.length > 0) {
    writer.writeString(
      10,
      f
    );
  }
  f = message.getNativeClientPath();
  if (f.length > 0) {
    writer.writeString(
      11,
      f
    );
  }
  f = message.getNativeClientArgs();
  if (f.length > 0) {
    writer.writeString(
      12,
      f
    );
  }
};


/**
 * optional string uri = 1;
 * @return {string}
 */
proto.teleport.terminal.v1.Gateway.prototype.getUri = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.teleport.terminal.v1.Gateway} returns this
 */
proto.teleport.terminal.v1.Gateway.prototype.setUri = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string target_name = 2;
 * @return {string}
 */
proto.teleport.terminal.v1.Gateway.prototype.getTargetName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.teleport.terminal.v1.Gateway} returns this
 */
proto.teleport.terminal.v1.Gateway.prototype.setTargetName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string target_uri = 3;
 * @return {string}
 */
proto.teleport.terminal.v1.Gateway.prototype.getTargetUri = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.teleport.terminal.v1.Gateway} returns this
 */
proto.teleport.terminal.v1.Gateway.prototype.setTargetUri = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string target_user = 4;
 * @return {string}
 */
proto.teleport.terminal.v1.Gateway.prototype.getTargetUser = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.teleport.terminal.v1.Gateway} returns this
 */
proto.teleport.terminal.v1.Gateway.prototype.setTargetUser = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional string local_address = 5;
 * @return {string}
 */
proto.teleport.terminal.v1.Gateway.prototype.getLocalAddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.teleport.terminal.v1.Gateway} returns this
 */
proto.teleport.terminal.v1.Gateway.prototype.setLocalAddress = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional string local_port = 6;
 * @return {string}
 */
proto.teleport.terminal.v1.Gateway.prototype.getLocalPort = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.teleport.terminal.v1.Gateway} returns this
 */
proto.teleport.terminal.v1.Gateway.prototype.setLocalPort = function(value) {
  return jspb.Message.setProto3StringField(this, 6, value);
};


/**
 * optional string protocol = 7;
 * @return {string}
 */
proto.teleport.terminal.v1.Gateway.prototype.getProtocol = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};


/**
 * @param {string} value
 * @return {!proto.teleport.terminal.v1.Gateway} returns this
 */
proto.teleport.terminal.v1.Gateway.prototype.setProtocol = function(value) {
  return jspb.Message.setProto3StringField(this, 7, value);
};


/**
 * optional string ca_cert_path = 8;
 * @return {string}
 */
proto.teleport.terminal.v1.Gateway.prototype.getCaCertPath = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 8, ""));
};


/**
 * @param {string} value
 * @return {!proto.teleport.terminal.v1.Gateway} returns this
 */
proto.teleport.terminal.v1.Gateway.prototype.setCaCertPath = function(value) {
  return jspb.Message.setProto3StringField(this, 8, value);
};


/**
 * optional string cert_path = 9;
 * @return {string}
 */
proto.teleport.terminal.v1.Gateway.prototype.getCertPath = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 9, ""));
};


/**
 * @param {string} value
 * @return {!proto.teleport.terminal.v1.Gateway} returns this
 */
proto.teleport.terminal.v1.Gateway.prototype.setCertPath = function(value) {
  return jspb.Message.setProto3StringField(this, 9, value);
};


/**
 * optional string key_path = 10;
 * @return {string}
 */
proto.teleport.terminal.v1.Gateway.prototype.getKeyPath = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 10, ""));
};


/**
 * @param {string} value
 * @return {!proto.teleport.terminal.v1.Gateway} returns this
 */
proto.teleport.terminal.v1.Gateway.prototype.setKeyPath = function(value) {
  return jspb.Message.setProto3StringField(this, 10, value);
};


/**
 * optional string native_client_path = 11;
 * @return {string}
 */
proto.teleport.terminal.v1.Gateway.prototype.getNativeClientPath = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 11, ""));
};


/**
 * @param {string} value
 * @return {!proto.teleport.terminal.v1.Gateway} returns this
 */
proto.teleport.terminal.v1.Gateway.prototype.setNativeClientPath = function(value) {
  return jspb.Message.setProto3StringField(this, 11, value);
};


/**
 * optional string native_client_args = 12;
 * @return {string}
 */
proto.teleport.terminal.v1.Gateway.prototype.getNativeClientArgs = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 12, ""));
};


/**
 * @param {string} value
 * @return {!proto.teleport.terminal.v1.Gateway} returns this
 */
proto.teleport.terminal.v1.Gateway.prototype.setNativeClientArgs = function(value) {
  return jspb.Message.setProto3StringField(this, 12, value);
};


goog.object.extend(exports, proto.teleport.terminal.v1);
