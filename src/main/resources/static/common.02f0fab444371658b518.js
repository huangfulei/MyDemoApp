(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{Nagw:function(t,n,o){"use strict";o.d(n,"a",(function(){return c}));var e=o("mrSG"),r=o("8IAd"),i=o("oUVn"),a=o("CcnG"),c=function(t){function n(){var n=t.call(this)||this;return n.MODEL_NAME="product",n.CART_ENDPOINT=r.a.CART,n.ADD_TO_CART_ENDPOINT=n.CART_ENDPOINT+r.a.ADD_TO_CART,t.prototype.setApiEndpoint.call(n,n.CART_ENDPOINT),t.prototype.setModelName.call(n,n.MODEL_NAME),n}return e.c(n,t),n.prototype.addItemToCart=function(t){return this.simplePost(this.ADD_TO_CART_ENDPOINT,t,this.MODEL_NAME)},n.ngInjectableDef=a.Rb({factory:function(){return new n},token:n,providedIn:"root"}),n}(i.a)}}]);