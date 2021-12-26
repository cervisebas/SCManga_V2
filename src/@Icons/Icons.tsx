import React, { Component } from "react";
import { StyleProp, ViewStyle } from "react-native";
import SearchIcon from './magnify.svg';
import HeartOffIcon from './heart-off-outline.svg';
import AlertIcon from './alert.svg';

const Search = (props: { width?: number, height?: number, style?: StyleProp<ViewStyle> })=> {
  var width: number = (props.width == undefined)? 64: props.width;
  var height: number = (props.height == undefined)? 64: props.height;
  return(<SearchIcon width={width} height={height} style={props.style} />);
};
const HeartOff = (props: { width?: number, height?: number, style?: StyleProp<ViewStyle> })=> {
  var width: number = (props.width == undefined)? 64: props.width;
  var height: number = (props.height == undefined)? 64: props.height;
  return(<HeartOffIcon width={width} height={height} style={props.style} />);
};
const Alert = (props: { width?: number, height?: number, style?: StyleProp<ViewStyle> })=> {
  var width: number = (props.width == undefined)? 64: props.width;
  var height: number = (props.height == undefined)? 64: props.height;
  return(<AlertIcon width={width} height={height} style={props.style} />);
};

export {
  Search,
  HeartOff,
  Alert
};