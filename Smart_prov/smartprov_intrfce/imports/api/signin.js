import { Mongo } from 'meteor/mongo';
 
export const sig = new Mongo.Collection('tab_det');
export const docs = new Mongo.Collection('Doc_tracker');