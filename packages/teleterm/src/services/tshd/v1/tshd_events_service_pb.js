// source: v1/tshd_events_service.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global = (function() { return this || window || global || self || Function('return this')(); }).call(null);

goog.exportSymbol('proto.teleport.terminal.v1.CannotProxyGatewayConnection', null, global);
goog.exportSymbol('proto.teleport.terminal.v1.GatewayCertExpired', null, global);
goog.exportSymbol('proto.teleport.terminal.v1.ReloginRequest', null, global);
goog.exportSymbol('proto.teleport.terminal.v1.ReloginRequest.ReasonCase', null, global);
goog.exportSymbol('proto.teleport.terminal.v1.ReloginResponse', null, global);
goog.exportSymbol('proto.teleport.terminal.v1.SendNotificationRequest', null, global);
goog.exportSymbol('proto.teleport.terminal.v1.SendNotificationRequest.SubjectCase', null, global);
goog.exportSymbol('proto.teleport.terminal.v1.SendNotificationResponse', null, global);
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
proto.teleport.terminal.v1.ReloginRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.teleport.terminal.v1.ReloginRequest.oneofGroups_);
};
goog.inherits(proto.teleport.terminal.v1.ReloginRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.teleport.terminal.v1.ReloginRequest.displayName = 'proto.teleport.terminal.v1.ReloginRequest';
}
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
proto.teleport.terminal.v1.GatewayCertExpired = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.teleport.terminal.v1.GatewayCertExpired, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.teleport.terminal.v1.GatewayCertExpired.displayName = 'proto.teleport.terminal.v1.GatewayCertExpired';
}
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
proto.teleport.terminal.v1.ReloginResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.teleport.terminal.v1.ReloginResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.teleport.terminal.v1.ReloginResponse.displayName = 'proto.teleport.terminal.v1.ReloginResponse';
}
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
proto.teleport.terminal.v1.SendNotificationRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.teleport.terminal.v1.SendNotificationRequest.oneofGroups_);
};
goog.inherits(proto.teleport.terminal.v1.SendNotificationRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.teleport.terminal.v1.SendNotificationRequest.displayName = 'proto.teleport.terminal.v1.SendNotificationRequest';
}
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
proto.teleport.terminal.v1.CannotProxyGatewayConnection = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.teleport.terminal.v1.CannotProxyGatewayConnection, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.teleport.terminal.v1.CannotProxyGatewayConnection.displayName = 'proto.teleport.terminal.v1.CannotProxyGatewayConnection';
}
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
proto.teleport.terminal.v1.SendNotificationResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.teleport.terminal.v1.SendNotificationResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.teleport.terminal.v1.SendNotificationResponse.displayName = 'proto.teleport.terminal.v1.SendNotificationResponse';
}

/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.teleport.terminal.v1.ReloginRequest.oneofGroups_ = [[2]];

/**
 * @enum {number}
 */
proto.teleport.terminal.v1.ReloginRequest.ReasonCase = {
  REASON_NOT_SET: 0,
  GATEWAY_CERT_EXPIRED: 2
};

/**
 * @return {proto.teleport.terminal.v1.ReloginRequest.ReasonCase}
 */
proto.teleport.terminal.v1.ReloginRequest.prototype.getReasonCase = function() {
  return /** @type {proto.teleport.terminal.v1.ReloginRequest.ReasonCase} */(jspb.Message.computeOneofCase(this, proto.teleport.terminal.v1.ReloginRequest.oneofGroups_[0]));
};



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
proto.teleport.terminal.v1.ReloginRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.teleport.terminal.v1.ReloginRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.teleport.terminal.v1.ReloginRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.teleport.terminal.v1.ReloginRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    rootClusterUri: jspb.Message.getFieldWithDefault(msg, 1, ""),
    gatewayCertExpired: (f = msg.getGatewayCertExpired()) && proto.teleport.terminal.v1.GatewayCertExpired.toObject(includeInstance, f)
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
 * @return {!proto.teleport.terminal.v1.ReloginRequest}
 */
