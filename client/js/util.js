'use strict';

util.loadInfoArea = function() {
   var mainInfoTab = util.createInfoTab('main', 'Main', true, true) +
                     util.createInfoTab('map', 'Map', true);
   var mainInfoArea = '<div id="info-main" class="info core-info active-info">' +
                       '<div>CO</div>' +
                       '<div>CO Power</div>' +
                       '<div>Units Alive</div>' +
                       '<div>Game Clock</div>' +
                       '<button onclick="endTurn();">End Turn</button>' +
                      '</div>' +
                      '<div id="info-map" class="info core-info">' +
                       '<div>Map Name</div>' +
                       '<div>Map Diagram</div>' +
                       '<div>Map Info</div>' +
                      '</div>';

   document.querySelector('.info-area .tabs').innerHTML = mainInfoTab;
   document.querySelector('.info-area .infos').innerHTML = mainInfoArea;
};

util.selectInfo = function(infoNameBase) {
   var activeTab = document.querySelector('.info-area .tabs .active-tab');
   var activeInfo = document.querySelector('.info-area .infos .active-info');

   // The active one may have been removed.
   if (activeTab) {
      activeTab.className = activeTab.className.replace(/\bactive-tab\b/, '');
   }

   if (activeInfo) {
      activeInfo.className = activeInfo.className.replace(/\bactive-info\b/, '');
   }

   document.querySelector('.info-area .tabs #tab-' + infoNameBase).classList.add('active-tab');
   document.querySelector('.info-area .infos #info-' + infoNameBase).classList.add('active-info');
};

util.createInfoTab = function(infoNameBase, name, isCoreTab, isActive) {
   return '<div id="tab-' + infoNameBase + '" class="tab ' + (isCoreTab ? 'core-tab' : 'extra-tab') +
          (isActive ? ' active-tab' : '') + '"' +
          ' onClick="util.selectInfo(\'' + infoNameBase + '\');"><p>' + name + '</p></div>';
};

util.clearExtraInfos = function() {
   var tabs = document.querySelector('.info-area .tabs');
   var infos = document.querySelector('.info-area .infos');

   var extraTabs = tabs.querySelectorAll('.extra-tab');
   var extraInfos = infos.querySelectorAll('.extra-info');

   // Number of tabs and infos better be the same.
   for (var i = 0; i < extraTabs.length; i++) {
      tabs.removeChild(extraTabs[i]);
      infos.removeChild(extraInfos[i]);
   }

   util.selectInfo('main');
};
