/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2014, Groupon, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
import qwest from 'qwest';
import {stringify} from 'qs';
export function recentProjects(){
  return _get(window.rootURL + '/recentProjects/');
}
export function cancelBuild(url){
  return qwest.post(`${window.rootURL}/${url}`)
}
export function buildLog(buildNumber,subBuild){
  const consoleUrl = subBuild === 'main'?`${_jobUrl()}/${buildNumber}/logTail`: `${_jobUrl()}/${buildNumber}/script=${subBuild}/logTail`;
  return qwest.get(consoleUrl,{},{responseType: 'text'}).catch((error,url)=> {
    console.log(error)
  });
}
export function build(buildNumber){
  return _get(`${_jobApiUrl()}/build/${buildNumber}`,{tree:'*,commit[*],cause[*]'});
}
export function job(tree, branchTab,count){
  return _get(_jobApiUrl()+"/info/",{tree,branchTab,count});
}

export function removeBranchTab(tabRegex){
  qwest.post( `${_jobUrl()}/removeBranchTab?tabRegex=`+tabRegex);
}
export function addBranchTab(tabRegex){
  qwest.post(`${_jobUrl()}/addBranchTab?tabRegex=`+tabRegex);
}

export function fetchBuildHistory(tab,count) {
  return _get(`${_jobApiUrl()}/buildHistory/${tab}`,{depth:2, count: count || 20});
}
function _jobUrl(){
  return jobUrl;
}
function _jobApiUrl() {
  const url =  _jobUrl()+ 'appData';
  return url;
}
function _get(url, params){
  let fetchUrl = params?`${url}?${stringify(params)}`: url;
  return qwest.get(fetchUrl,{},{responseType: 'json'});
}