proto.teleport.terminal.v1.ReloginRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.teleport.terminal.v1.ReloginRequest;
  return proto.teleport.terminal.v1.ReloginRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.teleport.terminal.v1.ReloginRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.teleport.terminal.v1.ReloginRequest}
 */
proto.teleport.terminal.v1.ReloginRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setRootClusterUri(value);
      break;
    case 2:
      var value = new proto.teleport.terminal.v1.GatewayCertExpired;
      reader.readMessage(value,proto.teleport.terminal.v1.GatewayCertExpired.deserializeBinaryFromReader);
      msg.setGatewayCertExpired(value);
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
proto.teleport.terminal.v1.ReloginRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.teleport.terminal.v1.ReloginRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.teleport.terminal.v1.ReloginRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.teleport.terminal.v1.ReloginRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getRootClusterUri();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getGatewayCertExpired();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.teleport.terminal.v1.GatewayCertExpired.serializeBinaryToWriter
    );
  }
};


/**
 * optional string root_cluster_uri = 1;
 * @return {string}
 */
proto.teleport.terminal.v1.ReloginRequest.prototype.getRootClusterUri = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.teleport.terminal.v1.ReloginRequest} returns this
 */
proto.teleport.terminal.v1.ReloginRequest.prototype.setRootClusterUri = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional GatewayCertExpired gateway_cert_expired = 2;
 * @return {?proto.teleport.terminal.v1.GatewayCertExpired}
 */
proto.teleport.terminal.v1.ReloginRequest.prototype.getGatewayCertExpired = function() {
  return /** @type{?proto.teleport.terminal.v1.GatewayCertExpired} */ (
    jspb.Message.getWrapperField(this, proto.teleport.terminal.v1.GatewayCertExpired, 2));
};


/**
 * @param {?proto.teleport.terminal.v1.GatewayCertExpired|undefined} value
 * @return {!proto.teleport.terminal.v1.ReloginRequest} returns this
*/
proto.teleport.terminal.v1.ReloginRequest.prototype.setGatewayCertExpired = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.teleport.terminal.v1.ReloginRequest.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.teleport.terminal.v1.ReloginRequest} returns this
 */
proto.teleport.terminal.v1.ReloginRequest.prototype.clearGatewayCertExpired = function() {
  return this.setGatewayCertExpired(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.teleport.terminal.v1.ReloginRequest.prototype.hasGatewayCertExpired = function() {
  return jspb.Message.getField(this, 2) != null;
};





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
proto.teleport.terminal.v1.GatewayCertExpired.prototype.toObject = function(opt_includeInstance) {
  return proto.teleport.terminal.v1.GatewayCertExpired.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.teleport.terminal.v1.GatewayCertExpired} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.teleport.terminal.v1.GatewayCertExpired.toObject = function(includeInstance, msg) {
  var f, obj = {
    gatewayUri: jspb.Message.getFieldWithDefault(msg, 1, ""),
    targetUri: jspb.Message.getFieldWithDefault(msg, 2, "")
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
 * @return {!proto.teleport.terminal.v1.GatewayCertExpired}
 */
proto.teleport.terminal.v1.GatewayCertExpired.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.teleport.terminal.v1.GatewayCertExpired;
  return proto.teleport.terminal.v1.GatewayCertExpired.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.teleport.terminal.v1.GatewayCertExpired} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.teleport.terminal.v1.GatewayCertExpired}
 */
proto.teleport.terminal.v1.GatewayCertExpired.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setGatewayUri(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setTargetUri(value);
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
proto.teleport.terminal.v1.GatewayCertExpired.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.teleport.terminal.v1.GatewayCertExpired.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.teleport.terminal.v1.GatewayCertExpired} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.teleport.terminal.v1.GatewayCertExpired.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getGatewayUri();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getTargetUri();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional string gateway_uri = 1;
 * @return {string}
 */
proto.teleport.terminal.v1.GatewayCertExpired.prototype.getGatewayUri = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.teleport.terminal.v1.GatewayCertExpired} returns this
 */
proto.teleport.terminal.v1.GatewayCertExpired.prototype.setGatewayUri = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string target_uri = 2;
 * @return {string}
 */
proto.teleport.terminal.v1.GatewayCertExpired.prototype.getTargetUri = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.teleport.terminal.v1.GatewayCertExpired} returns this
 */
