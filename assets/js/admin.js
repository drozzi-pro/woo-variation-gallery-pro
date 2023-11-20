/*!
 * Variation Gallery for WooCommerce - Pro
 *
 * Author: Emran Ahmed ( emran.bd.08@gmail.com )
 * Date: 8/23/2022, 8:20:33 PM
 * Released under the GPLv3 license.
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/WooVariationGalleryAdminPro.js":
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WooVariationGalleryAdminPro": function() { return /* binding */ WooVariationGalleryAdminPro; }
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/*global woo_variation_gallery_admin */
var WooVariationGalleryAdminPro = function ($) {
  var WooVariationGalleryAdminPro = /*#__PURE__*/function () {
    function WooVariationGalleryAdminPro() {
      _classCallCheck(this, WooVariationGalleryAdminPro);
    }

    _createClass(WooVariationGalleryAdminPro, null, [{
      key: "ExtendMediaGrid",
      value: function ExtendMediaGrid() {
        (function (media) {
          wp.media.view.Attachment.prototype.template = wp.template('wvg_media_attachment');
        })(wp.media);
      }
    }, {
      key: "HandleDiv",
      value: function HandleDiv() {
        // Meta-Boxes - Open/close
        $(document.body).on('click', '.woo-variation-gallery-wrapper .handle-div', function () {
          $(this).closest('.woo-variation-gallery-postbox').toggleClass('closed');
          var ariaExpandedValue = !$(this).closest('.woo-variation-gallery-postbox').hasClass('closed');
          $(this).attr('aria-expanded', ariaExpandedValue);
        });
      }
    }, {
      key: "DefaultProductGallery",
      value: function DefaultProductGallery() {
        // $('.add_product_images').off('click', 'a')
        // Product gallery file uploads.
        var product_gallery_frame;
        var $image_gallery_ids = $('#product_image_gallery');
        var $product_images = $('#product_images_container').find('ul.product_images');
        $('.add_product_images').off('click', 'a').on('click', 'a', function (event) {
          var $el = $(this);
          event.preventDefault(); // If the media frame already exists, reopen it.

          if (product_gallery_frame) {
            product_gallery_frame.open();
            return;
          } // Create the media frame.


          product_gallery_frame = wp.media.frames.product_gallery = wp.media({
            // Set the title of the modal.
            title: $el.data('choose'),
            button: {
              text: $el.data('update')
            },
            states: [new wp.media.controller.Library({
              title: $el.data('choose'),
              filterable: 'all',
              multiple: true
            })]
          }); // When an image is selected, run a callback.

          product_gallery_frame.on('select', function () {
            var selection = product_gallery_frame.state().get('selection');
            var attachment_ids = $image_gallery_ids.val();
            selection.map(function (attachment) {
              attachment = attachment.toJSON();

              if (attachment.id) {
                attachment_ids = attachment_ids ? attachment_ids + ',' + attachment.id : attachment.id;
                var attachment_image = attachment.sizes && attachment.sizes.thumbnail ? attachment.sizes.thumbnail.url : attachment.url;
                var css_class = 'image';

                if (attachment.woo_variation_gallery_video) {
                  css_class += ' video';
                }

                $product_images.append('<li class="' + css_class + '" data-attachment_id="' + attachment.id + '"><img src="' + attachment_image + '" /><ul class="actions"><li><a href="#" class="delete" title="' + $el.data('delete') + '">' + $el.data('text') + '</a></li></ul></li>');
              }
            });
            $image_gallery_ids.val(attachment_ids);
          }); // Finally, open the modal.

          product_gallery_frame.open();
        });
      }
    }, {
      key: "ImageUploader",
      value: function ImageUploader() {
        $(document).off('click', '.add-woo-variation-gallery-image');
        $(document).off('click', '.woo-variation-gallery-images > li.image');
        $(document).off('click', '.woo_variation_gallery_media_video_popup_link');
        $(document).off('click', '.remove-woo-variation-gallery-image');
        $(document).on('click', '.add-woo-variation-gallery-image', this.AddImage);
        $(document).on('click', '.woo-variation-gallery-images > li.image', this.ChangeImage);
        $(document).on('click', '.remove-woo-variation-gallery-image', this.RemoveImage);
        $(document).on('click', '.woo_variation_gallery_media_video_popup_link', this.AttachmentVideoPopup);
        $('.woocommerce_variation').each(function () {
          var optionsWrapper = $(this).find('.options:first');
          var galleryWrapper = $(this).find('.woo-variation-gallery-wrapper');
          galleryWrapper.insertBefore(optionsWrapper);
        });
        $(document).trigger('woo_variation_gallery_admin_pro_image_uploader_attached', this);
      }
    }, {
      key: "ChangeImage",
      value: function ChangeImage(event) {
        var _this = this;

        event.preventDefault();
        event.stopPropagation(); // console.log($(this))
        // console.log($(this).index())

        var frame;
        var product_variation_id = $(this).closest('.woo-variation-gallery-wrapper').data('product_variation_id');
        var selected = $(this).find('input.wvg_variation_id_input').val();
        var index = $(this).index(); // console.log(product_variation_id)

        if (typeof wp !== 'undefined' && wp.media && wp.media.editor) {
          // If the media frame already exists, reopen it.
          if (frame) {
            frame.open();
            return;
          } // Create the media frame.


          frame = wp.media({
            title: woo_variation_gallery_admin.choose_image,
            button: {
              text: woo_variation_gallery_admin.update_image
            },

            /*states : [
                new wp.media.controller.Library({
                    title      : woo_variation_gallery_admin.choose_image,
                    filterable : 'all',
                    multiple   : 'add'
                })
            ],*/
            library: {
              type: ['image'] // [ 'video', 'image' ]

            } // multiple : true
            // multiple : 'add'

          }); // When an image is selected, run a callback.

          frame.on('select', function () {
            var images = frame.state().get('selection').toJSON();
            var html = images.map(function (image) {
              if (image.type === 'image') {
                var id = image.id,
                    woo_variation_gallery_video = image.woo_variation_gallery_video,
                    _image$sizes = image.sizes;
                _image$sizes = _image$sizes === void 0 ? {} : _image$sizes;
                var thumbnail = _image$sizes.thumbnail,
                    full = _image$sizes.full;
                var url = thumbnail ? thumbnail.url : full.url;
                var template = wp.template('woo-variation-gallery-image');
                return template({
                  id: id,
                  url: url,
                  product_variation_id: product_variation_id,
                  woo_variation_gallery_video: woo_variation_gallery_video
                });
              }
            }).join(''); // $(this).remove();
            //$(this).closest('.woo-variation-gallery-wrapper').find('.woo-variation-gallery-images').append(html);
            //$(this).closest('.woo-variation-gallery-wrapper').find('.woo-variation-gallery-images > li.image').eq(index).replaceWith(html);
            // $(this).closest('.woo-variation-gallery-wrapper').find('.woo-variation-gallery-images > li.image').eq(index).after(html);

            $(_this).after(html);

            _.delay(function () {
              $(_this).remove();
            }, 1); // Variation Changed


            WooVariationGalleryAdminPro.Sortable();
            WooVariationGalleryAdminPro.VariationChanged(_this);
          });
          frame.on('open', function () {
            var selection = frame.state().get('selection');

            if (selected > 0) {
              var attachment = wp.media.attachment(selected);
              attachment.fetch();
              selection.add(attachment ? [attachment] : []);
            }
          }); // Finally, open the modal.

          frame.open();
        }
      }
    }, {
      key: "AddImage",
      value: function AddImage(event) {
        var _this2 = this;

        event.preventDefault();
        event.stopPropagation();
        var frame;
        var product_variation_id = $(this).closest('.woo-variation-gallery-wrapper').data('product_variation_id');
        var selected = $(this).find('input.wvg_variation_id_input').val(); // console.log(product_variation_id)

        if (typeof wp !== 'undefined' && wp.media && wp.media.editor) {
          // If the media frame already exists, reopen it.
          if (frame) {
            frame.open();
            return;
          } // Create the media frame.


          frame = wp.media({
            title: woo_variation_gallery_admin.choose_image,
            button: {
              text: woo_variation_gallery_admin.add_image
            },

            /*states : [
                new wp.media.controller.Library({
                    title      : woo_variation_gallery_admin.choose_image,
                    filterable : 'all',
                    multiple   : 'add'
                })
            ],*/
            library: {
              type: ['image'] // [ 'video', 'image' ]

            },
            // multiple : true
            multiple: 'add'
          }); // When an image is selected, run a callback.

          frame.on('select', function () {
            var images = frame.state().get('selection').toJSON();
            var html = images.map(function (image) {
              if (image.type === 'image') {
                var id = image.id,
                    woo_variation_gallery_video = image.woo_variation_gallery_video,
                    _image$sizes2 = image.sizes;
                _image$sizes2 = _image$sizes2 === void 0 ? {} : _image$sizes2;
                var thumbnail = _image$sizes2.thumbnail,
                    full = _image$sizes2.full;
                var url = thumbnail ? thumbnail.url : full.url;
                var template = wp.template('woo-variation-gallery-image');
                return template({
                  id: id,
                  url: url,
                  product_variation_id: product_variation_id,
                  woo_variation_gallery_video: woo_variation_gallery_video
                });
              }
            }).join('');
            $(_this2).closest('.woo-variation-gallery-wrapper').find('.woo-variation-gallery-images').append(html);

            _.delay(function () {
              if ($(_this2).is('li.image')) {
                $(_this2).remove();
              }
            }, 1); // Variation Changed


            WooVariationGalleryAdminPro.Sortable();
            WooVariationGalleryAdminPro.VariationChanged(_this2);
          });
          /*
                          frame.on('open', () => {
                              let selection = frame.state().get('selection');
                               if (selected > 0) {
                                  let attachment = wp.media.attachment(selected);
                                  attachment.fetch();
                                  selection.add(attachment ? [attachment] : []);
                              }
                          });
          */
          // Finally, open the modal.

          frame.open();
        }
      }
    }, {
      key: "VariationChanged",
      value: function VariationChanged($el) {
        $($el).closest('.woocommerce_variation').addClass('variation-needs-update');
        $('button.cancel-variation-changes, button.save-variation-changes').removeAttr('disabled');
        $('#variable_product_options').trigger('woocommerce_variations_input_changed'); // Dokan Support

        $($el).closest('.dokan-product-variation-itmes').addClass('variation-needs-update');
        $('.dokan-product-variation-wrapper').trigger('dokan_variations_input_changed');
        $(document).trigger('woo_variation_gallery_admin_variation_changed', this);
      }
    }, {
      key: "RemoveImage",
      value: function RemoveImage(event) {
        var _this3 = this;

        event.preventDefault();
        event.stopPropagation(); // Variation Changed

        WooVariationGalleryAdminPro.VariationChanged(this);

        _.delay(function () {
          $(_this3).parent().remove();
        }, 1);
      }
    }, {
      key: "Sortable",
      value: function Sortable() {
        $('.woo-variation-gallery-images').sortable({
          items: 'li.image',
          cursor: 'move',
          scrollSensitivity: 40,
          forcePlaceholderSize: true,
          forceHelperSize: false,
          helper: 'clone',
          opacity: 0.65,
          placeholder: 'woo-variation-gallery-sortable-placeholder',
          start: function start(event, ui) {
            ui.item.css('background-color', '#F6F6F6');
          },
          stop: function stop(event, ui) {
            ui.item.removeAttr('style');
          },
          update: function update() {
            // Variation Changed
            WooVariationGalleryAdminPro.VariationChanged(this);
          }
        });
      }
    }, {
      key: "AttachmentVideoPopup",
      value: function AttachmentVideoPopup(event) {
        var _this4 = this;

        event.preventDefault();
        event.stopPropagation();
        var frame;

        if (typeof wp !== 'undefined' && wp.media && wp.media.editor) {
          // If the media frame already exists, reopen it.
          if (frame) {
            frame.open();
            return;
          } // Create the media frame.


          frame = wp.media({
            title: woo_variation_gallery_admin.choose_video,
            button: {
              text: woo_variation_gallery_admin.add_video
            },

            /*states : [
                new wp.media.controller.Library({
                    title      : woo_variation_gallery_admin.choose_image,
                    filterable : 'all',
                    multiple   : 'add'
                })
            ],*/
            library: {
              type: ['video'] // [ 'video', 'image' ]

            },
            multiple: false
          }); // When an image is selected, run a callback.

          frame.on('select', function () {
            var video = frame.state().get('selection').first().toJSON();

            if (video.type === 'video') {
              $(_this4).closest('.compat-attachment-fields').find('.compat-field-woo_variation_gallery_media_video input').val(video.url).change();
            }
          });
          frame.on('open', function () {
            frame.$el.find('.media-frame-content').addClass('wvg-media-frame-modify');
          }); // Finally, open the modal.

          frame.open();
        }
      }
    }]);

    return WooVariationGalleryAdminPro;
  }();

  return WooVariationGalleryAdminPro;
}(jQuery);



