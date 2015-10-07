(function() {
  'use strict';

  angular
    .module('gpApp')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($log, $timeout, $mdMedia, $mdSidenav) {
    var self = this;

    // Content Section
    self.toggleSection = toggleSection;
    self.activeSection = 0;

    // Playlist Sidenav
    self.toggleSidenav = toggleSidenav;
    self.sidenavIsOpen = false;

    // Content Panel
    self.toggleContent = toggleContent;
    self.contentIsOpen = true;

    activate();

    function activate() {
      self.sidenavIsOpen = $mdMedia('gt-lg') ? true : false;
    }


    /* Content Section Toggle
    –––––––––––––––––––––––––––––––––––––––––––––––––– */

    function toggleSection(section) {
      var previous = self.activeSection;

      // set new section
      self.activeSection  = section;

      // close content panel if open && same section
      if(self.contentIsOpen && previous === section) {
        $log.info('Close content panel');
        closeContent();
      }
      // open content panel if closed
      else if(!self.contentIsOpen || !$mdSidenav('left').isOpen()) {
        $log.info('Open content panel');
        openContent();
      }
    }


    /* Content Controls
    –––––––––––––––––––––––––––––––––––––––––––––––––– */

    function toggleContent() {
      if(self.contentIsOpen) {
        closeContent();
      }
      else {
        openContent();
      }
    }
    function closeContent() {
      self.contentIsOpen = false;
      $timeout(function() {
        $mdSidenav('left').close();
      }, 100);
    }
    function openContent() {
      self.contentIsOpen = true;
      $timeout(function() {
        $mdSidenav('left').open();
      }, 100);
    }


    /* Sidenav Controls
    –––––––––––––––––––––––––––––––––––––––––––––––––– */

    function toggleSidenav() {
      if(self.sidenavIsOpen) {
        closeSidenav();
        self.sidenavIsOpen = false;
      }
      else {
        openSidenav();
        self.sidenavIsOpen = true;
      }
    }
    function closeSidenav() {
      $timeout(function() {
        $mdSidenav('right').close();
      }, 100);

    }
    function openSidenav() {
      $timeout(function() {
        $mdSidenav('right').open();
      }, 100);
    }

  }
})();