proto.teleport.terminal.v1.GatewayCertExpired.prototype.setTargetUri = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





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
proto.teleport.terminal.v1.ReloginResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.teleport.terminal.v1.ReloginResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.teleport.terminal.v1.ReloginResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.teleport.terminal.v1.ReloginResponse.toObject = function(includeInstance, msg) {
  var f, obj = {

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
 * @return {!proto.teleport.terminal.v1.ReloginResponse}
 */
proto.teleport.terminal.v1.ReloginResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.teleport.terminal.v1.ReloginResponse;
  return proto.teleport.terminal.v1.ReloginResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.teleport.terminal.v1.ReloginResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.teleport.terminal.v1.ReloginResponse}
 */
proto.teleport.terminal.v1.ReloginResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
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
proto.teleport.terminal.v1.ReloginResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.teleport.terminal.v1.ReloginResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.teleport.terminal.v1.ReloginResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.teleport.terminal.v1.ReloginResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.teleport.terminal.v1.SendNotificationRequest.oneofGroups_ = [[1]];

/**
 * @enum {number}
 */
proto.teleport.terminal.v1.SendNotificationRequest.SubjectCase = {
  SUBJECT_NOT_SET: 0,
  CANNOT_PROXY_GATEWAY_CONNECTION: 1
};

/**
 * @return {proto.teleport.terminal.v1.SendNotificationRequest.SubjectCase}
 */
proto.teleport.terminal.v1.SendNotificationRequest.prototype.getSubjectCase = function() {
  return /** @type {proto.teleport.terminal.v1.SendNotificationRequest.SubjectCase} */(jspb.Message.computeOneofCase(this, proto.teleport.terminal.v1.SendNotificationRequest.oneofGroups_[0]));
};



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
proto.teleport.terminal.v1.SendNotificationRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.teleport.terminal.v1.SendNotificationRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.teleport.terminal.v1.SendNotificationRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.teleport.terminal.v1.SendNotificationRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    cannotProxyGatewayConnection: (f = msg.getCannotProxyGatewayConnection()) && proto.teleport.terminal.v1.CannotProxyGatewayConnection.toObject(includeInstance, f)
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
 * @return {!proto.teleport.terminal.v1.SendNotificationRequest}
 */
proto.teleport.terminal.v1.SendNotificationRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.teleport.terminal.v1.SendNotificationRequest;
  return proto.teleport.terminal.v1.SendNotificationRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.teleport.terminal.v1.SendNotificationRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.teleport.terminal.v1.SendNotificationRequest}
 */
proto.teleport.terminal.v1.SendNotificationRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.teleport.terminal.v1.CannotProxyGatewayConnection;
      reader.readMessage(value,proto.teleport.terminal.v1.CannotProxyGatewayConnection.deserializeBinaryFromReader);
      msg.setCannotProxyGatewayConnection(value);
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
proto.teleport.terminal.v1.SendNotificationRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.teleport.terminal.v1.SendNotificationRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.teleport.terminal.v1.SendNotificationRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.teleport.terminal.v1.SendNotificationRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCannotProxyGatewayConnection();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.teleport.terminal.v1.CannotProxyGatewayConnection.serializeBinaryToWriter
    );
  }
};


/**
 * optional CannotProxyGatewayConnection cannot_proxy_gateway_connection = 1;
 * @return {?proto.teleport.terminal.v1.CannotProxyGatewayConnection}
 */
proto.teleport.terminal.v1.SendNotificationRequest.prototype.getCannotProxyGatewayConnection = function() {
  return /** @type{?proto.teleport.terminal.v1.CannotProxyGatewayConnection} */ (
    jspb.Message.getWrapperField(this, proto.teleport.terminal.v1.CannotProxyGatewayConnection, 1));
};