/***/ }),

/***/ "./src/js/backend.js":
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

jQuery(function ($) {
  Promise.resolve().then(function () {
    return _interopRequireWildcard(__webpack_require__("./src/js/WooVariationGalleryAdminPro.js"));
  }).then(function (_ref) {
    var WooVariationGalleryAdminPro = _ref.WooVariationGalleryAdminPro;
    // WooVariationGalleryAdminPro.GWPAdmin()
    WooVariationGalleryAdminPro.ExtendMediaGrid();
    WooVariationGalleryAdminPro.DefaultProductGallery();
    WooVariationGalleryAdminPro.ImageUploader();
    WooVariationGalleryAdminPro.HandleDiv();
    $('#woocommerce-product-data').on('woocommerce_variations_loaded', function () {
      WooVariationGalleryAdminPro.ImageUploader();
      WooVariationGalleryAdminPro.Sortable();
    });
    $('#variable_product_options').on('woocommerce_variations_added', function () {
      WooVariationGalleryAdminPro.ImageUploader();
      WooVariationGalleryAdminPro.Sortable();
    }); // Dokan Pro Support

    $('.dokan-product-variation-wrapper').on('dokan_variations_loaded dokan_variations_added', function () {
      WooVariationGalleryAdminPro.ImageUploader();
      WooVariationGalleryAdminPro.Sortable();
    });
    $(document).trigger('woo_variation_gallery_pro_admin_loaded');
  });
}); // end of jquery main wrapper

/***/ }),

/***/ "./src/scss/backend.scss":
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/assets/js/admin": 0,
/******/ 			"assets/css/admin": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkwoo_variation_gallery_pro"] = self["webpackChunkwoo_variation_gallery_pro"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["assets/css/admin"], function() { return __webpack_require__("./src/js/backend.js"); })
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["assets/css/admin"], function() { return __webpack_require__("./src/scss/backend.scss"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;