// ==UserScript==
// @name         Canvas Isolation Status
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Show the status of section isolation
// @author       D. Stuart Freeman
// @license      MIT
// @match        https://*.instructure.com/api/v1/courses/*/enrollments*
// @require http://code.jquery.com/jquery-1.12.4.min.js
// @require https://cdnjs.cloudflare.com/ajax/libs/jsrender/0.9.90/jsrender.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var template = $.templates("<div><p>{{:user.login_id}} - {{:user.short_name}} - Isolated: {{:limit_privileges_to_course_section}}</p></div>");
    var refresh = function(enrollments) {
        $('body').text('');
        for (var enrollment of enrollments) {
            //stat.created_at = new Date(stat.created_at).toLocaleString();
            $('body').append(template.render(enrollment));
        }
        setTimeout(function(){
            $.ajax({'url': document.url, 'dataFilter': function(data){return data.substr(data.indexOf(';') + 1);} ,'success': function(data) {console.log(data);refresh(data);}});
        }, 15000);
    };
    var enrollments = JSON.parse($('pre').text().substr($('pre').text().indexOf(';') + 1));
    refresh(enrollments);
})();