/**
 * @param {?proto.teleport.terminal.v1.CannotProxyGatewayConnection|undefined} value
 * @return {!proto.teleport.terminal.v1.SendNotificationRequest} returns this
*/
proto.teleport.terminal.v1.SendNotificationRequest.prototype.setCannotProxyGatewayConnection = function(value) {
  return jspb.Message.setOneofWrapperField(this, 1, proto.teleport.terminal.v1.SendNotificationRequest.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.teleport.terminal.v1.SendNotificationRequest} returns this
 */
proto.teleport.terminal.v1.SendNotificationRequest.prototype.clearCannotProxyGatewayConnection = function() {
  return this.setCannotProxyGatewayConnection(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.teleport.terminal.v1.SendNotificationRequest.prototype.hasCannotProxyGatewayConnection = function() {
  return jspb.Message.getField(this, 1) != null;
};





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
proto.teleport.terminal.v1.CannotProxyGatewayConnection.prototype.toObject = function(opt_includeInstance) {
  return proto.teleport.terminal.v1.CannotProxyGatewayConnection.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.teleport.terminal.v1.CannotProxyGatewayConnection} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.teleport.terminal.v1.CannotProxyGatewayConnection.toObject = function(includeInstance, msg) {
  var f, obj = {
    gatewayUri: jspb.Message.getFieldWithDefault(msg, 1, ""),
    targetUri: jspb.Message.getFieldWithDefault(msg, 2, ""),
    error: jspb.Message.getFieldWithDefault(msg, 3, "")
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
 * @return {!proto.teleport.terminal.v1.CannotProxyGatewayConnection}
 */
proto.teleport.terminal.v1.CannotProxyGatewayConnection.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.teleport.terminal.v1.CannotProxyGatewayConnection;
  return proto.teleport.terminal.v1.CannotProxyGatewayConnection.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.teleport.terminal.v1.CannotProxyGatewayConnection} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.teleport.terminal.v1.CannotProxyGatewayConnection}
 */
proto.teleport.terminal.v1.CannotProxyGatewayConnection.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setGatewayUri(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setTargetUri(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setError(value);
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
proto.teleport.terminal.v1.CannotProxyGatewayConnection.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.teleport.terminal.v1.CannotProxyGatewayConnection.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.teleport.terminal.v1.CannotProxyGatewayConnection} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.teleport.terminal.v1.CannotProxyGatewayConnection.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getGatewayUri();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getTargetUri();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getError();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
};


/**
 * optional string gateway_uri = 1;
 * @return {string}
 */
proto.teleport.terminal.v1.CannotProxyGatewayConnection.prototype.getGatewayUri = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.teleport.terminal.v1.CannotProxyGatewayConnection} returns this
 */
proto.teleport.terminal.v1.CannotProxyGatewayConnection.prototype.setGatewayUri = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string target_uri = 2;
 * @return {string}
 */
proto.teleport.terminal.v1.CannotProxyGatewayConnection.prototype.getTargetUri = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.teleport.terminal.v1.CannotProxyGatewayConnection} returns this
 */
proto.teleport.terminal.v1.CannotProxyGatewayConnection.prototype.setTargetUri = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string error = 3;
 * @return {string}
 */
proto.teleport.terminal.v1.CannotProxyGatewayConnection.prototype.getError = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.teleport.terminal.v1.CannotProxyGatewayConnection} returns this
 */
proto.teleport.terminal.v1.CannotProxyGatewayConnection.prototype.setError = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};





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
proto.teleport.terminal.v1.SendNotificationResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.teleport.terminal.v1.SendNotificationResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.teleport.terminal.v1.SendNotificationResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.teleport.terminal.v1.SendNotificationResponse.toObject = function(includeInstance, msg) {
  var f, obj = {

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
 * @return {!proto.teleport.terminal.v1.SendNotificationResponse}
 */
proto.teleport.terminal.v1.SendNotificationResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.teleport.terminal.v1.SendNotificationResponse;
  return proto.teleport.terminal.v1.SendNotificationResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.teleport.terminal.v1.SendNotificationResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.teleport.terminal.v1.SendNotificationResponse}
 */
proto.teleport.terminal.v1.SendNotificationResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
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
proto.teleport.terminal.v1.SendNotificationResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.teleport.terminal.v1.SendNotificationResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.teleport.terminal.v1.SendNotificationResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.teleport.terminal.v1.SendNotificationResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};


goog.object.extend(exports, proto.teleport.terminal.v1);
