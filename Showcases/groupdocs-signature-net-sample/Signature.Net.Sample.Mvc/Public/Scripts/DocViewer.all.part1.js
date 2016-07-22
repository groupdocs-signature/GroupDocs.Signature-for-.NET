(function ($, undefined) {
    $.widget('ui.docViewer', {
        _viewModel: null,
        options: {
            fileId: 0,
            fileVersion: 1,
            userId: 0,
            userKey: null,
            baseUrl: null,
            _mode: 'full',
            _docGuid: '',
            quality: null,
            use_pdf: "true",
            showHyperlinks: true
        },

        _create: function () {
            $.extend(this.options, {
                documentSpace: this.element,
                emptyImageUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII="
            });
            if (this.options.createHtml) {
                this._createHtml();
            }
            this._viewModel = this.getViewModel();
            ko.applyBindings(this._viewModel, this.element.get(0));
        },

        _init: function () {
            $(this._viewModel).bind('getPagesCount', function (e, pagesCount) {
                $(this.element).trigger('getPagesCount', [pagesCount]);
            }.bind(this));

            $(this._viewModel).bind('onDocumentLoaded', function (e, response) {
                this.element.trigger('onDocumentLoaded', response);
            }.bind(this));

            $(this._viewModel).bind('onDocumentPasswordRequired', function (e) {
                $(this.element).trigger('onDocumentPasswordRequired');
            }.bind(this));

            $(this._viewModel).bind('_onProcessPages', function (e, data) {
                $(this.element).trigger('_onProcessPages', [data]);
            }.bind(this));

            $(this._viewModel).bind('onProcessPages', function (e, guid) {
                $(this.element).trigger('onProcessPages', [guid]);
            }.bind(this));

            $(this._viewModel).bind('onScrollDocView', function (e, data) {
                $(this.element).trigger('onScrollDocView', [data]);
            }.bind(this));

            $(this._viewModel).bind('onBeforeScrollDocView', function (e, data) {
                $(this.element).trigger('onBeforeScrollDocView', [data]);
            }.bind(this));

            $(this._viewModel).bind('onDocumentLoadComplete', function (e, data, pdf2XmlWrapper) {
                $(this.element).trigger('onDocumentLoadComplete', [data, pdf2XmlWrapper]);
            }.bind(this));

            $(this._viewModel).bind('onSearchPerformed', function (e, searchCountItem) {
                $(this.element).trigger('onSearchPerformed', [searchCountItem]);
            }.bind(this));

            $(this._viewModel).bind('onPageImageLoaded', function (e) {
                $(this.element).trigger('onPageImageLoaded');
            }.bind(this));

            $(this._viewModel).bind('onDocViewScrollPositionSet', function (e, data) {
                $(this.element).trigger('onDocViewScrollPositionSet', [data]);
            }.bind(this));

            $(this._viewModel).bind('onDocumentPageSet', function (e, newPageIndex) {
                $(this.element).trigger('onDocumentPageSet', [newPageIndex]);
            }.bind(this));
        },

        getViewModel: function () {
            if (this._viewModel == null) {
                this._viewModel = this._createViewModel();
            }

            return this._viewModel;
        },

        _createViewModel: function () {
            var vm = new docViewerViewModel(this.options);
            return vm;
        },

        applyBindings: function () {
            ko.applyBindings(this._viewModel, this.element.get(0));
        },

        _createHtml: function () {
            var rotationMarkup;
            if (this.options.supportPageRotation) {
                rotationMarkup = ' + \' translateY(\' + (($root.isHtmlDocument() && $data.rotation() == 180) ? \'100%\' : \'0\') + \') \' +' +
                    ' \'rotate(\' + $data.rotation() + \'deg)\' +' +
                    ' \' translateX(\' + (($data.rotation() == 180 || $data.rotation() == 270) ? \'-100%\' : \'0\') + \')\' +' +
                    ' \' translateY(\' + (($data.rotation() == 90 || (!$root.isHtmlDocument() && $data.rotation() == 180)) ? \'-100%\' : \'0\') + \') \'  ';
            }
            else {
                rotationMarkup = "";
            }

            var msScale = '\'-ms-transform\': \'scale(\' + $data.heightRatio() * $root.zoom() / 100.0 + \')\' ';

            if (this.options.pageContentType == "html" && $.browser.msie) {
                if ($.browser.version == 8)
                    msScale = 'zoom: $data.heightRatio() * $root.zoom() / 100.0 ';
                else {
                    msScale += rotationMarkup;
                }
            }
            msScale += ",";

            var htmlBasedWatermarkMarkup;
            if (this.options.watermarkText) {
                htmlBasedWatermarkMarkup =
                '<svg xmlns="http://www.w3.org/2000/svg" class="html_watermark" data-bind="attr:{width: $root.pageWidth() + $root.imageHorizontalMargin + \'px\', height: $root.pageWidth() * $data.prop() + \'px\', viewBox:\'0 0 100 \' + 100 * $data.prop()}" pointer-events="none">' +
                        '<text data-bind="text:$root.watermarkText, style:{fill:$root.intToColor($root.watermarkColor)}, ' +
                        'attr:{transform:$root.watermarkTransform($data, $element), ' +
                        'y:$root.watermarkPosition.indexOf(\'Top\') == -1 ? 100 * $data.prop() :\'10\'}" font-family="Verdana" font-size="10" x="0" y="0" ></text>' +
                        '</svg>';
            }
            else {
                htmlBasedWatermarkMarkup = "";
            }
            var htmlPageContentsWithTransformScaling =
'           <div class="html_page_contents"' +
'                 data-bind="' + (this.options.useVirtualScrolling ? 'parsedHtml' : 'html') + ': htmlContent(), ' +
                         'attr: { id:\'' + this.options.docViewerId + 'pageHtml-\' + number }, ' +
                         'searchText: searchText, ' +
'                        css: {chrome: $root.browserIsChrome(), \'page-image\': !$root.useTabsForPages()}, ' +
'                        style: { ' +
'                                 width: $root.rotatedWidth(), ' +
            msScale +
'                                 MozTransform: \'scale(\' + $data.heightRatio() * $root.zoom() / 100.0  + \')\' ' + rotationMarkup + ', ' +
'                                 \'-webkit-transform\': \'scale(\' + $data.heightRatio() * $root.zoom() / 100.0  + \')\' ' + rotationMarkup +
'                               }">' +
'            </div>' + htmlBasedWatermarkMarkup;

            var htmlPageContentsWithEmScaling =
'           <div class="page-image html_page_contents"' +
'                 data-bind="html: htmlContent, attr: { id:\'' + this.options.docViewerId + 'pageHtml-\' + number }, ' +
'                        searchText: searchText, ' +
'                        style:{fontSize: ($data.heightRatio() * 100.0) + \'%\'},' +
'                        css: {chrome: $root.browserIsChrome()} ">' +
'            </div>';

            var htmlPageContents;
            if (this.options.useEmScaling)
                htmlPageContents = htmlPageContentsWithEmScaling;
            else
                htmlPageContents = htmlPageContentsWithTransformScaling;

            var pagesContainerElementHtml;
            var useHtmlBasedEngine = (this.options.pageContentType == "html");
            if (useHtmlBasedEngine && this.options.useEmScaling) {
                pagesContainerElementHtml = 'class="pages_container html_pages_container" data-bind="style:{fontSize: (16.* $root.zoom() / 100.0) + \'px\'}"';
            }
            else {
                pagesContainerElementHtml = 'class="pages_container ' + (useHtmlBasedEngine ? 'html_pages_container' : '') + '" data-bind="style: { height: $root.useVirtualScrolling ? ($root.documentHeight() + \'px\') : \'auto\', width: ($root.layout() == $root.Layouts.TwoPagesInRow || $root.layout() == $root.Layouts.CoverThenTwoPagesInRow) ? ($root.pageWidth() + $root.imageHorizontalMargin) * 2 + \'px\': \'auto\'}"';
            }

            var viewerHtml =

'<div id="' + this.options.docViewerId + 'PagesContainer" ' + pagesContainerElementHtml + '>' +
    '<!-- ko foreach: { data: $root.useVirtualScrolling ? pages.slice(firstVisiblePageForVirtualMode(), lastVisiblePageForVirtualMode() + 1) : pages, afterRender: function(){$root.visiblePagesChangedHandler();} } -->' +
    '<div class="doc-page" data-bind="attr: {id: $root.pagePrefix + (($root.useVirtualScrolling ? $root.firstVisiblePageForVirtualMode() : 0) + $index() + 1)}, style: $root.pageElementStyle($index()), css: {cover_page: ($root.layout() == $root.Layouts.CoverThenTwoPagesInRow && ($root.useVirtualScrolling ? $root.firstVisiblePageForVirtualMode() : 0) + $index() == 0)}" >' +

'       <div class="viewer_loading_overlay" data-bind="visible: ($root.alwaysShowLoadingSpinner() || $root.inprogress() || !visible()), style: { zIndex: ($root.inprogress() || !visible() ? 2 : 0), width: $root.pageWidth() + \'px\', height: $parent.pageWidth() * $data.prop() + \'px\', backgroundColor: ($root.inprogress() || !visible() ? \'\' : \'transparent\')}" style="width: 850px; height: 1100px;position: absolute;left:0;top:0">' +
'           <div class="loading_overlay_message">' +
'               <span class="progresspin"></span>' +
'               <p data-localize="LoadingYourContent">Loading your content...</p>' +
'           </div>' +
'       </div>' +

(useHtmlBasedEngine ?
(
    htmlPageContents
)
:
'           <div class="button-pane"></div>' +
'           <div class="highlight-pane"></div>' +
'           <div class="custom-pane"></div>' +
'           <div class="search-pane"></div>' +
'           <img class="page-image" src="' + this.options.emptyImageUrl + '" data-bind="event: {load: function(item, e){$root.firePageImageLoadedEvent($index(), e);}, error: function(item, e){$root.firePageImageLoadErrorEvent($index(), e);} }, attr: { id: \'' + this.options.docViewerId + '\' + \'-img-\' + ($index() + 1), src: (visible() ? url : $root.emptyImageUrl) }, ' +
'           style: { width: $parent.pageWidth() + \'px\', height: $parent.pageWidth() * $data.prop() + \'px\' }"/>'
) +

'   </div>' +
    '<!-- /ko -->' +

'</div>' +

'<div class="tab_control_wrapper" data-bind="visible: useTabsForPages && tabs().length > 0">' +
'<ul class="doc_viewer_tab_control" data-bind="foreach: tabs, visible: useTabsForPages && tabs().length > 0">' +
'   <li data-bind="css:{active:$index() == $root.activeTab()}">' +
'      <a href="#" data-bind="text:name, click: function(){$root.activateTab($index());}"></a>' +
'   </li>' +
'</ul>' +
'</div>';

            var root = this.element;
            $(viewerHtml).appendTo(root);
            root.trigger("onHtmlCreated");
            this.element = $("#" + this.options.docViewerId);
        }
    });

    // Doc Viewer Model
    docViewerModel = function (options) {
        $.extend(this, options);
        this._init();
    };

    $.extend(docViewerModel.prototype, {
        _init: function () {
            this._portalService = Container.Resolve("PortalService");
        },

        loadDocument: function (fileId, pagesCountToShow, imageWidth, password, fileDisplayName,
                                watermarkText, watermarkColor, watermarkPosition, watermarkWidth,
                                ignoreDocumentAbsence,
                                supportPageRotation,
                                supportListOfContentControls, supportListOfBookmarks,
                                instanceIdToken,
                                callback, errorCallback,
                                locale, passwordForOpening) {
            var self = this;
            var onSucceded = function (response) {
            	var guid;
                if (response.data != null) {
                	if (response.data.path && typeof response.data.guid == "undefined")
                		response.data.guid = response.data.path;

                    if (self._mode == 'webComponent')
                        guid = response.data.path;
                    else
                        guid = response.data.guid;
                }
                
                if (typeof guid !== "undefined") {
                    callback.apply(this, [response.data]);
                }
                else {
                    errorCallback.apply(this, [{ code: response.data.code, Reason: (response.data ? response.data.Reason : null) }]);
                }
            };

            switch (this._mode) {
                case 'embed':
                    this._portalService.viewEmbedDocumentAllAsync(this.userId, this.userKey, fileId, imageWidth, this.quality, this.use_pdf, this.preloadPagesCount, password, fileDisplayName, onSucceded, errorCallback);
                    break;
                case 'webComponent':
                    this._portalService.viewDocument(fileId, imageWidth, this.quality, this.usePdf, this.preloadPagesCount, password, fileDisplayName,
                        watermarkText, watermarkColor, watermarkPosition, watermarkWidth,
                        ignoreDocumentAbsence, supportPageRotation,
                        supportListOfContentControls, supportListOfBookmarks,
                        onSucceded, errorCallback,
                        false,
                        instanceIdToken,
                        locale,
                        passwordForOpening
                    );
                    break;
                case 'annotatedDocument':
                    this._portalService.viewAnnotatedDocumentAsync(this.userId, this.userKey, fileId, null, pagesCountToShow, imageWidth, null, this.quality, this.use_pdf, { text: watermarkText, color: watermarkColor, position: watermarkPosition, fontSize: watermarkWidth }, onSucceded, errorCallback, false);
                    break;
                default:
                    this._portalService.viewDocumentAllAsync(this.userId, this.userKey, fileId, null, pagesCountToShow, imageWidth, null, this.quality, this.use_pdf, onSucceded, errorCallback, false);
                    break;
            }
        },

        loadDocumentAsHtml: function (fileId, pagesCountToShow, fileDisplayName, usePngImages, convertWordDocumentsCompletely,
                                      watermarkText, watermarkColor, watermarkPosition, watermarkWidth,
                                      ignoreDocumentAbsence, supportPageRotation,
                                      supportListOfContentControls, supportListOfBookmarks,
                                      embedImagesIntoHtmlForWordFiles,
                                      instanceIdToken,
                                      saveFontsInAllFormats,
                                      callback, errorCallback, locale, passwordForOpening) {
            this._portalService.viewDocumentAsHtml(this.userId, this.userKey, fileId, this.preloadPagesCount, fileDisplayName, usePngImages,
                                                   convertWordDocumentsCompletely,
                                                   watermarkText, watermarkColor, watermarkPosition, watermarkWidth,
                                                   ignoreDocumentAbsence, supportPageRotation,
                                                   supportListOfContentControls, supportListOfBookmarks,
                                                   embedImagesIntoHtmlForWordFiles,
                                                   saveFontsInAllFormats,
                function (response) {
                    if (response.data && typeof (response.data.path) !== "undefined") {
                        callback.apply(this, [response.data]);
                    }
                    else {
                        errorCallback.apply(this);
                    }
                },
                function (error) {
                    errorCallback.apply(this, [error]);
                },
                false,
                instanceIdToken,
                locale,
                passwordForOpening
            );
        },

        loadProperties: function (fileId, callback) {
            this._portalService.getDocInfoAsync(this.userId, this.userKey, fileId,
                function (response) {
                    callback.apply(this, [response.data]);
                });
        },

        loadHyperlinks: function (fileId, callback, errorCallback) {
            this._portalService.getDocumentHyperlinks(fileId,
                function (response) {
                    callback.apply(this, [response.data]);
                },
                function (error) {
                    errorCallback.apply(this, [error]);
                });
        },

        retrieveImageUrls: function (fileId, token, imageCount, pagesDimension,
                                         watermarkText, watermarkColor,
                                         watermarkPosition, watermarkWidth,
                                         ignoreDocumentAbsence,
                                         useHtmlBasedEngine,
                                         supportPageRotation,
                                         instanceIdToken,
                                         callback, errorCallback,
                                         locale) {
            this._portalService.getImageUrlsAsync(this.userId, this.userKey, fileId, pagesDimension, token, 0, imageCount, this.quality == null ? '' : this.quality, this.use_pdf, this.fileVersion,
                                              watermarkText, watermarkColor, watermarkPosition, watermarkWidth,
                                              ignoreDocumentAbsence,
                                              useHtmlBasedEngine, supportPageRotation,
            function (response) {
                callback.apply(this, [response.data]);
            },
            function (error) {
                errorCallback.apply(this, [error]);
            },
            instanceIdToken,
            locale
        );
        },

        getDocumentPageHtml: function (fileId, pageNumber, usePngImages,
                                       embedImagesIntoHtmlForWordFiles,
                                       instanceIdToken,
                                       saveFontsInAllFormats,
                                       callback, errorCallback, locale) {
            this._portalService.getDocumentPageHtml(fileId, pageNumber, usePngImages,
                embedImagesIntoHtmlForWordFiles,
                saveFontsInAllFormats,
                function (response) {
                    callback.apply(this, [response.data]);
                },
                function (error) {
                    errorCallback.apply(this, [error]);
                },
                instanceIdToken,
                locale
            );
        },

        reorderPage: function (fileId, oldPosition, newPosition, instanceIdToken, callback, errorCallback) {
            this._portalService.reorderPage(fileId, oldPosition, newPosition,
                function (response) {
                    callback.apply(this, [response.data]);
                },
                function (error) {
                    errorCallback.apply(this, [error]);
                },
                instanceIdToken
            );
        },

        rotatePage: function (path, pageNumber, rotationAmount, instanceIdToken, successCallback, errorCallback) {
            this._portalService.rotatePage(path, pageNumber, rotationAmount,
                function (response) {
                    successCallback.apply(this, [response.data]);
                },
                function (error) {
                    errorCallback.apply(this, [error]);
                },
                instanceIdToken
            );
        }
    });

    // Doc Viewer View Model
    docViewerViewModel = function (options) {
        $.extend(this, options);
        this._create(options);
    };
    $.extend(docViewerViewModel.prototype, {
        Layouts: { ScrollMode: 1, BookMode: 2, OnePageInRow: 3, TwoPagesInRow: 4, CoverThenTwoPagesInRow: 5 },
        _model: null,
        pagesDimension: null,
        pageImageWidth: 0,
        imageHorizontalMargin: 34,
        pageWrapperHorizontalMargin: 7,
        imageVerticalMargin: 0,
        initialZoom: 100,
        zoom: null,
        scale: null,
        docWasLoadedInViewer: false,
        scrollPosition: [0, 0],
        inprogress: null,
        pages: null,
        pageInd: null,
        pageWidth: null,
        pageHeight: null,
        pageCount: null,
        docType: null,
        fileId: null,
        _dvselectable: null,
        _thumbnailHeight: 140,
        _firstPage: null,
        _sessionToken: '',
        imageUrls: [],
        pagePrefix: "page-",
        documentName: null,
        fit90PercentWidth: false,
        _pageBounds: null,
        unscaledPageHeight: null,
        unscaledPageWidth: null,
        pageLeft: null,
        preloadPagesCount: null,
        viewerLayout: 1,
        changedUrlHash: false,
        hashPagePrefix: "page",
        pageContentType: "image",
        scrollbarWidth: null,
        password: null,
        useJavaScriptDocumentDescription: false,
        minimumImageWidth: null,
        fileDisplayName: null,
        hyperlinks: null,
        watermarkText: null,
        watermarkWidth: null,
        watermarkColor: null,
        watermarkLeft: null,
        watermarkTop: null,
        watermarkScreenWidth: null,
        searchText: null,
        htmlSearchHighlightClassName: "search_highlight_html",
        htmlSearchHighlightElement: "span",
        htmlSearchHighlightSvgElement: "tspan",
        currentWordCounter: 0,
        matchedNods: null,
        searchMatches: null,
        matchedNodsCount: 0,
        matchesCount: null,
        searchSeparatorsList: "\\-[\\]{}()*+?\\\\^|\\s.,:;+\"/",
        usePngImagesForHtmlBasedEngine: false,
        loadAllPagesOnSearch: false,
        serverPages: null,
        convertWordDocumentsCompletely: false,
        ignoreDocumentAbsence: false,
        tabs: null,
        useTabsForPages: null,
        tabPanelHeight: 30,
        supportPageRotation: false,
        fileType: null,
        activeTab: null,
        autoHeight: null,
        isHtmlDocument: null,
        rotatedWidth: null,
        alwaysShowLoadingSpinner: null,
        supportListOfContentControls: false,
        supportListOfBookmarks: false,
        isDocumentLoaded: false,
        _isTextPositionsCalculationFinished: true,
        initStorageOnMouseStart: false,
        
        options: {
            showHyperlinks: true
        },

        _create: function (options) {
            this._model = new docViewerModel(options);
            this._init(options);
        },

        _init: function (options) {
            var self = this;
            this.initCustomBindings();

            if (this.viewerLeft != 0) {
                this.viewerWidth -= this.viewerLeft;
                this.documentSpace.css("width", this.viewerWidth + "px");
            }
            var defaultPageImageWidth = 852;
            var defaultPageImageHeight = 1100;
            this.pageImageWidth = defaultPageImageWidth;

            this.pages = ko.observableArray([]);
            this.scale = ko.observable(this.initialZoom / 100);
            this.inprogress = ko.observable(false),
            this.pageLeft = ko.observable(0);
            this.pageInd = ko.observable(1);
            this.pageWidth = ko.observable(defaultPageImageWidth);
            this.pageHeight = ko.observable(defaultPageImageHeight);
            this.pageCount = ko.observable(0);
            this.docType = ko.observable(-1);
            this.documentName = ko.observable("");
            this.password = ko.observable("");
            this.preloadPagesCount = options.preloadPagesCount;
            this.browserIsChrome = ko.observable(false);
            this.hyperlinks = ko.observableArray();
            this.useTabsForPages = ko.observable(null); // it's undefined 
            this.tabs = ko.observableArray([]);
            this.activeTab = ko.observable(0);
            this.autoHeight = ko.observable(false);
            this.isHtmlDocument = ko.observable(false);
            this.alwaysShowLoadingSpinner = ko.observable(false);
            this.rotatedWidth = ko.computed(function () {
                if (this.useTabsForPages()) {
                    var width;
                    width = this.pageWidth();
                    if (this.autoHeight())
                        return "auto";
                    return width / this.zoom() * 100.0 + "px";
                }
                else
                    return "auto";
            }, this);

            this.layout = ko.observable(this.viewerLayout);
            this.firstVisiblePageForVirtualMode = ko.observable(0)
                .extend({ rateLimit: { method: "notifyWhenChangesStop", timeout: 400 } });;
            this.lastVisiblePageForVirtualMode = ko.observable(0)
                .extend({ rateLimit: { method: "notifyWhenChangesStop", timeout: 400 } });;
            this.documentHeight = ko.observable(0);

            if (this.pageContentType == "html") {
                this.imageHorizontalMargin = 0;
                this.calculatePointToPixelRatio();
            }

            if (!this.docViewerId)
                this.docViewerId = this.documentSpace.attr('id');
            this.pagePrefix = this.docViewerId + "-page-";

            if (options.fit90PercentWidth)
                this.pageImageWidth = this.documentSpace.width() * 0.9 - 2 * this.imageHorizontalMargin;

            if (this.pageContentType == "image")
                this.initialWidth = this.pageImageWidth;

            if (this.zoomToFitWidth) {
                this.initialWidth = this.pageImageWidth = this.getFitWidth();
            }

            this.zoom = ko.observable(this.initialZoom);
            this.documentHeight = ko.observable(0);

            this.options.showHyperlinks = (options.showHyperlinks != false && this.use_pdf != 'false');
            this.options.highlightColor = options.highlightColor;
            this.matchedNods = [];
            this.searchMatches = [];
            this.serverPages = [{ w: this.initialWidth, h: 100 }];

            var pageDescription;
            if (this.pages().length == 0) {
                pageDescription = { number: 1, visible: ko.observable(false), url: ko.observable(this.emptyImageUrl), htmlContent: ko.observable(""), searchText: ko.observable(null) };
                if (this.supportPageRotation)
                    pageDescription.rotation = ko.observable(0);
                if (this.variableHeightPageSupport) {
                    pageDescription.prop = ko.observable(1);
                    pageDescription.heightRatio = ko.observable(1);
                }
                if (this.useVirtualScrolling) {
                    pageDescription.left = 0;
                    pageDescription.top = ko.observable(0);
                }
                this.pages.push(pageDescription);
            }
            this.pagesContainerElement = this.documentSpace.find(".pages_container");
            this.contentControlsFromHtml = new Array();

            if (options.fileId) {
                this.loadDocument();
            }
            else {
                pageDescription.visible(true);
            }
        },

        loadDocument: function (fileId) {
            this.inprogress(true);
            this.documentSpace.trigger('onDocumentloadingStarted');

            var functionErrorCallback = function(error) {
                this._onDocumentLoadFailed(error, fileId || this.fileId);
            };

            var pageCountToShow = 1;
            if (this.pageContentType == "image") {
                var pageWidth;
                if (this.shouldMinimumWidthBeUsed(this.pageImageWidth * this.initialZoom / 100, false))
                    pageWidth = this.minimumImageWidth;
                else
                    pageWidth = Math.round(this.pageImageWidth * this.initialZoom / 100);

                this._model.loadDocument(fileId || this.fileId, pageCountToShow, pageWidth, this.password(), this.fileDisplayName,
                    this.watermarkText, this.watermarkColor, this.watermarkPosition, this.watermarkWidth,
                    this.ignoreDocumentAbsence, this.supportPageRotation,
                    this.supportListOfContentControls, this.supportListOfBookmarks,
                    this.instanceIdToken,
                    function (response) {
                        //this._onDocumentLoaded(response);
                        if (typeof (fileId) !== 'undefined')
                            this.fileId = fileId;
                        this.pageWidth(this.pageImageWidth * (this.initialZoom / 100));
                        this.zoom(this.initialZoom);
                        if (this.docWasLoadedInViewer)
                            this.setPageNumerInUrlHash(1);

                        this._onDocumentLoadedBeforePdf2Xml(response);
                        //this.preloadImages(response, this.preloadPagesCount);
                    }.bind(this),
                    functionErrorCallback.bind(this),
                    this.locale,
                    this.passwordForOpening
                );
            }
            else if (this.pageContentType == "html") {
                this._model.loadDocumentAsHtml(fileId || this.fileId, pageCountToShow, this.fileDisplayName, this.usePngImagesForHtmlBasedEngine,
                    this.convertWordDocumentsCompletely,
                    this.watermarkText, this.watermarkColor, this.watermarkPosition, this.watermarkWidth,
                    this.ignoreDocumentAbsence, this.supportPageRotation,
                    this.supportListOfContentControls, this.supportListOfBookmarks,
                    this.embedImagesIntoHtmlForWordFiles,
                    this.instanceIdToken,
                    this.saveFontsInAllFormats,
                    function (response) {
                        if (typeof (fileId) !== 'undefined')
                            this.fileId = fileId;
                        this.pageWidth(this.pageImageWidth * (this.initialZoom / 100));
                        this._onDocumentLoadedBeforePdf2Xml(response);
                        //this._onDocumentLoaded(response);
                    }.bind(this),
                    functionErrorCallback.bind(this),
                    this.locale,
                    this.passwordForOpening
                );
            }

            if (typeof viewModelPathOnlineDoc !== 'undefined')
                viewModelPathOnlineDoc.pathOnlineDoc('');
        },

        getDocumentPageHtml: function (pageNumber, successCallback) {
            var page;
            if (this.useTabsForPages()) {
                page = this.tabs()[pageNumber];
            }
            else {
                page = this.pages()[pageNumber];
            }

            if (!page.visible() && !page.startedDownloadingPage) {
                var pageHtml = this.preloadedPages && this.preloadedPages.html[pageNumber];
                if (pageHtml) {
                    page.htmlContent(pageHtml);
                    var pageCss = this.preloadedPages.css[pageNumber];
                    this.setPageHtml(page, pageNumber, pageHtml, pageCss);
                    if (successCallback)
                        successCallback.call();
                    return;
                }

                page.startedDownloadingPage = true;
                this._model.getDocumentPageHtml(this.fileId, pageNumber, this.usePngImagesForHtmlBasedEngine,
                    this.embedImagesIntoHtmlForWordFiles,
                    this.instanceIdToken,
                    this.saveFontsInAllFormats,
                    function (response) {
                        this.setPageHtml(page, pageNumber, response.pageHtml, response.pageCss);
                        if (successCallback)
                            successCallback.call();
                    }.bind(this),
                    function (error) {
                        page.startedDownloadingPage = false;
                        this._onError(error);
                    }.bind(this),
                    this.locale
                );
            }
        },


        setPageHtml: function (page, pageNumber, pageHtml, pageCss) {
            var css = pageCss;

            if (!this.pageCssElement)
                this.pageCssElement = $([]);

            if (this.browserIsIE9OrLess) {
                var firstStyle = this.pageCssElement.filter("style:first");
                css = firstStyle.html();
                firstStyle.remove();
                css += pageCss;
            }

            var styleElement = $("<style type='text/css'>" + css + "</style>");
            this.pageCssElement = this.pageCssElement.add(styleElement);
            styleElement.appendTo("head");

            var useTabsForPages = this.useTabsForPages();
            if (useTabsForPages || useTabsForPages === null) { // null means no document loaded
                pageHtml = pageHtml.replace(/^[\r\n\s]+|[\r\n\s]+$/g, "");
            }

            page.htmlContent(pageHtml);

            var searchParameters = {
                text: this.searchText,
                isCaseSensitive: false,
                searchForSeparateWords: this.searchForSeparateWords,
                treatPhrasesInDoubleQuotesAsExact: this.treatPhrasesInDoubleQuotesAsExact,
                pageNumber: pageNumber
            };

            if (this.useVirtualScrolling) {
                page.parsedHtmlElement = $(pageHtml);
                page.currentValue = pageHtml;
                this.parseSearchParameters(page.parsedHtmlElement.not("style")[0], searchParameters);
            }
            page.searchText(searchParameters);
            page.visible(true);
            page.startedDownloadingPage = false;
            this.markContentControls(pageNumber);
        },

        addPageCss: function (pageCss) {
            var css = pageCss;

            if (!this.pageCssElement)
                this.pageCssElement = $([]);

            if (this.browserIsIE9OrLess) {
                var firstStyle = this.pageCssElement.filter("style:first");
                css = firstStyle.html();
                firstStyle.remove();
                css += pageCss;
            }

            var styleElement = $("<style type='text/css'>" + css + "</style>");
            this.pageCssElement = this.pageCssElement.add(styleElement);
            styleElement.appendTo("head");
        },

        retrieveImageUrls: function (imageCount) {
            var i;
            var pageDimension, pageWidth;
            if (this.shouldMinimumWidthBeUsed(this.pageWidth(), true))
                pageWidth = this.minimumImageWidth;
            else
                pageWidth = this.pageWidth();

            pageDimension = Math.floor(pageWidth) + "x";
            
            this._model.retrieveImageUrls(this.fileId, this._sessionToken, imageCount, (this._mode == 'webComponent' ? Math.floor(pageWidth) : pageDimension),
                this.watermarkText, this.watermarkColor, this.watermarkPosition, this.watermarkWidth,
                this.ignoreDocumentAbsence,
                this.useHtmlBasedEngine, this.supportPageRotation,
                this.instanceIdToken,
                function (response) {
                    var imageUrls;
                    if (response.imageUrls && typeof response.image_urls == "undefined")
                        imageUrls = response.imageUrls;
                    else
                        imageUrls = response.image_urls;

                    for (i = 0; i < imageCount; i++) {
                        this.pages()[i].url(imageUrls[i]);
                        this.loadImagesForVisiblePages();
                    }
                }.bind(this),
                function (error) {
                    this._onError(error);
                }.bind(this),
                this.locale);
        },

        _onError: function (error, fileId) {
            this.inprogress(false);
            var errorFunction = window.jerror || (window.jGDError && window.jGDError[this.instanceId]);
            if (errorFunction)
                errorFunction(error.Reason || "The document couldn't be loaded...", error.ErrorCode , fileId);
        },

        _onDocumentLoadFailed: function (error, fileId) {
            this.inprogress(false);

            if (error.code == 'Unauthorized')
                $(this).trigger('onDocumentPasswordRequired');
            else {
                this._onError(error, fileId);
                this.documentSpace.trigger("documentLoadFailed.groupdocs");
            }
        },

        _onDocumentLoadedBeforePdf2Xml: function (response) {
            var self = this;

            function callOnDocumentLoaded() {
                self._onDocumentLoaded(response);
            }

            if (response.path && typeof response.guid == "undefined")
                response.guid = response.path;

            var options = {
                userId: this.userId,
                privateKey: this.userKey,
                fileId: this.fileId,
                guid: response.guid,
                documentDescription: response.documentDescription,
                callback: callOnDocumentLoaded,
                setTextPositionsCalculationFinishedCallback: this._setTextPositionsCalculationFinished,
                viewerThis: this
            };

            if (this.useJavaScriptDocumentDescription) {
                options.synchronousWork = this.textSelectionSynchronousCalculation;
                options.descForHtmlBasedEngine = (this.pageContentType == "html"
                    || this.use_pdf == 'false');
                this._pdf2XmlWrapper = new jGroupdocs.Pdf2JavaScriptWrapper(options);
                this._onDocumentLoaded(response);
            }
            else {
                if (this.use_pdf == 'false')
                    this._onDocumentLoaded(response);
                else
                    this._pdf2XmlWrapper = new jSaaspose.Pdf2XmlWrapper(options);
            }
        },

        _onDocumentLoaded: function (response) {
        	this.isDocumentLoaded = true;

            if (this.useJavaScriptDocumentDescription) {
                response.page_count = this._pdf2XmlWrapper.getPageCount();
            }
            else if (typeof response.page_count == "undefined" && response.documentDescription) {
                var documentDescription = JSON.parse(response.documentDescription);
                if (documentDescription.pages && typeof documentDescription.pages.length != "undefined")
                    response.page_count = documentDescription.pages.length;
                // for compatibility with Comparison which does not use Pdf2JavaScriptWrapper
            }

            if (response.docType && typeof response.doc_type == "undefined")
                response.doc_type = response.docType;

            if (response.imageUrls && typeof response.image_urls == "undefined")
                response.image_urls = response.imageUrls;

            if (response.path && typeof response.guid == "undefined")
                response.guid = response.path;
                
            if (!response.page_size)
                response.page_size = {};

            $(this).trigger('onDocumentLoaded', response);
            var self = this;

            this._sessionToken = response.token;
            this.docGuid = response.guid;            
            this.pageCount(response.page_count);
            this.documentName(response.name);
            this.docType(response.doc_type);
            this.password(response.password);
            this.matchesCount = 0;

            $(this).trigger('getPagesCount', response.page_count);

            if (this.variableHeightPageSupport) {
                response.documentDescription = this._pdf2XmlWrapper.documentDescription;
            }

            var pages = null;
            var pageSize = null;
            var i;
            var rotationFromServer;
            var isTextDocument;
            var scaleRatio;
            if (this.supportListOfContentControls)
                this.contentControls = this._pdf2XmlWrapper.getContentControls();
            if (this.supportListOfBookmarks)
                this.bookmarks = this._pdf2XmlWrapper.getBookmarks();

            if (this.pageContentType == "image") {
                if (this.use_pdf != 'false' || this.variableHeightPageSupport) {
                    pageSize = this._pdf2XmlWrapper.getPageSize();
                    if (this.variableHeightPageSupport) {
                        response.page_size.Width = pageSize.width;
                        response.page_size.Height = pageSize.height;
                    }

                    this.scale(this.pageImageWidth * (this.initialZoom / 100) / pageSize.width);
                    this.unscaledPageHeight = Number(pageSize.height);
                    this.unscaledPageWidth = Number(pageSize.width);
                }

                this.heightWidthRatio = parseFloat(response.page_size.Height / response.page_size.Width);
                this.pageHeight(Math.round(this.pageImageWidth * this.heightWidthRatio * (this.initialZoom / 100)));

                $(this).trigger('_onProcessPages', response);
            }
            else if (this.pageContentType == "html") {
                this.watermarkScreenWidth = null;
                this.zoom(100);
                this.fileType = response.fileType;
                this.urlForResourcesInHtml = response.urlForResourcesInHtml;
                isTextDocument = (this.fileType == "Txt" || this.fileType == "Xml");
                this.isHtmlDocument(this.fileType == "Html" || this.fileType == "Htm" || isTextDocument);
                var isDocumentSinglePaged = (response.doc_type == "Cells" || this.isHtmlDocument());
                this.useTabsForPages(isDocumentSinglePaged);
                isDocumentSinglePaged |= (response.doc_type == "Image");
                this.documentSpace.trigger("isDocumentSinglePaged.groupdocs", isDocumentSinglePaged);
                this.alwaysShowLoadingSpinner(!isDocumentSinglePaged);

                var browserIsChrome = $.browser.webkit && !!window.chrome;
                var isChromium = window.chrome;
                var vendorName = window.navigator.vendor;
                var isOpera = window.navigator.userAgent.indexOf("OPR") > -1;
                if (!!isChromium && vendorName === "Google Inc." && isOpera == false)
                    browserIsChrome = true;
                this.browserIsChrome(browserIsChrome);

                var pageCss = response.pageCss[0];
                if (!pageCss)
                    pageCss = "";

                if (this.pageCssElement)
                    this.pageCssElement.remove();

                this.urlForImagesInHtml = response.urlForImagesInHtml;
                this.urlForFontsInHtml = response.urlForFontsInHtml;
                this.pageCssElement = $([]);
                this.preloadedPages = { html: response.pageHtml, css: response.pageCss };
                var firstPageHtml = response.pageHtml[0];
                var firstPage = this.pages()[0];

                pages = this._pdf2XmlWrapper.documentDescription.pages;
                this.autoHeight(this.useTabsForPages());

                var element;
                if (this.useTabsForPages()) {
                    this.pageCount(1);
                    if (this.isHtmlDocument()) {
                        var bodyContents;
                        if (isTextDocument) {
                            bodyContents = "<div class='text_document_wrapper'>" + firstPageHtml + "</div>";
                        }
                        else {
                            var headContents = this.getHtmlElementContents(firstPageHtml, "head");
                            if (headContents) {
                                var styleElementContents = this.getHtmlElements(headContents, "style");
                                var linkElementContents = this.getHtmlElementAttributess(headContents, "link");

                                if (linkElementContents != null) {
                                    this.linkElementsToLoad = 0;
                                    for (i = 0; i < linkElementContents.length; i++) {
                                        element = $(linkElementContents[i]);
                                        var rel = element.attr("rel");
                                        if (rel == "stylesheet") {
                                            this.linkElementsToLoad++;
                                            var uri = element.attr("href");
                                            $.get(uri, 
                                                function (response) {
                                                    var styleElement = $("<style type='text/css'>" + response + "</style>");
                                                    self.pageCssElement = self.pageCssElement.add(styleElement);
                                                    styleElement.prependTo("head");
                                                    self.linkElementsToLoad--;
                                                    if (self.linkElementsToLoad == 0) {
                                                        self.autoHeight(true);
                                                        self._calculatePageSizeFromDOM();
                                                        self.adjustInitialZoom();
                                                    }
                                                })
                                            .fail(function () {
                                                self.linkElementsToLoad--;
                                                if (self.linkElementsToLoad == 0) {
                                                    self.autoHeight(true);
                                                    self._calculatePageSizeFromDOM();
                                                    self.adjustInitialZoom();
                                                }
                                            });
                                        }
                                    }
                                }

                                if (styleElementContents) {
                                    for (i = 0; i < styleElementContents.length; i++) {
                                        var css = styleElementContents[i];
                                        pageCss += css;
                                    }
                                }
                            }

                            bodyContents = this.getPageBodyContentsWithReplace(firstPageHtml);
                        }
                        var bodyContentsElement = $(bodyContents);
                        bodyContentsElement.find("script").remove();
                        bodyContentsElement.addClass('html_document_wrapper');
                        firstPageHtml = bodyContentsElement[0].outerHTML;

                        var fontSizeStyle = ".grpdx .ie .doc-page .html_page_contents > div {font-size:1em;}";
                        pageCss += fontSizeStyle;
                    }
                }
                else {
                    pageSize = this._pdf2XmlWrapper.getPageSize();

                    firstPage.prop(pages[0].h / pages[0].w);
                    scaleRatio = this.getScaleRatioForPage(pageSize.width, pageSize.height, pages[0].w, pages[0].h);
                    firstPage.heightRatio(scaleRatio);

                    this.documentSpace.css("background-color", "inherit");
                }

                var sharedCss = response.sharedCss;
                if (sharedCss) {
                    var sharedElement = $("<style>" + sharedCss + "</style>");
                    this.pageCssElement = this.pageCssElement.add(sharedElement);
                    sharedElement.appendTo("head");
                }

                element = $("<style>" + pageCss + "</style>");
                this.pageCssElement = this.pageCssElement.add(element);
                element.appendTo("head");

                this.calculatePointToPixelRatio();

                var htmlPageContents = this.documentSpace.find(".html_page_contents:first");
                firstPage.htmlContent(firstPageHtml);
                firstPage.visible(true);

                this.clearContentControls();
                this.markContentControls(0);

                this.tabs.removeAll();
                if (this.useTabsForPages()) {
                    var sheets = this._pdf2XmlWrapper.documentDescription.sheets;
                    if (sheets) {
                        for (i = 0; i < sheets.length; i++) {
                            this.tabs.push({
                                name: sheets[i].name,
                                visible: ko.observable(false),
                                htmlContent: ko.observable(""),
                                searchText: ko.observable(null)
                            });
                        }
                    }
                    this.activeTab(0);
                    this.documentSpace.css("background-color", "white");
                }

                if (this.useTabsForPages() && this.tabs().length > 0)
                    this.documentSpace.addClass("doc_viewer_tabs");
                else
                    this.documentSpace.removeClass("doc_viewer_tabs");

                var pageElement = htmlPageContents.children("div,table,img");
                var pageElementWidth;
                if (this.useTabsForPages()) {
                    pageElementWidth = pageElement.width();
                    var pageElementHeight = pageElement.height();
                    firstPage.prop(pageElementHeight / pageElementWidth);
                    pageSize = { width: pageElementWidth, height: pageElementHeight };
                    firstPage.heightRatio(1);
                }

                if (this.supportPageRotation) {
                    if (pages)
                        rotationFromServer = pages[0].rotation;
                    else
                        rotationFromServer = 0;

                    if (typeof rotationFromServer == "undefined")
                        rotationFromServer = 0;
                    this.applyPageRotationInBrowser(0, firstPage, rotationFromServer);
                }

                this.imageHorizontalMargin = 7;

                response.page_size.Width = pageSize.width;
                response.page_size.Height = pageSize.height;
                var pageWidthFromServer = pageSize.width;
                var onlyImageInHtml = false;
                var pageElementChildren = pageElement.children();
                if (pageElementChildren.length == 1 && pageElementChildren.filter("img").length == 1)
                    onlyImageInHtml = true;

                var oldWidth = null;
                if (!onlyImageInHtml && !this.useTabsForPages()) {
                    oldWidth = pageElement.css("width");
                    pageElement.css("width", pageWidthFromServer + "pt");
                }

                if (this.isHtmlDocument())
                    pageElementWidth = this.getFitWidth();
                else
                    pageElementWidth = pageElement.width();

                this.heightWidthRatio = parseFloat(response.page_size.Height / response.page_size.Width);

                if (!this.useTabsForPages() || !this.supportPageRotation || firstPage.rotation % 180 == 0)
                    this.pageWidth(pageElementWidth);

                if (oldWidth !== null && typeof oldWidth != "undefined")
                    pageElement.css("width", oldWidth);
                this.pageHeight(Math.round(this.pageWidth() * this.heightWidthRatio));
                this.initialWidth = this.pageWidth();
            }

            var pageCount = this.pageCount();
            if (!response.lic && pageCount > 3)
                pageCount = 3;

            var pagesNotObservable = [];
            var pageDescription;

            if (this.pageContentType == "image") {
                //this.pages.removeAll();
                var pageImageUrl, pageDescriptionCount;
                if (this.variableHeightPageSupport) {
                    this.serverPages = pages = this._pdf2XmlWrapper.documentDescription.pages;
                    pageDescriptionCount = this._pdf2XmlWrapper.getPageCount();
                    //pageDescriptionCount = pages.length;
                }

                for (i = 0; i < pageCount; i++) {
                    if (i < response.image_urls.length)
                        pageImageUrl = response.image_urls[i];
                    else
                        pageImageUrl = "";

                    pageDescription = {
                        number: i + 1,
                        visible: ko.observable(false),
                        url: ko.observable(pageImageUrl)
                    };
                    if (this.variableHeightPageSupport) {
                        if (i < pageDescriptionCount && pages)
                            pageDescription.prop = ko.observable(pages[i].h / pages[i].w);
                        else
                            pageDescription.prop = ko.observable(this.pageHeight() / this.pageWidth());
                    }

                    if (this.supportPageRotation) {
                        rotationFromServer = this.serverPages[i].rotation;
                        if (typeof rotationFromServer == "undefined")
                            rotationFromServer = 0;
                        pageDescription.rotation = ko.observable(rotationFromServer);
                        this.applyPageRotationInBrowser(i, pageDescription, rotationFromServer);
                    }
                    if (this.useVirtualScrolling) {
                        pageDescription.left = 0;
                        pageDescription.top = ko.observable(0);
                    }

                    pagesNotObservable.push(pageDescription);
                }
            }
            else if (this.pageContentType == "html") {
                this.serverPages = pages = this._pdf2XmlWrapper.documentDescription.pages;
                //this.pages.splice(1, this.pages().length - 1);
                //var documentHeight = 0;
                //var pageTop = 0;

                pageWidth = this.pageWidth();
                pageDescription = this.pages()[0];
                //var layout = this.layout();
                //if (layout != this.Layouts.TwoPagesInRow)
                //    pageTop += pageWidth * pageDescription.prop();
                //documentHeight += pageWidth * pageDescription.prop();
                pagesNotObservable.push(pageDescription);
                var proportion;
                //var cssForAllPages = "";
                for (i = 1; i < pageCount; i++) {
                    scaleRatio = this.getScaleRatioForPage(pageSize.width, pageSize.height, pages[i].w, pages[i].h);
                    proportion = pages[i].h / pages[i].w;

                    pageDescription = {
                        number: i + 1,
                        visible: ko.observable(false),
                        htmlContent: ko.observable(""),
                        prop: ko.observable(proportion),
                        heightRatio: ko.observable(scaleRatio),
                        searchText: ko.observable(null)
                    };

                    //var pageHtml = this.preloadedPages && this.preloadedPages.html[i];
                    //if (pageHtml) {
                    //    pageDescription.htmlContent(pageHtml);
                    //    if (this.preloadedPages.css[i])
                    //        cssForAllPages += this.preloadedPages.css[i];
                    //    pageDescription.visible(true);
                    //}

                    if (this.supportPageRotation) {
                        rotationFromServer = this.serverPages[i].rotation;
                        if (typeof rotationFromServer == "undefined")
                            rotationFromServer = 0;
                        pageDescription.rotation = ko.observable(rotationFromServer);
                        this.applyPageRotationInBrowser(i, pageDescription, rotationFromServer);
                    }
                    if (this.useVirtualScrolling) {
                        pageDescription.left = 0;
                        pageDescription.top = ko.observable(0);
                    }
                    //    if (layout == this.Layouts.OnePageInRow
                    //        || (layout == this.Layouts.TwoPagesInRow && i % 2 == 1)
                    //        || (layout == this.Layouts.CoverThenTwoPagesInRow && i % 2 == 0)) {
                    //        pageTop += pageWidth * proportion;
                    //        documentHeight = pageTop;
                    //    }
                    //    else
                    //        documentHeight = pageTop + pageHeight;

                    //    //pageTop += pageWidth * proportion * scaleRatio;
                    //}
                    pagesNotObservable.push(pageDescription);
                }

                //if (this.useVirtualScrolling)
                //    this.documentHeight(documentHeight);
                if (isDocumentSinglePaged)
                    response.page_count = 0; // for thumbnails after rotation
                this.documentSpace.trigger('_onProcessPages', [response, pagesNotObservable, this.getDocumentPageHtml, this, this.pointToPixelRatio, this.docViewerId]);
            }

            this.pages(pagesNotObservable);
            this.calculatePagePositionsForVirtualMode();

            this._firstPage = this.documentSpace.find("#" + this.pagePrefix + "1");
            if (this.pages().length > 0 && this._firstPage.length == 0 && !this.useVirtualScrolling) // viewer destroyed while loading document
                return;

            $(this).trigger('onProcessPages', [this.docGuid]);
            this.inprogress(false);

            if (this.pageContentType == "image") {
                this.recalculatePageLeft();
            }

            //var hCount = Math.floor(this.pagesContainerElement.width() / this._firstPage.width());
            var hCount = Math.floor(this.pagesContainerElement.width() / this.pageWidth());
            if (hCount == 0)
                hCount = 1;
            if (this.layout() == this.Layouts.OnePageInRow)
                hCount = 1;

            if (this._pdf2XmlWrapper && this._pdf2XmlWrapper._setTextPositionsCalculationFinished)
                this._isTextPositionsCalculationFinished = false;
            var scale = this.scale();

            this._dvselectable = this.pagesContainerElement.dvselectable({
                txtarea: this.selectionContent,
                pdf2XmlWrapper: this._pdf2XmlWrapper,
                startNumbers: this.getVisiblePagesNumbers(),
                pagesCount: this.pageCount(),
                proportion: scale,
                pageHeight: this.getPageHeight(),
                horizontalPageCount: hCount,
                docSpace: this.documentSpace,
                pagePrefix: this.pagePrefix,
                searchPartialWords: this.searchPartialWords,
                storeAnnotationCoordinatesRelativeToPages: this.storeAnnotationCoordinatesRelativeToPages,
                initializeStorageOnly: this.pageContentType == "html",
                preventTouchEventsBubbling: this.preventTouchEventsBubbling,
                highlightColor: this.options.highlightColor,
                useVirtualScrolling: this.useVirtualScrolling,
                pageLocations: (this.useVirtualScrolling ? this.pages() : null),
                initStorageOnMouseStart: this.initStorageOnMouseStart
            });
            this._dvselectable.dvselectable("setVisiblePagesNumbers", this.getVisiblePagesNumbers());

            if (!this.docWasLoadedInViewer && (this.usePageNumberInUrlHash === undefined || this.usePageNumberInUrlHash == true)) {
                var firstPageLocation = location.pathname;
                if (location.hash.substring(1, this.hashPagePrefix.length + 1) != this.hashPagePrefix)
                    this.setPage(1);

                Sammy(function () {
                    this.get(/\#page(.*)/i, openPath);
                    this.get(firstPageLocation, openFirstPage);

                    function openFirstPage() {
                        if (self.pageInd() != 1)
                            self.setPage(1);
                    }

                    function openPath() {
                        if (!self.changedUrlHash) {
                            if (this.params.splat.length == 0 || this.params.splat[0].length == 0) {
                            }
                            else {
                                var hashString = this.params.splat[0];
                                //hashString = hashString.substring(1);
                                var newPageIndex = Number(hashString);
                                if (isNaN(newPageIndex))
                                    newPageIndex = 1;
                                if (newPageIndex > self.pageCount())
                                    newPageIndex = self.pageCount();
                                if (newPageIndex < 1)
                                    newPageIndex = 1;
                                self.setPage(newPageIndex);
                            }
                        }
                    }
                }).run();
            }
            else {
                this.setPage(1);
            }

            if (!this.zoomToFitHeight)
                this.loadImagesForVisiblePages(true);

            this.adjustInitialZoom();
            this.docWasLoadedInViewer = true;

            // get a list of document hyperlinks from the server
            if (this.pageContentType == "image" && this._mode != "webComponent" && this._mode != "annotatedDocument") {
                this._loadHyperlinks();
            }

            if (this.preloadPagesOnBrowserSide) {
                var preloadPagesCount = this.preloadPagesCount;
                if (preloadPagesCount === null || preloadPagesCount > this.pageCount())
                    preloadPagesCount = this.pageCount();

                this.loadImagesForPages(1, preloadPagesCount);
            }

            $(this).trigger('onScrollDocView', { pi: 1, direction: "up", position: 0 });
            $(this).trigger("onDocumentLoadComplete", [response, this._pdf2XmlWrapper]);
            if (this._isTextPositionsCalculationFinished)
                this.raiseDocumentLoadCompletedEvent();
        },

        _onDocumentHyperlinksLoaded: function (response) {
            if (!response || !response.links) {
                this.hyperlinks.removeAll();
                return;
            }

            var links = [];
            var self = this;
            var selectable = this.getSelectableInstance();

            $.each(response.links, function () {
                var l = {
                    url: this.Url,
                    pageNumber: this.PageNumber,
                    targetPage: this.TargetPage,
                    rect: new jSaaspose.Rect(this.Bounds.X, this.Bounds.Y, this.Bounds.X + this.Bounds.Width, this.Bounds.Y + this.Bounds.Height)
                };
                l.frame = ko.observable(selectable != null ? selectable.convertPageAndRectToScreenCoordinates(l.pageNumber, l.rect) : l.rect);
                /*var frame = l.rect.clone().scale(self.scale());
                if (frame.top() < 0)
                frame.setTop(0);
                frame.add(selectable.pages[l.pageNumber].rect.topLeft);

                return frame;
                }, self);*/

                links.push(l);
            });

            this.hyperlinks(links);
        },

        _loadHyperlinks: function () {
            if (this.options.showHyperlinks == true) {
                this._model.loadHyperlinks(
                    this.fileId,
                    this._onDocumentHyperlinksLoaded.bind(this),
                    function (error) {
                    });
            }
        },

        _refreshHyperlinkFrames: function () {
            var selectable = this.getSelectableInstance();

            $.each(this.hyperlinks(), function () {
                this.frame(selectable != null ? selectable.convertPageAndRectToScreenCoordinates(this.pageNumber, this.rect) : this.rect);
            });
        },

        setPageWidth: function (val) {
            this.pageImageWidth = val;
        },

        setContainerWidth: function (containerWidth) {
            this.viewerWidth = containerWidth;
        },

        getFitWidth: function () {
            var viewerWidth;
            if (this.viewerWidth)
                viewerWidth = this.viewerWidth;
            else
                viewerWidth = this.documentSpace.width();
            var scrollbarWidth = this.getScrollbarWidth();
            var fittingWidth = viewerWidth - scrollbarWidth - 2 * (this.imageHorizontalMargin + 1);
            if (!this.useTabsForPages()) {
                var layout = this.layout();
                if (layout == this.Layouts.TwoPagesInRow
                    || layout == this.Layouts.CoverThenTwoPagesInRow)
                    fittingWidth = fittingWidth / 2;
            }
            return fittingWidth;
        },

        getFitWidthZoom: function () {
            return this.getFitWidth() / this.initialWidth * 100;
        },

        setContainerHeight: function (containerHeight) {
            this.viewerHeight = containerHeight;
        },

        getViewerHeight: function () {
            var viewerHeight;
            if (this.viewerHeight)
                viewerHeight = this.viewerHeight;
            else
                viewerHeight = this.documentSpace.parent().height();
            return viewerHeight;
        },

        getFitHeightZoom: function () {
            var viewerHeight = this.getViewerHeight();
            return (viewerHeight - (this.imageVerticalMargin + 2)) / Math.round(this.initialWidth * this.heightWidthRatio) * 100;
            //return viewerHeight / Math.round(this.pageImageWidth * this.heightWidthRatio) * 100;
        },

        getScrollbarWidth: function () {
            if (this.scrollbarWidth == null) {
                // Create the measurement node
                var scrollDivJquery = $("<div/>").css("width", "100px").css("height", "100px")
                    .css("overflow", "scroll").css("position", "absolute").css("top", "-9999px");
                var scrollDiv = scrollDivJquery[0];
                document.body.appendChild(scrollDiv);

                // Get the scrollbar width
                this.scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

                // Delete the DIV 
                document.body.removeChild(scrollDiv);
            }
            return this.scrollbarWidth;
        },

        getPageHeight: function () {
            return this.unscaledPageHeight * this.scale();
        },

        getSelectable: function () {
            return this._dvselectable;
        },

        _onPropertiesLoaded: function (response) {
            $(this).trigger('onDocumentLoaded', { fileId: this.fileId, response: response });
        },

        getFileId: function () {
            return this.fileId;
        },

        ScrollDocView: function (item, e) {
            var isSetCalled = this.isSetCalled;
            this.isSetCalled = false;
            if (isSetCalled)
                return;
            if (this.useTabsForPages())
                return;
            //var direction;
            var pageIndex = null;
            var panelHeight = this.documentSpace.height();
            var st = $(e.target).scrollTop();

            $(this).trigger('onBeforeScrollDocView', { position: st });
            if (this.variableHeightPageSupport) {
                var selectable = this.getSelectableInstance();
                if (selectable == null)
                    return null;

                selectable.initStorage();

                var pageLocations = selectable.pageLocations;
                var pageImageTop, pageImageBottom;
                var pages = this.pages();

                var visiblePageNumbers;
                visiblePageNumbers = this.getVisiblePagesNumbers();

                var documentSpaceHeight = this.documentSpace.height();
                var nearestPageNumber = null, maxPartWhichIntersects = null;
                var topOfIntersection, bottomOfIntersection, lengthOfIntersection, partWhichIntersects;
                for (var i = visiblePageNumbers.start - 1; i <= visiblePageNumbers.end - 1; i++) {
                    if (this.useVirtualScrolling)
                        pageImageTop = pages[i].top();
                    else
                        pageImageTop = pageLocations[i].y;
                    pageHeight = pages[i].prop() * this.pageWidth();
                    pageImageBottom = Math.floor(pageImageTop + pageHeight);
                    topOfIntersection = Math.max(pageImageTop, st);
                    bottomOfIntersection = Math.min(pageImageBottom, st + documentSpaceHeight);
                    lengthOfIntersection = bottomOfIntersection - topOfIntersection;
                    partWhichIntersects = lengthOfIntersection / pageHeight;

                    if (maxPartWhichIntersects == null || partWhichIntersects > maxPartWhichIntersects) {
                        maxPartWhichIntersects = partWhichIntersects;
                        nearestPageNumber = i;
                    }
                }
                pageIndex = nearestPageNumber + 1;
            }
            else {
                if (this._firstPage != null) {
                    pageIndex = (st + panelHeight / 2) / (this._firstPage.outerHeight(true));
                    var hCount = Math.floor(this.pagesContainerElement.width() / this._firstPage.width());
                    if (hCount == 0)
                        hCount = 1;
                    if (this.layout() == this.Layouts.OnePageInRow)
                        hCount = 1;
                    pageIndex = (pageIndex >> 0);

                    var totalPageCount = this.pageCount();
                    if (pageIndex != totalPageCount)
                        pageIndex = pageIndex + 1;
                    pageIndex = (pageIndex - 1) * hCount + 1;
                    if (pageIndex > totalPageCount)
                        pageIndex = totalPageCount;
                }
            }
            if (pageIndex !== null) {
                this.pageInd(pageIndex);
                this.setPageNumerInUrlHash(pageIndex);
                $(this).trigger('onScrollDocView', { pi: pageIndex, position: st });
                this.documentSpace.trigger("documentScrolledToPage.groupdocs", [pageIndex]);
            }
        },

        ScrollDocViewEnd: function (item, e) {
            if (this.useTabsForPages())
                return;

            this.isSetCalled = false;
            this.scrollPosition = [$(e.target).scrollLeft(), $(e.target).scrollTop()];
            var numbers = this.loadImagesForVisiblePages();

            if (this._dvselectable) {
                $(this._dvselectable).dvselectable("setVisiblePagesNumbers", numbers);
            }
            $(this).trigger('onDocumentPageSet', [this.pageInd()]);
            this.documentSpace.trigger("documentScrolledToPage.groupdocs", [this.pageInd()]);
        },

        getVisiblePagesNumbers: function () {
            if (!this.isDocumentLoaded)
                return null;
            if (this.useTabsForPages()) {
                return { start: 1, end: 1 };
            }

            var start = null;
            var end = null;
            var scrollTop = this.documentSpace.scrollTop();
            var pageHeight;
            var startIndex = null;
            var documentSpaceHeight = this.documentSpace.height();

            if (this.variableHeightPageSupport) {
                var selectable = this.getSelectableInstance();
                if (selectable == null && !this.useVirtualScrolling)
                    return null;
                var pages = this.pages();
                var pageLocations;
                var pageCount;
                if (this.useVirtualScrolling)
                    pageCount = pages.length;
                else {
                    pageLocations = selectable.pageLocations;
                    if (pageLocations.length != pages.length)
                        return null;
                    pageCount = pageLocations.length;
                }

                var pageImageTop, pageImageBottom;
                for (var i = 0; i < pageCount; i++) {
                    if (this.useVirtualScrolling)
                        pageImageTop = pages[i].top();
                    else
                        pageImageTop = pageLocations[i].y;

                    pageHeight = pages[i].prop() * this.pageWidth();

                    pageImageBottom = pageImageTop + pageHeight;
                    if ((pageImageTop >= scrollTop && pageImageTop <= scrollTop + documentSpaceHeight) ||
                        (pageImageBottom >= scrollTop && pageImageBottom <= scrollTop + documentSpaceHeight) ||
                        (pageImageTop <= scrollTop && pageImageBottom >= scrollTop + documentSpaceHeight)) {
                        if (start === null)
                            start = i + 1;
                        else
                            end = i + 1;
                    }
                }
                if (end === null)
                    end = start;

            }
            else {
                if (this._firstPage != null) {
                    pageHeight = this._firstPage.outerHeight(true); // div height
                    var pageWidth = this._firstPage.outerWidth(true); // div width
                    //var scrollTop = this.scrollPosition[1], //scroll top
                    var dsW = this.pagesContainerElement.width();
                    startIndex = Math.floor(scrollTop / pageHeight) + 1;
                    var endIndex = Math.floor((scrollTop + documentSpaceHeight) / pageHeight) + 1;

                    var hCountToShow = Math.floor(dsW / pageWidth);

                    if (hCountToShow == 0)
                        hCountToShow = 1;
                    if (this.layout() == this.Layouts.OnePageInRow)
                        hCountToShow = 1;

                    start = startIndex != 1 ? (startIndex - 1) * hCountToShow + 1 : 1;
                    end = endIndex * hCountToShow <= this.pageCount() ? endIndex * hCountToShow : this.pageCount();
                }
            }
            return { start: start, end: end };
        },

        loadImagesForVisiblePages: function (forceLoading) {
            var numbers = this.getVisiblePagesNumbers();
            if (numbers != null) {
                var start = numbers.start;
                var end = numbers.end;
                if (start !== null && end !== null) {
                    this.loadImagesForPages(start, end, forceLoading);
                    if (this.useVirtualScrolling) {
                        this.firstVisiblePageForVirtualMode(numbers.start - 1);
                        this.lastVisiblePageForVirtualMode(numbers.end - 1);
                    }
                }
            }
            return numbers;
        },

        loadImagesForPages: function (start, end, forceLoading) {
            var pages = this.pages();
            var cssForAllPages = "";
            var page;
            var isPageVisible;
            if (pages.length < end) end = pages.length;
            for (var i = start; i <= end; i++) {
                page = pages[i - 1];
                isPageVisible = page.visible();
                if (isPageVisible)
                    this.markContentControls(i - 1);

                if (this.pageContentType == "image") {
                    this.triggerImageLoadedEvent(i);

                    if (this.supportPageRotation && forceLoading) {
                        this.addSuffixToImageUrl(page);
                    }
                }
                else if (this.pageContentType == "html") {
                    if (!isPageVisible) {
                        this.getDocumentPageHtml(i - 1);
                    }
                }
                page.visible(true);
            }

            if (this.pageContentType == "html" && cssForAllPages != "")
                this.addPageCss(cssForAllPages);
        },

        setPage: function (index) {
            this.isSetCalled = true;
            var newPageIndex = Number(index);

            if (isNaN(newPageIndex) || newPageIndex < 1)
                newPageIndex = 1;

            this.pageInd(newPageIndex);

            var pageTop;
            if (this.variableHeightPageSupport) {
                if (this.useVirtualScrolling) {
                    pageTop = this.pages()[newPageIndex - 1].top();
                }
                else {
                    var selectable = this.getSelectableInstance();
                    if (selectable != null) {
                        if (selectable.pageLocations && selectable.pageLocations.length > 0) {
                            var pageImageTop = selectable.pageLocations[newPageIndex - 1].y;
                            pageTop = pageImageTop;
                        }
                    }
                }
            }
            else {
                var hCount = Math.floor(this.pagesContainerElement.width() / this._firstPage.width());
                if (hCount == 0)
                    hCount = 1;
                if (this.layout() == this.Layouts.OnePageInRow)
                    hCount = 1;
                var selIndex = Math.ceil(newPageIndex / hCount) - 1;
                pageTop = selIndex * this._firstPage.outerHeight(true);
            }

            var oldScrollTop = this.documentSpace.scrollTop();
            this.documentSpace.scrollTop(pageTop);
            if (this.documentSpace.scrollTop() == oldScrollTop) {
                this.isSetCalled = false;
            }

            $(this).trigger('onDocViewScrollPositionSet', { position: pageTop });
            var page = this.pages()[newPageIndex - 1];

            if (this.pageContentType == "image") {
                this.triggerImageLoadedEvent(newPageIndex);
                page.visible(true);
            }
            else if (this.pageContentType == "html") {
                if (!page.visible()) {
                    this.getDocumentPageHtml(newPageIndex - 1);
                }
            }

            //this.isSetCalled = false;

            this.setPageNumerInUrlHash(newPageIndex);
            $(this).trigger('onDocumentPageSet', [newPageIndex]);
            this.documentSpace.trigger("documentPageSet.groupdocs", newPageIndex);
        },

        triggerImageLoadedEvent: function (pageIndex) {
            if ($.browser.msie) {
                if (!this.pages()[pageIndex - 1].visible()) {
                    $("img#img-" + pageIndex).load(function () {
                        $(this).trigger("onPageImageLoaded");
                    });
                }
            }
        },

        setZoom: function (value) {
            this.zoom(value);
            this.loadPagesZoomed();
            this.clearContentControls();

            if (this.pageContentType == "image") {
                if (this._pdf2XmlWrapper) {
                    var pageSize = this._pdf2XmlWrapper.getPageSize();
                    this.scale(this.pageImageWidth / pageSize.width * value / 100);
                }

                this.getSelectableInstance().changeSelectedRowsStyle(this.scale());
                this.reInitSelectable();
                if (this.useVirtualScrolling) {
                    this.getSelectableInstance().recalculateSearchPositions(this.scale());
                    this.highlightSearch();
                }
                this.recalculatePageLeft();
                this.setPage(this.pageInd());

                if (this.shouldMinimumWidthBeUsed(this.pageWidth(), true))
                    this.loadImagesForVisiblePages();

                if (this.options.showHyperlinks) {
                    this._refreshHyperlinkFrames();
                }
            }
            else if (this.pageContentType == "html") {
                this.reInitSelectable();
                this.setPage(this.pageInd());
                this.loadImagesForVisiblePages();
                this.reflowPagesInChrome(true);
            }
        },

        loadPagesZoomed: function () {
            if (this.useTabsForPages()) {
                this._calculatePageSizeFromDOM();
                return;
            }

            var newWidth = Math.round(this.initialWidth * (this.zoom()) / 100);
            var newHeight = Math.round(newWidth * this.heightWidthRatio);

            if (newWidth != this.pageWidth() || newHeight != this.pageHeight()) {
                this.pagesDimension = Math.floor(newWidth) + 'x';

                this.pageWidth(newWidth);
                this.pageHeight(newHeight);

                if (!this.useTabsForPages()) {
                    this.calculatePagePositionsForVirtualMode();
                }

                if (this.pageContentType == "image") {
                    var pageCount = this.pageCount();
                    if (!this.shouldMinimumWidthBeUsed(newWidth, true))
                        this.retrieveImageUrls(pageCount);
                }
            }
        },

        performSearch: function (value, isCaseSensitive, searchForSeparateWords, treatPhrasesInDoubleQuotesAsExact, useAccentInsensitiveSearch) {
            if (this.pageContentType == "image") {
                var selectable = this.getSelectableInstance();
                if (selectable != null) {
                    var searchCountItem = selectable.performSearch(value, this.scale(), isCaseSensitive, searchForSeparateWords, treatPhrasesInDoubleQuotesAsExact, useAccentInsensitiveSearch);
                    $(this).trigger('onSearchPerformed', [searchCountItem]);
                }
            }
            else {
                this.searchText = value;
                this.searchForSeparateWords = searchForSeparateWords;
                this.treatPhrasesInDoubleQuotesAsExact = treatPhrasesInDoubleQuotesAsExact;
                var pages = this.pages();
                var page;

                if (this.loadAllPagesOnSearch)
                    this.loadImagesForPages(1, pages.length);

                for (var i = 0; i < pages.length; i++) {
                    page = pages[i];
                    if (page.visible()) {
                        var searchParameters = {
                            text: value,
                            isCaseSensitive: isCaseSensitive,
                            searchForSeparateWords: searchForSeparateWords,
                            treatPhrasesInDoubleQuotesAsExact: treatPhrasesInDoubleQuotesAsExact,
                            pageNumber: i
                        };

                        page.searchText(searchParameters);
                    }
                }
            }
        },

        searchHtmlElement: function (node, nodeName, className, words, wordsWithAccentedChars,
            searchForSeparateWords, isCaseSensitive, fullWordsOnly, pageNumber) {

            nodeName = nodeName || this.htmlSearchHighlightElement;
            var totalWordCount;
            var pattern, currentNodeMatchCount = 0;
            var match = null;
            var nodeText = null;
            var regexp;

            if (node.nodeType === 3) {
                if (words) {
                    totalWordCount = words.length;

                    var trimmedText = node.data.replace(/[\r\n\s]+$/g, "");
                    var separatorsRegexString = "[" + this.searchSeparatorsList + "]";
                    var wordStartSeparatorsRegexString;
                    var wordEndSeparatorsRegexString;
                    var reservedSymbolsInEndRegExp = /[\-[\]{}()*+?\\^|\s.,:;+"]+$/g;
                    var currentWord, currentWordWithAccentedChars;
                    var index, length;
                    var highlightElementName;
                    var matchNum;
                    var previousMatchPosition = -1, matchLength = 0, previousMatchEndPosition = 0;
                    trimmedText = trimmedText.replace(reservedSymbolsInEndRegExp, "");
                    if (trimmedText.length == 0)
                        return 0;

                    if (searchForSeparateWords && !fullWordsOnly) {
                        var searchMatches = new Array();
                        for (var wordNum = 0; wordNum < words.length; wordNum++) {
                            currentWord = words[wordNum];
                            currentWordWithAccentedChars = wordsWithAccentedChars[wordNum];

                            pattern = currentWordWithAccentedChars;
                            length = pattern.length;
                            nodeText = node.data;

                            if (!isCaseSensitive) {
                                pattern = pattern.toLocaleLowerCase();
                                nodeText = nodeText.toLocaleLowerCase();
                            }
                            previousMatchEndPosition = 0;
                            do {
                                index = nodeText.indexOf(pattern, previousMatchEndPosition);
                                if (index != -1) {
                                    searchMatches.push({ index: index, length: length });
                                    previousMatchEndPosition = index + length;
                                }
                            } while (index != -1);
                        }

                        searchMatches.sort(function (match1, match2) {
                            return match2.index - match1.index;
                        });

                        var containingMatches = new Array();
                        // remove overlapping search hits but keep one of two hits overlapping each other
                        searchMatches = searchMatches.filter(function (match, index) {
                            return !searchMatches.some(function (innerMatch, innerIndex) {
                                var isContainedInAnother = innerIndex != index &&
                                       (match.index >= innerMatch.index && match.index < innerMatch.index + innerMatch.length)
                                    || (match.index + match.length > innerMatch.index && match.index + match.length < innerMatch.index + innerMatch.length);
                                if (isContainedInAnother) {
                                    if (containingMatches.indexOf(match) != -1)
                                        return false;
                                    containingMatches.push(innerMatch);
                                }
                                return isContainedInAnother;
                            });
                        });
                        var newNodesCreated = 0;
                        for (matchNum = 0; matchNum < searchMatches.length; matchNum++) {
                            highlightElementName = "search_highlight" + this.matchesCount.toString();
                            this.matchesCount++;
                            newNodesCreated += this.highlightOneNode(node, searchMatches[matchNum].index, searchMatches[matchNum].length, highlightElementName, className, pageNumber);
                        }
                        return newNodesCreated;
                    }

                    var isFirstWord, isLastWord;
                    var foundFirstWordsButDidNotFindOthers;

                    do {
                        currentWord = words[this.currentWordCounter];
                        currentWordWithAccentedChars = wordsWithAccentedChars[this.currentWordCounter];
                        isFirstWord = (this.currentWordCounter == 0);
                        isLastWord = (this.currentWordCounter == totalWordCount - 1);

                        if (isFirstWord && !fullWordsOnly) {
                            wordStartSeparatorsRegexString = "";
                        }
                        else {
                            wordStartSeparatorsRegexString = "(?:" + separatorsRegexString + "|^)+";
                        }

                        if (isLastWord && !fullWordsOnly) {
                            wordEndSeparatorsRegexString = "";
                        }
                        else {
                            wordEndSeparatorsRegexString = "(?:" + separatorsRegexString + "|$)+";
                        }

                        pattern = wordStartSeparatorsRegexString + "(" + currentWordWithAccentedChars + wordEndSeparatorsRegexString + ")";
                        nodeText = node.data;
                        nodeText = nodeText.substr(previousMatchEndPosition, nodeText.length - previousMatchEndPosition);
                        if ((this.matchedNodsCount > 0 && previousMatchPosition == -1) || previousMatchPosition != -1) // if searching a new <span> or not first word inside first span then search from beginning of string
                            pattern = "^" + pattern;
                        regexp = new RegExp(pattern, isCaseSensitive ? "" : "i");
                        foundFirstWordsButDidNotFindOthers = false;

                        match = nodeText.match(regexp);
                        if (match) {
                            if (previousMatchPosition == -1)
                                this.matchedNodsCount++;
                            currentNodeMatchCount++;
                            this.matchedNods.push(node);
                            index = previousMatchEndPosition + match.index;
                            length = match[0].length;

                            if (isFirstWord) {
                                index = previousMatchEndPosition + nodeText.indexOf(match[1], match.index);
                                length = match[1].length;
                            }

                            if (isLastWord && !this.useAccentInsensitiveSearch) {
                                var word = words[this.currentWordCounter];
                                var nodeTextToSearchIn = nodeText;
                                if (!isCaseSensitive) {
                                    word = word.toLowerCase();
                                    nodeTextToSearchIn = nodeTextToSearchIn.toLowerCase();
                                }
                                var wordIndex = previousMatchEndPosition + nodeTextToSearchIn.indexOf(word, match.index);
                                length = word.length + wordIndex - index;
                            }
                            this.searchMatches.push({ index: index, length: length });

                            previousMatchPosition = previousMatchEndPosition + match.index;
                            matchLength = match[0].length;
                            previousMatchEndPosition = previousMatchPosition + matchLength;

                            this.currentWordCounter++;
                            if (this.currentWordCounter >= totalWordCount) {
                                highlightElementName = "search_highlight" + this.matchesCount.toString();
                                for (matchNum = totalWordCount - 1; matchNum >= 0; matchNum--)
                                    this.highlightOneNode(this.matchedNods[matchNum], this.searchMatches[matchNum].index, this.searchMatches[matchNum].length, highlightElementName, className, pageNumber);
                                this.currentWordCounter = 0;
                                this.matchedNods = [];
                                this.searchMatches = [];
                                this.matchedNodsCount = 0;
                                this.matchesCount++;
                                return currentNodeMatchCount;
                            }
                        }
                        else {
                            this.matchedNods = [];
                            this.searchMatches = [];
                            if (this.currentWordCounter > 0) {
                                // found first word or words (on previous step) inside this <span/> but failed to find others
                                previousMatchPosition = -1;
                                this.matchedNodsCount = 0;
                                foundFirstWordsButDidNotFindOthers = true;
                            }
                            this.currentWordCounter = 0;
                        }
                    } while ((match && previousMatchEndPosition < trimmedText.length) || foundFirstWordsButDidNotFindOthers);

                    if (!match)
                        this.matchedNodsCount = 0;
                    return 0;
                }
            }
            else if ((node.nodeType === 1 && node.childNodes) && // only element nodes that have children
                !/(script|style)/i.test(node.tagName) && // ignore script and style nodes
                !(node.tagName === nodeName.toUpperCase() && node.className === className)) { // skip if already highlighted
                var startNodeNum = 0;
                //var endNodeNum = node.childNodes.length;
                var i;

                for (i = startNodeNum; i < node.childNodes.length; i++) {
                    i += this.searchHtmlElement(node.childNodes[i], nodeName, className, words, wordsWithAccentedChars,
                        searchForSeparateWords, isCaseSensitive, fullWordsOnly, pageNumber);
                }
            }
            return 0;
        },

        highlightOneNode: function (node, matchIndex, matchLength, highlightElementName, className, pageNumber) {
            var isSvg = false;
            var nodeJquery = $(node);
            var highlight, nodeName;
            if (nodeJquery.is("tspan") || nodeJquery.parent().is("tspan")) {
                isSvg = true;
                nodeName = this.htmlSearchHighlightSvgElement;
                var xmlns = "http://www.w3.org/2000/svg";
                highlight = document.createElementNS(xmlns, nodeName);
                highlight.setAttribute("class", className || this.htmlSearchHighlightClassName);
            }
            else {
                nodeName = this.htmlSearchHighlightElement;
                highlight = document.createElement(nodeName);
                highlight.className = className || this.htmlSearchHighlightClassName;
            }
            var highlightJquery = $(highlight);
            if (highlightElementName)
                highlightJquery.attr("name", highlightElementName);
            highlightJquery.attr("data-page-num", pageNumber.toString());

            var newNodesCreated = 0;
            var wordNode;
            if (matchIndex == 0) {
                wordNode = node;
            }
            else {
                wordNode = node.splitText(matchIndex);
                newNodesCreated++;
            }

            if (wordNode.textContent.length > matchLength) {
                newNodesCreated++;
                wordNode.splitText(matchLength);
            }
            var wordClone = wordNode.cloneNode(true);
            highlight.appendChild(wordClone);
            wordNode.parentNode.replaceChild(highlight, wordNode);
            return newNodesCreated;
        },

        removeSearchHighlight: function (element) {
            var htmlHighlightQuery = this.htmlSearchHighlightElement + "." + this.htmlSearchHighlightClassName;
            var svgHighlightQuery = this.htmlSearchHighlightSvgElement + "." + this.htmlSearchHighlightClassName;
            $(element).find(htmlHighlightQuery + "," + svgHighlightQuery).each(function () {
                var parent = this.parentNode;
                parent.replaceChild(this.firstChild, this);
                parent.normalize();
            });
        },

        getWords: function (phrase) {
            var separatorsRegexString = "[^" + this.searchSeparatorsList + "]+";
            var separatorsRegex = new RegExp(separatorsRegexString, "g");
            var matches = phrase.match(separatorsRegex);
            var words;
            if (matches == null) {
                words = null;
            }
            else {
                words = $.map(matches,
                function (val, index) {
                    if (val != '') {
                        return val;
                    }
                });
            }
            return words;
        },

        selectTextInRect: function (rect, clickHandler, pageNumber, selectionCounter, color, hoverHandlers) {
            if (this._dvselectable) {
                return $(this._dvselectable).dvselectable('highlightPredefinedArea', rect, clickHandler, pageNumber, selectionCounter, color, hoverHandlers);
            }
            return null;
        },

        deselectTextInRect: function (rect, deleteStatic, pageNumber, selectionCounter) {
            if (this._dvselectable) {
                $(this._dvselectable).dvselectable('unhighlightPredefinedArea', rect, deleteStatic, pageNumber, selectionCounter);
            }
        },

        recalculatePageLeft: function () {
            if (this._firstPage != null && this.pagesContainerElement != null && !this.useVirtualScrolling) {
                var pageLeft = this._firstPage.offset().left - this.pagesContainerElement.offset().left;
                this.pageLeft(pageLeft);
            }
        },

        reInitSelectable: function () {
            var visiblePagesNumbers = this.getVisiblePagesNumbers();
            if (this._dvselectable != null) {
                this._dvselectable.dvselectable("reInitPages", this.scale(), visiblePagesNumbers,
                    this.scrollPosition, this.getPageHeight(), this.pages());
            }
        },

        reInitCanvasOffset: function () {
            var selectable = this.getSelectableInstance();
            selectable.initCanvasOffset();
        },

        openCurrentPage: function () {
            this.setPage(this.pageInd());
        },

        setPageNumerInUrlHash: function (pageIndex) {
            if (this.usePageNumberInUrlHash === undefined || this.usePageNumberInUrlHash == true) {
                if (location.hash != "" || pageIndex > 1) {
                    this.changedUrlHash = true;
                    location.hash = this.hashPagePrefix + pageIndex.toString();
                    this.changedUrlHash = false;
                }
            }
        },

        isScrollViewerVisible: function () {
            var isVisible = this.documentSpace.is(":visible");
            return isVisible;
        },

        getSelectableInstance: function () {
            if (this._dvselectable == null)
                return null;
            var selectable = this._dvselectable.data("ui-dvselectable"); // jQueryUI 1.9+
            if (!selectable)
                selectable = this._dvselectable.data("dvselectable"); // jQueryUI 1.8
            return selectable;
        },

        shouldMinimumWidthBeUsed: function (width, checkOriginalDocumentWidth) {
            var originalDocumentWidth = null;
            if (this.use_pdf != 'false' && checkOriginalDocumentWidth) {
                var pageSize = this._pdf2XmlWrapper.getPageSize();
                originalDocumentWidth = pageSize.width;
            }
            return this.minimumImageWidth != null &&
                (width <= this.minimumImageWidth || (originalDocumentWidth !== null && originalDocumentWidth < this.minimumImageWidth));
        },

        resizeViewerElement: function (viewerLeft) {
            var parent = this.documentSpace.parent();
            var parentWidth = this.getScreenWidth(parent.get(0));
            if (typeof viewerLeft == "undefined")
                viewerLeft = 0;
            else
                this.viewerLeft = viewerLeft;
            this.documentSpace.width(Math.floor(parentWidth - viewerLeft));
            this.reInitSelectable();
            this.loadImagesForVisiblePages();
        },

        onPageReordered: function (oldPosition, newPosition) {
            this._model.reorderPage(this.fileId, oldPosition, newPosition,
                this.instanceIdToken,
                function (response) {
                    if (this.pageContentType == "image") {
                        var pages = this.pages();
                        //var page = pages()[oldPosition];
                        //pages.remove(page);
                        //pages.splice(newPosition, 0, page);
                        var pageImageUrl;
                        var minPosition = Math.min(oldPosition, newPosition);
                        var maxPosition = Math.max(oldPosition, newPosition);
                        for (var i = minPosition; i <= maxPosition; i++) {
                            //pages[i].visible(false);
                            pageImageUrl = pages[i].url();
                            pages[i].url(pageImageUrl + "#0"); // to avoid caching
                            pages[i].visible(true);
                            //pages[i].url(pageImageUrl);
                            //pages[i].visible(true);
                        }
                    }
                    if (this._pdf2XmlWrapper)
                        this._pdf2XmlWrapper.reorderPage(oldPosition, newPosition);
                    this.reInitSelectable();
                    this.loadImagesForVisiblePages();
                }.bind(this),
                function (error) {
                    this._onError(error);
                }.bind(this)
            );
        },

        rotatePage: function (rotationAmount) {
            var pageNumber = this.pageInd() - 1;
            this._model.rotatePage(this.fileId, pageNumber, rotationAmount,
                this.instanceIdToken,
                function (response) {
                    var page = this.pages()[pageNumber];
                    this.applyPageRotationInBrowser(pageNumber, page, response.resultAngle);
                    this.reflowPagesInChrome();
                    this.setPage(pageNumber + 1);
                    this.loadImagesForVisiblePages(true);
                }.bind(this),
                function (error) {
                    this._onError(error);
                }.bind(this));
        },

        applyPageRotationInBrowser: function (pageNumber, page, angle) {
            if (!this.supportPageRotation)
                return;
            var oldRotation = page.rotation();
            if (oldRotation == 0 && angle == 0)
                return;

            if (this.pageContentType == "image" && oldRotation != angle) {
                page.visible(false);
                this.addSuffixToImageUrl(page);
                page.visible(true);
            }

            page.rotation(angle);
            var newAngle = page.rotation() % 180;

            var pagesFromServer = this._pdf2XmlWrapper.documentDescription.pages;
            var pageSize, pageFromServer;

            var pageWidth, pageHeight, maxPageHeight;
            if (this.useTabsForPages()) {
                var htmlPageContents = this.documentSpace.find(".html_page_contents:first");
                var pageElement = htmlPageContents.children("div,table");
                pageWidth = pageElement.width();
                pageHeight = pageElement.height();
                this.initialWidth = pageWidth;

                if (newAngle > 0) {
                    maxPageHeight = pageWidth;
                    //this.pageWidth(pageHeight * this.zoom() / 100);
                }
                else {
                    maxPageHeight = pageHeight;
                    //this.pageWidth(pageWidth * this.zoom() / 100);
                }
                this.pageWidth(pageWidth * this.zoom() / 100);
                return;
            }
            else {
                if (pagesFromServer) {
                    pageSize = this.getPageSize();
                    pageFromServer = pagesFromServer[pageNumber];
                    pageFromServer.rotation = angle;
                    pageWidth = pageFromServer.w;
                    pageHeight = pageFromServer.h;
                    maxPageHeight = pageSize.height;
                }
                else
                    return;
            }

            var scaleRatio;

            if (newAngle > 0) {
                page.prop(pageWidth / pageHeight);
                if (this.pageContentType == "html") {
                    scaleRatio = this.getScaleRatioForPage(pageSize.width, pageSize.height, pageHeight, pageWidth);
                    page.heightRatio(scaleRatio);
                }
            }
            else {
                page.prop(pageHeight / pageWidth);
                if (this.pageContentType == "html") {
                    scaleRatio = this.getScaleRatioForPage(pageSize.width, pageSize.height, pageWidth, pageHeight);
                    page.heightRatio(scaleRatio);
                }
            }
            this.calculatePagePositionsForVirtualMode();
            this.reInitSelectable();
            var selectable = this.getSelectableInstance();
            if (selectable != null)
                selectable.clearSelectionOnPage(pageNumber);
            this.loadImagesForVisiblePages(true);
        },

        _calculatePageSizeFromDOM: function () {
            var htmlPageContents = this.documentSpace.find(".html_page_contents:first");
            var pageElement = htmlPageContents.children("div,table,img");
            if (this.autoHeight()) {
                var pageWidth = pageElement.width();
                this.initialWidth = pageWidth;
            }
            this.pageWidth(this.initialWidth * this.zoom() / 100);

            var dimensions = pageElement[0].getBoundingClientRect();
            var reserveHeight = 0;
            this.autoHeight(true);
            var page = this.pages()[0];
            var screenWidth;
            var screenHeight;
            if (typeof dimensions.width == "undefined") // IE8
                screenWidth = dimensions.right - dimensions.left;
            else
                screenWidth = dimensions.width;

            if (typeof dimensions.height == "undefined") // IE8
                screenHeight = dimensions.bottom - dimensions.top;
            else
                screenHeight = dimensions.height;

            if (page && page.rotation && page.rotation() % 180 > 0) {
                var t = screenWidth;
                screenWidth = screenHeight;
                screenHeight = t;
            }
            screenHeight += reserveHeight;
            page.prop(screenHeight / screenWidth);
            this.autoHeight(false);
        },

        reflowPagesInChrome: function (async) {
            /* a hack to make Chrome reflow pages after changing their size 
            when SVG watermarks are enabled */
            if (this.browserIsChrome() && this.watermarkText && !this.useVirtualScrolling) {
                var self = this;
                var internalReflow = function () {
                    self.pagesContainerElement.children().each(function () {
                        $(this).css("top", 0).css("left", 0);
                    });
                };

                if (async)
                    window.setTimeout(internalReflow, 10);
                else
                    internalReflow();
            }
        },

        getHtmlElements: function (pageHtml, tagName) {
            var contentsRegex = new RegExp("<" + tagName + "[^>]*>(?:.|\\r?\\n)*?<\\/" + tagName + ">", "gi");
            var contentsFromHtml = pageHtml.match(contentsRegex);
            return contentsFromHtml;
        },

        getHtmlElementContents: function (pageHtml, tagName) {
            var contentsRegex = new RegExp("<" + tagName + "[^>]*>((?:.|\\r?\\n)*?)<\\/" + tagName + ">", "i");
            var match = pageHtml.match(contentsRegex);
            var contentsFromHtml = null;
            if (match)
                contentsFromHtml = match[1];
            return contentsFromHtml;
        },

        getHtmlElementAttributess: function (pageHtml, tagName) {
            var contentsRegex = new RegExp("<" + tagName + "[^>]*/?>", "gi");
            var contentsFromHtml = pageHtml.match(contentsRegex);
            return contentsFromHtml;
        },

        getPageBodyContents: function (pageHtml) {
            var bodyContentsFromHtml = pageHtml.match(/<body[^>]*>((?:.|\r?\n)*?)<\/body>/)[1];
            return bodyContentsFromHtml;
        },

        getPageBodyContentsWithReplace: function (pageHtml) {
            //var matches = pageHtml.match(/(<body)([^>]*>)((?:.|\r?\n)*?)(<\/body>)/);
            //var bodyContentsFromHtml = "<div" + matches[2] + matches[3] + "</div>";
            var bodStartTag = "<body";
            var bodyTagStartPos = pageHtml.indexOf(bodStartTag);
            var bodyStartPos = bodyTagStartPos + bodStartTag.length;
            var bodyEndPos = pageHtml.indexOf("/body>");
            var bodyContentsFromHtml = "<div" + pageHtml.substr(bodyStartPos, bodyEndPos - bodyStartPos) + "/div>";
            return bodyContentsFromHtml;
        },

        isPageVisible: function (pageNumber) {
            return this.pages()[pageNumber].visible();
        },

        isFirstPageVisible: function () {
            var pages = this.pages();
            if (this.useVirtualScrolling) {
                var firstVisiblePageNum = this.firstVisiblePageForVirtualMode();
                var lastVisiblePageNum = this.lastVisiblePageForVirtualMode();
                return firstVisiblePageNum <= 0 && lastVisiblePageNum >= 0;
            }
            return pages[0].visible();
        },

        isLastPageVisible: function () {
            var pages = this.pages();
            var lastPageNum = pages.length - 1;
            if (this.useVirtualScrolling) {
                var firstVisiblePageNum = this.firstVisiblePageForVirtualMode();
                var lastVisiblePageNum = this.lastVisiblePageForVirtualMode();
                return firstVisiblePageNum <= lastPageNum && lastVisiblePageNum >= lastPageNum;
            }
            return pages[lastPageNum].visible();
        },

        getPageLocations: function () {
            return this.getSelectableInstance().pageLocations;
        },

        getPageSize: function () {
            var pageSize = this._pdf2XmlWrapper.getPageSize();
            return pageSize;
        },

        fixImageReferencesInHtml: function (pageHtml) {
            var bodyContentsFromHtml = this.getPageBodyContents(pageHtml);
            return bodyContentsFromHtml;
        },

        calculatePointToPixelRatio: function () {
            var pointWidth = 100;
            var testElement = $("<div/>").css("width", pointWidth + "pt").css("height", "0");
            testElement.appendTo(this.documentSpace);
            var pixelWidth = testElement.width();
            this.pointToPixelRatio = pixelWidth / pointWidth;
            testElement.remove();
        },

        activateTab: function (number) {
            var tab = this.tabs()[number];
            var self = this;

            function activateLoadedTab() {
                var pages = self.pages();
                var page = pages[0];
                page.htmlContent(tab.htmlContent());
                var htmlPageContents = self.documentSpace.find(".html_page_contents:first");
                var pageElement = htmlPageContents.children("div,table");
                var pageWidth = pageElement.width();
                self.initialWidth = pageWidth;
                page.prop(pageElement.height() / pageWidth);
                self.pageWidth(pageWidth * self.zoom() / 100);
                
                self.activeTab(number);
                if (self.supportPageRotation)
                    self.applyPageRotationInBrowser(0, page, page.rotation());
            }

            if (tab.visible()) {
                activateLoadedTab();
            }
            else {
                this.getDocumentPageHtml(number, function () {
                    activateLoadedTab();
                });
            }
        },

        adjustInitialZoom: function () {
            var zoomIsSet = false;
            if (this.zoomToFitHeight) {
                zoomIsSet = true;
                this.setZoom(this.getFitHeightZoom());
            }
            else if (this.pageContentType == "html" && this.zoomToFitWidth) {
                //this.initialWidth = this.pageImageWidth = this.getFitWidth();
                var fittingWidth = this.getFitWidth();
                var originalPageWidth = this.pageWidth();
                if (!this.onlyShrinkLargePages || originalPageWidth > fittingWidth) {
                    var zoom = fittingWidth / originalPageWidth * 100;
                    zoomIsSet = true;
                    this.setZoom(zoom);
                }
            }

            if (!zoomIsSet && this.useTabsForPages()) {
                this._calculatePageSizeFromDOM();
            }
        },

        intToColor: function (num) {
            if (num === null)
                num = 0xFFFF0000; // default is red
            else
                num >>>= 0;

            var b = num & 0xFF,
                g = (num & 0xFF00) >>> 8,
                r = (num & 0xFF0000) >>> 16,
                a = ((num & 0xFF000000) >>> 24) / 255;
            return "rgba(" + [r, g, b, a].join(",") + ")";
        },

        watermarkTransform: function (page, element) {
            var rotation = 0;
            if (page.rotation)
                rotation = page.rotation();

            var pageProportion = page.prop();
            var top = "Top", bottom = "Bottom", diagonal = "Diagonal";
            var left = "Left", center = "Center", right = "Right";
            var vertical = "", horizontal = center;
            if (this.watermarkPosition.indexOf(top) == 0)
                vertical = top;
            else if (this.watermarkPosition.indexOf(bottom) == 0)
                vertical = bottom;
            else if (this.watermarkPosition.indexOf(diagonal) == 0) {
                vertical = diagonal;
                horizontal = center;
            }

            if (vertical != diagonal) {
                if (this.watermarkPosition.indexOf(left) != -1)
                    horizontal = left;
                else if (this.watermarkPosition.indexOf(center) != -1)
                    horizontal = center;
                else if (this.watermarkPosition.indexOf(right) != -1)
                    horizontal = right;
            }
            var returnValue = "translate";
            //var widthWithoutMargin = this.pageWidth();
            //var pageWidth = widthWithoutMargin + this.imageHorizontalMargin;
            //var pageHeight = widthWithoutMargin * pageProportion;
            var fontHeight = 10;
            var pageWidth = 100;
            var pageHeight = pageWidth * pageProportion;
            var textWidth;
            if (this.watermarkScreenWidth == null) {
                var textSize = element.getBBox();
                this.watermarkScreenWidth = textSize.width;
            }
            textWidth = this.watermarkScreenWidth;

            var scale;
            if (this.watermarkWidth == 0)
                scale = 1;
            else
                scale = this.watermarkWidth / 100.;

            var smallerSide = pageWidth;
            if (vertical == diagonal && pageHeight < pageWidth) {
                smallerSide = pageHeight;
            }
            var watermarkWidth = smallerSide * scale;
            var scaleToFitIntoPageWidth = smallerSide / textWidth;
            if (rotation % 180 != 0 && vertical != diagonal) {
                watermarkWidth = pageHeight * scale;
                scaleToFitIntoPageWidth = pageHeight / textWidth;
            }
            scale *= scaleToFitIntoPageWidth;
            var horizontalCenter = pageWidth / 2;
            var verticalCenter = pageHeight / 2;

            var horizontalShift = 0;
            switch (horizontal) {
                case center:
                    horizontalShift = ((pageWidth - watermarkWidth) / 2);
                    break;
                case left:
                    horizontalShift = 0;
                    break;
                case right:
                    horizontalShift = pageWidth - watermarkWidth;
                    break;
            }
            //Adjust vertical shift in order to eliminate text cropping
            var verticalShift;
            if (vertical === bottom) {
                verticalShift = (pageHeight - pageHeight * scale - 8);
            }
            else if (vertical === diagonal) {
                verticalShift = (pageHeight - pageHeight * scale);
            }
            else {//(vertical == top)
                verticalShift = 0;
            }
            returnValue += '(' + horizontalShift + "," + verticalShift + ')' +
                'scale(' + scale + ')';

            if (vertical == diagonal)
                returnValue += 'translate(0,' + (-verticalCenter / scale) + ') rotate(' + (-50 + rotation) + ',' + (horizontalCenter - horizontalShift) / scale + ',' + pageHeight + ') ';

            if (!page.rotation || vertical == diagonal)
                return returnValue;

            //var screenCenterMinusFontHeight = screenCenter - 10;
            var firstShift = 0, secondShift = 0, secondHorizontalShift = 0;
            var rotationCenterX, rotationCenterY = 0;
            if (horizontal == center) {
                rotationCenterX = (horizontalCenter - horizontalShift) / scale;
                if (vertical == top) {
                    rotationCenterY = 0;
                }
                else {
                    rotationCenterY = pageHeight;
                }
            }
            else if (horizontal == left) {
                rotationCenterX = horizontalCenter / scale;
                if (rotation % 180 != 0)
                    secondHorizontalShift = (horizontalCenter - verticalCenter) / scale;
                if (vertical == top) {
                    rotationCenterY = 0;
                }
                else {
                    rotationCenterY = pageHeight;
                }
            }
            else if (horizontal == right) {
                rotationCenterX = -(horizontalShift - horizontalCenter) / scale;
                if (rotation % 180 != 0)
                    secondHorizontalShift = -(horizontalCenter - verticalCenter) / scale;

                if (vertical == top) {
                    rotationCenterY = 0;
                }
                else {
                    rotationCenterY = pageHeight;
                }
            }

            switch (rotation) {
                case 90:
                    if (vertical == top) {
                        firstShift = verticalCenter / scale;
                        secondShift = -horizontalCenter / scale;
                    }
                    else {
                        firstShift = -verticalCenter / scale;
                        secondShift = horizontalCenter / scale;
                    }
                    break;
                case 180:
                    if (vertical == top) {
                        firstShift = verticalCenter / scale;
                        secondShift = -verticalCenter / scale;
                    }
                    else {
                        firstShift = -verticalCenter / scale;
                        secondShift = verticalCenter / scale;
                    }
                    break;
                case 270:
                    if (vertical == top) {
                        firstShift = verticalCenter / scale;
                        secondShift = -horizontalCenter / scale;
                    }
                    else {
                        firstShift = -verticalCenter / scale;
                        secondShift = horizontalCenter / scale;
                    }
                    break;
            }
            if (vertical == top || vertical == bottom)
                returnValue += 'translate(0,' + firstShift + ') rotate(' + rotation + ',' + rotationCenterX + ',' + rotationCenterY + ') translate(' + secondHorizontalShift + ',' + secondShift + ')';
            return returnValue;
        },

        addSuffixToImageUrl: function (page) {
            var src = page.url();
            var prefixChar = "?";
            var dummyIndex = src.indexOf('dummy=');
            if (dummyIndex != -1) {
                src = src.substring(0, dummyIndex - 1);
            }

            var paramsIndex = src.indexOf('?');
            if (paramsIndex != -1)
                prefixChar = "&";
            page.url(src + prefixChar + 'dummy=' + new Date().getTime());
        },

        isRTL: function (s) {
            return false; // Aspose.Words 15.3 fixes RTL text
            var ltrChars = 'A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF' + '\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF',
                rtlChars = '\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC',
                rtlDirCheck = new RegExp('^[^' + ltrChars + ']*[' + rtlChars + ']');

            return rtlDirCheck.test(s);
        },

        setLoadingState: function (set) {
            this.inprogress(set);
        },

        getScaleRatioForPage: function (widthForMaxHeight, maxPageHiegt, pageWidth, pageHeight) {
            var widthRatio, scaleRatio;
            if (widthForMaxHeight === undefined)
                widthRatio = 1;
            else
                widthRatio = widthForMaxHeight / pageWidth;
            scaleRatio = widthRatio;
            return scaleRatio;
        },

        pageElementStyle: function (index) {
            var result = {};
            var pages = this.pages();
            if (this.useVirtualScrolling) {
                var firstVisiblePageNum = this.firstVisiblePageForVirtualMode();
                index += firstVisiblePageNum;
                if (firstVisiblePageNum < pages.length)
                    result.top = pages[firstVisiblePageNum].top() + 'px';
            }
            else
                result.top = '';

            if (this.layout() == this.Layouts.OnePageInRow) {
                result.display = 'block';
                result.marginLeft = 'auto';
                result.marginRight = 'auto';
            }
            else {
                result.display = '';
                result.marginLeft = '';
                result.marginRight = '';
            }

            var pageWidth = this.pageWidth();

            if (this.options.useEmScaling) {
                result.width = this.serverPages[index].w * this.pointToPixelRatio / 16. + 'em';
                result.height = this.serverPages[index].h * this.pointToPixelRatio / 16. + 'em';
            }
            else {
                result.width = pageWidth + (this.useHtmlBasedEngine ? this.imageHorizontalMargin : 0) + 'px';
                if (this.autoHeight()) {
                    result.width = 'auto';
                    result.height = 'auto';
                    result.overflow = 'visible';
                }
                else {
                    if (index < pages.length)
                        result.height = pageWidth * pages[index].prop() + 'px';
                    result.overflow = 'hidden';
                }
            }

            return result;
        },

        setLayout: function (layout) {
            this.layout(layout);
            this.calculatePagePositionsForVirtualMode();
            this.loadImagesForVisiblePages();
            this.documentSpace.trigger("layoutChanged.groupdocs");
        },

        calculatePagePositionsForVirtualMode: function () {
            if (this.useVirtualScrolling) {
                var pageVerticalMargin = 15; // pixels
                var pageHorizontalMargin = this.pageWrapperHorizontalMargin; // pixels from left
                var pages = this.pages();
                var width = this.pageWidth();
                var documentHeight = 0;
                var page, proportion, pageHeight;
                var pageLeft, pageTop;
                var rowHeight = 0;
                var pagesInRow;
                var scrollbarWidth = 0;
                var documentSpaceRect = this.documentSpace.get(0).getBoundingClientRect();
                var documentSpaceWidth = documentSpaceRect.width;
                var layout = this.layout();
                for (var pass = 0; pass <= 1; pass++) {
                    pageLeft = pageHorizontalMargin;
                    pageTop = 0;
                    switch (layout) {
                        case this.Layouts.ScrollMode:
                            var widthWithMargin = width + pageHorizontalMargin;
                            var pagesContainerWidth = documentSpaceWidth - scrollbarWidth;
                            pagesInRow = Math.floor(pagesContainerWidth / widthWithMargin);
                            if (pagesInRow == 0)
                                pagesInRow = 1;
                            break;
                        case this.Layouts.OnePageInRow:
                            pagesInRow = 1;
                            break;
                        case this.Layouts.TwoPagesInRow:
                        case this.Layouts.CoverThenTwoPagesInRow:
                            pagesInRow = 2;
                            break;
                    }

                    var isFirstPageInRow, isLastPageInRow;
                    var i;
                    for (i = 0; i < pages.length; i++) {
                        page = pages[i];
                        proportion = page.prop();
                        pageHeight = width * proportion;
                        page.left = pageLeft;
                        page.top(pageTop);
                        isFirstPageInRow = (layout != this.Layouts.CoverThenTwoPagesInRow && i % pagesInRow == 0)
                        || (layout == this.Layouts.CoverThenTwoPagesInRow && (i == 0 || i % pagesInRow == 1));

                        isLastPageInRow = layout == this.Layouts.OnePageInRow
                        || (layout == this.Layouts.TwoPagesInRow && i % pagesInRow == 1)
                        || (layout == this.Layouts.CoverThenTwoPagesInRow && (i == 0 || i % pagesInRow == 0))
                        || (layout == this.Layouts.ScrollMode && i % pagesInRow == pagesInRow - 1);

                        if (isFirstPageInRow || (!isFirstPageInRow && pageHeight > rowHeight))
                            rowHeight = pageHeight;
                        documentHeight = pageTop + rowHeight + pageVerticalMargin;

                        if (isLastPageInRow) {
                            pageTop += rowHeight + pageVerticalMargin;
                            if (layout != this.Layouts.OnePageInRow)
                                pageLeft = pageHorizontalMargin;
                        }
                        else {
                            if (layout != this.Layouts.OnePageInRow)
                                pageLeft += width + pageHorizontalMargin;
                        }
                    }
                    this.documentHeight(documentHeight);

                    var isScrollbarPresent = false;
                    if (layout == this.Layouts.OnePageInRow || layout == this.Layouts.ScrollMode) {
                        isScrollbarPresent = documentHeight > documentSpaceRect.height;
                        if (isScrollbarPresent)
                            scrollbarWidth = this.getScrollbarWidth();
                    }
                    if (layout != this.Layouts.ScrollMode || !isScrollbarPresent)
                        break;
                }

                if (layout == this.Layouts.OnePageInRow) {
                    pageLeft = (documentSpaceWidth - width - scrollbarWidth) / 2;
                    for (i = 0; i < pages.length; i++) {
                        page = pages[i];
                        page.left = pageLeft;
                    }
                }
            }
        },

        triggerEvent: function (name, params) {
            this.documentSpace.trigger(name, params);
        },

        clearContentControls: function () {
            if (!this.supportListOfContentControls || !this.contentControlsFromHtml)
                return;
            var contentControlFromHtml;
            for (var i = 0; i < this.contentControlsFromHtml.length; i++) {
                contentControlFromHtml = this.contentControlsFromHtml[i];
                if (typeof contentControlFromHtml != "undefined" && contentControlFromHtml.visualWrapper) {
                    contentControlFromHtml.visualWrapper.remove();
                }
            }
            this.contentControlsFromHtml.length = 0;
        },

        markContentControls: function (pageNumber) {
            if (!this.supportListOfContentControls || !this.contentControls)
                return;

            var i, contentControlFromHtml;
            for (i = 0; i < this.contentControlsFromHtml.length; i++) {
                contentControlFromHtml = this.contentControlsFromHtml[i];
                if (typeof contentControlFromHtml != "undefined" && contentControlFromHtml.pageNumber == pageNumber) {
                    return;
                }
            }
            //"2D5FABC2_1start1=Document_-_Document_"
            var contentControlGuid = "2D5FABC2";
            var startType = "start";
            var endType = "end";
            var separator = "=";

            var spaceToSearchIn = this.documentSpace;
            if (typeof pageNumber != "undefined")
                spaceToSearchIn = this.documentSpace.find("#" + this.pagePrefix + (pageNumber + 1).toString());

            spaceToSearchIn.find(".content_control_visual_wrapper").remove();

            var contentControlMarkers = spaceToSearchIn.find("a[name^='" + contentControlGuid + "']");
            var contentControlsFromHtml = new Array();
            var wrappersRemain = 0;
            var contentControlNumber;
            var self = this;
            contentControlMarkers.each(function () {
                var that = $(this);
                var name = that.attr("name");
                var typePositionRegex = new RegExp("(" + startType + ")|(" + endType + ")");
                var typePosition = name.search(typePositionRegex);

                var contentControlNumberText = name.substring(contentControlGuid.length + 1, typePosition);
                contentControlNumber = parseInt(contentControlNumberText);

                if (pageNumber >= self.contentControls[contentControlNumber].startPage
                       && pageNumber <= self.contentControls[contentControlNumber].endPage) {

                    if (name.indexOf(startType) == typePosition) {
                        var contentControlTitlePosition = name.indexOf(separator, typePosition) + 1;
                        var contentControlTitle = name.substring(contentControlTitlePosition, name.length);
                        var moveUpInDom = name[typePosition + startType.length] == "1";
                        var startElement = that;
                        if (typeof contentControlsFromHtml[contentControlNumber] == "undefined") {
                            if (moveUpInDom || startElement.parent().children(":not([name^='" + contentControlGuid + "'])").length == 0)
                                startElement = startElement.parent();
                            contentControlsFromHtml[contentControlNumber] = {
                                title: contentControlTitle,
                                number: contentControlNumber
                            };
                        }
                        contentControlsFromHtml[contentControlNumber].startElement = startElement;
                        contentControlsFromHtml[contentControlNumber].moveUpInDom = moveUpInDom;
                    }
                    else {
                        if (that.parent().children(":not([name^='" + contentControlGuid + "'])").length == 0)
                            that = that.parent();

                        if (typeof contentControlsFromHtml[contentControlNumber] == "undefined") {
                            contentControlsFromHtml[contentControlNumber] = { endElement: that, number: contentControlNumber };
                        }
                        contentControlsFromHtml[contentControlNumber].endElement = that;
                    }
                }
            });

            for (i = 0; i < this.contentControls.length; i++) {
                if (pageNumber >= this.contentControls[i].startPage
                    && pageNumber <= this.contentControls[i].endPage) {
                    if (!contentControlsFromHtml[i]) {
                        contentControlsFromHtml[i] = {
                            number: i, title: this.contentControls[i].title
                        };
                    }
                }
            }

            for (i = 0; i < contentControlsFromHtml.length; i++) {
                contentControlFromHtml = contentControlsFromHtml[i];
                if (contentControlFromHtml) {
                    if (!contentControlFromHtml.startElement) {
                        contentControlFromHtml.startElement = spaceToSearchIn
                            .children(".html_page_contents").children(".pageWordToHtml").children(":first");
                    }

                    if (!contentControlFromHtml.endElement) {
                        contentControlFromHtml.endElement = spaceToSearchIn
                            .children(".html_page_contents").children(".pageWordToHtml").children(":last");
                    }

                    contentControlFromHtml.title = this.contentControls[i].title;
                    contentControlFromHtml.pageNumber = pageNumber;

                    wrappersRemain++;

                    (function (contentControlNumberInner) {
                        window.setTimeout(function () {
                            wrappersRemain--;
                            self.createContentControlWrappers(spaceToSearchIn, contentControlsFromHtml, contentControlNumberInner, contentControlGuid, wrappersRemain);
                        }, 2000);
                    })(i);
                }
            }
        },


        createContentControlWrappers: function (spaceToSearchIn, contentControlsFromHtml, contentControlNumber, contentControlGuid, wrappersRemain) {
            var contentControlFromHtml = contentControlsFromHtml[contentControlNumber];
            var startElement = contentControlFromHtml.startElement;
            var endElement = contentControlFromHtml.endElement;

            var top = startElement.offset().top;
            top -= this.pagesContainerElement.offset().top;
            var contentControlVisualWrapper = $("<div/>").appendTo(spaceToSearchIn);
            contentControlFromHtml.visualWrapper = contentControlVisualWrapper;
            contentControlVisualWrapper.addClass("content_control_visual_wrapper");

            var elementsBetween = startElement.nextUntil(endElement, ":not([name^='" + contentControlGuid + "'])").add(endElement);
            if (contentControlFromHtml.moveUpInDom)
                elementsBetween = elementsBetween.add(startElement);
            var childrenBetween = elementsBetween.find("*");
            elementsBetween = elementsBetween.add(childrenBetween);
            var minLeft = null, maxRight = null, minTop = null, maxBottom = null;
            var innerElementLeft, innerElementWidth, innerElementTop, innerElementHeight;
            var currentZoom = this.zoom() / 100;
            elementsBetween.each(function () {
                var innerElement = $(this);
                if (innerElement.width() == 0 || innerElement.height() == 0)
                    return;
                innerElementLeft = innerElement.offset().left;

                if (minLeft === null || innerElementLeft < minLeft)
                    minLeft = innerElementLeft;

                innerElementWidth = innerElement.width() * currentZoom;
                if (maxRight === null || innerElementLeft + innerElementWidth > maxRight)
                    maxRight = innerElementLeft + innerElementWidth;

                innerElementTop = innerElement.offset().top;
                if (minTop === null || innerElementTop < minTop)
                    minTop = innerElementTop;

                innerElementHeight = innerElement.height() * currentZoom;
                if (maxBottom === null || innerElementTop + innerElementHeight > maxBottom)
                    maxBottom = innerElementTop + innerElementHeight;
            });
            //var containerOffsetLeft = self.pagesContainerElement.offset().left;
            //var containerOffsetTop = self.pagesContainerElement.offset().top;

            var containerOffsetLeft = spaceToSearchIn.offset().left;
            var containerOffsetTop = spaceToSearchIn.offset().top;

            contentControlVisualWrapper.css("left", (minLeft - containerOffsetLeft) + "px");
            contentControlVisualWrapper.css("width", maxRight - minLeft + "px");
            contentControlVisualWrapper.css("top", (minTop - containerOffsetTop) + "px");
            contentControlVisualWrapper.css("height", maxBottom - minTop + "px");

            contentControlVisualWrapper.attr("data-title", contentControlFromHtml.title);
            if (wrappersRemain == 0) {
                contentControlsFromHtml.sort(function (a, b) {
                    if (a.visualWrapper && b.visualWrapper)
                        return b.visualWrapper.width() * b.visualWrapper.height() - a.visualWrapper.width() * a.visualWrapper.height();
                    else
                        return 0;
                });
                var startZIndex = 1;
                for (var i = 0; i < contentControlsFromHtml.length; i++) {
                    contentControlFromHtml = contentControlsFromHtml[i];
                    if (typeof contentControlFromHtml != "undefined" && contentControlFromHtml.visualWrapper) {
                        contentControlFromHtml.visualWrapper.css("z-index", i + startZIndex);
                        if (this.contentControlToBeOpened !== null && this.contentControlToBeOpened == contentControlFromHtml.number) {
                            this.visuallySelectContentControl(contentControlFromHtml);
                            this.contentControlToBeOpened = null;
                        }
                    }
                    this.contentControlsFromHtml.push(contentControlsFromHtml[i]);
                }
            }
        },

        getContentControlDescriptions: function () {
            return this.contentControls;
        },

        navigateToContentControl: function (number) {
            number = parseInt(number);
            var pageNumber = this.contentControls[number].startPage;
            var found = false;
            if (this.pages()[pageNumber].visible()) {
                var contentControlFromHtml;
                for (var i = 0; i < this.contentControlsFromHtml.length; i++) {
                    contentControlFromHtml = this.contentControlsFromHtml[i];
                    if (typeof contentControlFromHtml != "undefined" && contentControlFromHtml.number == number) {
                        this.visuallySelectContentControl(contentControlFromHtml);
                        found = true;
                        break;
                    }
                }
            }

            if (!found) {
                this.contentControlToBeOpened = number;
                this.setPage(pageNumber + 1);
            }
        },

        visuallySelectContentControl: function (contentControlFromHtml) {
            var contentControlHeaderHeight = 20;
            this.documentSpace[0].scrollTop = contentControlFromHtml.visualWrapper.offset().top -
                 this.pagesContainerElement.offset().top -
                 contentControlHeaderHeight;

            var hoverClass = "hover";
            var allWrappers = this.documentSpace.find(".doc-page .content_control_visual_wrapper");
            allWrappers.removeClass(hoverClass);
            allWrappers.unbind("mouseleave");
            contentControlFromHtml.visualWrapper.addClass(hoverClass);
            allWrappers.bind("mouseleave", function () {
                contentControlFromHtml.visualWrapper.removeClass(hoverClass);
                allWrappers.unbind("mouseleave");
            });
            this.documentSpace.trigger("ScrollDocView", [null, { target: this.documentSpace[0] }]);
            this.documentSpace.trigger("ScrollDocViewEnd", [null, { target: this.documentSpace[0] }]);
        },

        initCustomBindings: function () {
            if (!ko.bindingHandlers.searchText) {
                ko.bindingHandlers.searchText = {
                    update: function (element, valueAccessor, allBindings, viewModelParam, bindingContext) {
                        var viewModel = bindingContext.$root;
                        var page = bindingContext.$data;
                        if (!page.searched) {
                            var value = ko.utils.unwrapObservable(valueAccessor());
                            viewModel.parseSearchParameters(element, value);
                        }
                        page.searched = false;
                    }
                };
            }

            if (!ko.bindingHandlers.parsedHtml) {
                ko.bindingHandlers.parsedHtml = {
                    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                        var modelValue = valueAccessor();
                        var jqueryElement = $(element);
                        var elementValue = jqueryElement.html();

                        if (ko.isWriteableObservable(modelValue)) {
                            modelValue(elementValue);
                        }
                        else { //handle non-observable one-way binding
                            var allBindings = allBindingsAccessor();
                            if (allBindings['_ko_property_writers'] && allBindings['_ko_property_writers'].parsedHtml)
                                allBindings['_ko_property_writers'].parsedHtml(elementValue);
                        }
                    },
                    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                        var value = ko.unwrap(valueAccessor()) || "";
                        var page = bindingContext.$data;
                        var jqueryElement = $(element);
                        jqueryElement.empty();
                        if (value) {
                            if (typeof page.currentValue == "undefined"
                                || page.currentValue === null
                                || page.currentValue != value) {
                                var trimmedValue = value.replace(/^[\r\n\s]+|[\r\n\s]+$/g, "");
                                page.parsedHtmlElement = $(trimmedValue);
                                page.currentValue = value;
                            }
                            jqueryElement.append(page.parsedHtmlElement);
                        }
                        else {
                            page.parsedHtmlElement = null;
                            page.currentValue = null;
                        }
                    }
                };
            }
        },

        parseSearchParameters: function (element, value) {
            var viewModel = this;
            viewModel.removeSearchHighlight(element);
            if (value) {
                var text = value.text;
                if (text) {
                    var words;
                    var isCaseSensitive = value.isCaseSensitive;
                    var treatTextAsExact = false;
                    if (value.treatPhrasesInDoubleQuotesAsExact) {
                        var trimmedText = text.replace(/^[\r\n\s]+|[\r\n\s]+$/g, "");
                        if (trimmedText.length >= 2 && trimmedText[0] == '"' && trimmedText[trimmedText.length - 1] == '"') {
                            text = text.substr(1, trimmedText.length - 2);
                            text = text.replace(/^[\r\n\s]+|[\r\n\s]+$/g, "");

                            viewModel.currentWordCounter = 0;
                            viewModel.matchedNods = [];
                            viewModel.searchMatches = [];
                            viewModel.matchedNodsCount = 0;
                            treatTextAsExact = true;
                        }
                    }
                    var reservedSymbolsRegExp = /[-[\]{}()*+?.,\\^$|#\s]/g;

                    words = viewModel.getWords(text);
                    if (words == null)
                        return;
                    words = jQuery.map(words, function (word, i) {
                        return word.replace(reservedSymbolsRegExp, "\\$&");
                    });

                    var wordsWithAccentedChars = words;
                    var processedWord;
                    if (viewModel.useAccentInsensitiveSearch || viewModel.useRtl) {
                        wordsWithAccentedChars = new Array();

                        for (wordNum = 0; wordNum < words.length; wordNum++) {
                            processedWord = words[wordNum];
                            if (viewModel.useAccentInsensitiveSearch)
                                processedWord = window.jGroupdocs.stringExtensions.getAccentInsensitiveRegexFromString(processedWord);
                            //if (viewModel.useRtl)
                            //    processedWord = window.jGroupdocs.stringExtensions.unicodeEscape(processedWord);

                            wordsWithAccentedChars.push(processedWord);
                        }
                    }

                    viewModel.searchHtmlElement(element, null, null, words, wordsWithAccentedChars,
                                                value.searchForSeparateWords, isCaseSensitive, treatTextAsExact, value.pageNumber);
                    return;
                }
            }
        },

        highlightSearch: function () {
            if (this.pageContentType == "image" && this.useVirtualScrolling) {
                var selectable = this.getSelectableInstance();
                if (selectable) {
                    selectable.highlightSearch(
                        this.firstVisiblePageForVirtualMode(),
                        this.lastVisiblePageForVirtualMode());
                }
            }
        },

        firePageImageLoadedEvent: function (pageNumber, event) {
            this.firePageImageEvent(pageNumber, event, false);
        },

        firePageImageLoadErrorEvent: function (pageNumber, event) {
            this.firePageImageEvent(pageNumber, event, true);
        },

        firePageImageEvent: function (pageNumber, event, isErrorEvent) {
            var domElement = event.target;

            if (this.useFullSizeImages || isErrorEvent) {
                var pages = this.pages();
                var page = null;
                if (pageNumber < pages.length)
                    page = pages[pageNumber];

                if (page) {
                    if (page.visible()) {
                        page.domElement = domElement;
                        if (isErrorEvent) {
                            this.triggerEvent("pageImageLoadError.groupdocs", [pageNumber, domElement]);
                            this._onError({ Reason: "The page " + pageNumber + " can't be loaded" });
                        }
                        else
                            this.triggerEvent("pageImageLoaded.groupdocs", [pageNumber, domElement]);
                    }
                }
            }
        },

        raiseDocumentLoadCompletedEvent: function () {
            this.documentSpace.trigger("documentLoadCompleted.groupdocs");
        },

        _setTextPositionsCalculationFinished: function (value) {
            if (!this._isTextPositionsCalculationFinished) {
                this._isTextPositionsCalculationFinished = value;
                if (value)
                    this.raiseDocumentLoadCompletedEvent();
            }
        },

        getScreenWidth: function (domElement) {
            var dimensions = domElement.getBoundingClientRect();
            var screenWidth;

            if (typeof dimensions.width == "undefined") // IE8
                screenWidth = dimensions.right - dimensions.left;
            else
                screenWidth = dimensions.width;
            return screenWidth;
        },

        visiblePagesChangedHandler: function () {
            this.highlightSearch();
            this.triggerEvent("visiblePagesChanged.groupdocs");
        }
    });
})(jQuery);
(function ($, undefined) {
    $.widget('ui.navigation', {
        _viewModel: null,
        _pageCount: 0,

        _create: function () {
            if (this.options.createHtml) {
                this._createHtml();
            }
            else if (this.options.createEmbeddedHtml) {
                this._createEmbeddedHtml();
            }
            this._viewModel = this.getViewModel();
            ko.applyBindings(this._viewModel, this.element.get(0));
        },
        _createViewModel: function () {
            var viewModel = {
                pageInd: ko.observable(1),
                pageCount: ko.observable(0)
            };

            viewModel.up = function () {
                this.up();
            }.bind(this);

            viewModel.down = function () {
                this.down();
            }.bind(this);

            viewModel.selectPage = function (pageIndex) {
                this.set(pageIndex);
            }.bind(this);

            viewModel.onKeyPress = function (viewModelObject, e) {
                this.onKeyPress(e);
                return true;
            }.bind(this);

            viewModel.setPageIndex = function (index) {
                this.setPageIndex(index);
            }.bind(this);

            viewModel.openFirstPage = function () {
                this.set(1);
            }.bind(this);

            viewModel.openLastPage = function () {
                this.set(this._viewModel.pageCount());
            }.bind(this);

            viewModel.setPagesCount = function (pagesCount) {
                this.setPagesCount(pagesCount);
            }.bind(this);

            return viewModel;
        },
        getViewModel: function () {
            if (!this._viewModel) {
                this._viewModel = this._createViewModel();
            }
            return this._viewModel;
        },
        up: function () {
            var ci = this._viewModel.pageInd();
            var pc = this._viewModel.pageCount();
            var ni;
            if (ci <= 0)
                ni = 1;
            else {
                if (ci > pc)
                    ni = pc;
                else
                    ni = ci != 1 ? ci - 1 : 1;
            }
            this._viewModel.pageInd(ni);
            $(this.element).trigger('onUpNavigate', ni);
        },
        down: function () {
            var ci = this._viewModel.pageInd();
            var pc = this._viewModel.pageCount();
            var ni;
            if (ci <= 0)
                ni = 1;
            else {
                if (ci > pc)
                    ni = pc;
                else
                    ni = ci != pc ? (parseInt(ci) + 1) : ci;
            }
            this._viewModel.pageInd(ni);
            $(this.element).trigger('onDownNavigate', ni);
        },

        set: function (index) {
            var oldPageIndex = this._viewModel.pageInd();
            var newPageIndex = this.setPageIndex(index);

            var direction = 'up';
            if (oldPageIndex > newPageIndex)
                direction = 'down';
            $(this.element).trigger('onSetNavigate', { pageIndex: newPageIndex, direction: direction });
        },

        setPageIndex: function (index) {
            var newPageIndex = Number(index);

            var pc = this._viewModel.pageCount();
            if (isNaN(newPageIndex))
                newPageIndex = 1;
            else if (newPageIndex <= 0)
                newPageIndex = 1;
            else if (newPageIndex > pc)
                newPageIndex = pc;

            this._viewModel.pageInd(newPageIndex);
            return newPageIndex;
        },

        openFirstPage: function () {
            this.selectPage(1);
        },

        openLastPage: function () {
            this.selectPage(this.pageCount());
        },

        onKeyPress: function (e) {
            if (e.keyCode == 13) {
                this.set(this._viewModel.pageInd());
            }
        },
        setPagesCount: function (pagesCount) {
            this._pageCount = pagesCount;
            this._viewModel.pageCount(pagesCount);
        },

        _createHtml: function () {
            var root = this.element;
            root.addClass('left');

            $('<span class="new_head_tools_btn h_t_i_nav1" data-bind="click: function() { selectPage(1); }, css: {disabled: pageInd() <= 1}" data-tooltip="First Page" data-localize-tooltip="FirstPage"></span>' +
              '<span class="new_head_tools_btn h_t_i_nav2" data-bind="click: up, css: {disabled: pageInd() <= 1}" data-tooltip="Previous Page" data-localize-tooltip="PreviousPage"></span>' +
              '<input class="new_head_input" type="text" style="width: 17px;" data-bind="value: pageInd, valueUpdate: [\'afterkeydown\'], event: { keyup: onKeyPress }" />' +
              '<p class="new_head_of" data-localize="Of">of</p>' +
              '<p class="new_head_of" data-bind="text: pageCount()"></p>' +
            //'<p class="new_head_of" data-bind="text: \'of \' + pageCount()"></p>' +
              '<span class="new_head_tools_btn h_t_i_nav3" data-bind="click: down, css: {disabled: pageInd() >= pageCount()}" data-tooltip="Next Page" data-localize-tooltip="NextPage"></span>' +
              '<span class="new_head_tools_btn h_t_i_nav4" data-bind="click: function() { selectPage(this.pageCount()); }, css: {disabled: pageInd() >= pageCount()}" data-tooltip="Last Page" data-localize-tooltip="LastPage"></span>').appendTo(root);
            root.trigger("onHtmlCreated");
        },

        _createEmbeddedHtml: function () {
            var root = this.element;
            root.addClass('left');

            $('<span class="embed_viewer_icons icon1" data-bind="click: function() { selectPage(1); }"></span>' +
              '<span class="embed_viewer_icons icon2" data-bind="click: up"></span>' +
              '<p>Page</p>' +
              '<input type="text" name="textfield" class="page_nmbr" data-bind="value: pageInd, valueUpdate: [\'afterkeydown\'],  event: { keyup: onKeyPress }"/>' +
              '<p>of <span data-bind="text: pageCount()" ></span></p>' +
              '<span class="embed_viewer_icons icon3" data-bind="click: down"></span>' +
              '<span class="embed_viewer_icons icon4" data-bind="click: function() { selectPage(this.pageCount()); }"></span>'
                ).appendTo(root);
            root.trigger("onHtmlCreated");
        }

    });
})(jQuery);
(function ($, undefined) {
    $.widget('ui.zooming', {
        options: {
            zoomValues: [5, 15, 25, 50, 75, 100, 125, 150, 175, 200, 300, 400, 600]
        },
        _viewModel: null,
        _create: function () {
            if (this.options.createHtml) {
                this._createHtml();
            }
            this._viewModel = this.getViewModel();
            ko.applyBindings(this._viewModel, this.element.get(0));

            $(this._viewModel).bind('onSetZoom', function (e, value) {
                $(this.element).trigger('onSetZoom', [value]);
            } .bind(this));

            $(this._viewModel).bind("zoomSet.groupdocs", function (e, value) {
                this.element.trigger("zoomSet.groupdocs", [value]);
            } .bind(this));
        },
        getViewModel: function () {
            if (this._viewModel) {
                return this._viewModel;
            }
            var options = $.extend({ element: this.element }, this.options);
            var vm = new zoomingViewModel(options);
            return vm;
        },

        _createHtml: function () {
            var root = this.element;
            this.element = $(
'<div class="left">' +
'    <a class="new_head_tools_btn h_t_i_zoomin" href="#" data-bind="click: zoomIn" data-tooltip="Zoom In" data-localize-tooltip="ZoomIn"> </a>' +
'    <a class="new_head_tools_btn h_t_i_zoomout" href="#" data-bind="click: zoomOut" data-tooltip="Zoom Out" data-localize-tooltip="ZoomOut"> </a>' +
'    <div class="new_head_tools_dropdown_wrapper">' +
'        <a class="new_head_tools_btn head_tool_dropdown_btn h_t_i_zoom" href="#" data-bind="click: toggleDropDownMenu" data-tooltip="Zoom Level" data-localize-tooltip="ZoomLevel">' +
'        </a>' +
'        <ul class="dropdown-menu head_tool_dropdown" style="display: none;" data-bind="style: {display: (dropDownMenuIsVisible() ? \'block\' : \'none\')}, foreach: zooms">' +
'            <li>' +
'                <a href="#" data-bind="text: name, event: { mousedown: function(item, e) { $parent.setZoom(item, e); } }, attr: {\'data-localize\': $data.localizationKey }"></a>' +
'            </li>' +
'        </ul>' +
'    </div>' +
'</div>'

            ).appendTo(root);
            root.trigger("onHtmlCreated");
        }
    });

    // Zooming Model
    zoomingModel = function () {
    };

    // Zooming ViewModel
    zoomingViewModel = function (options) {
        $.extend(this, options);
        this._init(options);
    };

    $.extend(zoomingViewModel.prototype, {
        _model: null,
        zooms: null,
        _currentZoom: null,
        _currentZoomIndex: 0,
        dropDownMenuIsVisible: null,
        dropDownMenuClicked: false,

        _init: function (options) {
            this._currentZoom = ko.observable(100);
            this.zooms = ko.observableArray([]);
            this.dropDownMenuIsVisible = ko.observable(false);

            var zoomValue;
            for (var i = options.zoomValues.length - 1; i >= 0; i--) {
                zoomValue = options.zoomValues[i];
                this.zooms.push({ name: zoomValue.toString() + "%", value: zoomValue });

                if (zoomValue == this._currentZoom()) {
                    this._currentZoomIndex = this.zooms().length - 1;
                }
            }
            this.setFitWidthZoom(100);
            this.setFitHeightZoom(100);
        },

        setFitWidthZoom: function (fitWidthZoom) {
            var fitWidthItem = { name: "Fit Width", value: fitWidthZoom, localizationKey: "FitWidth", fitWidth: true };
            var found = false;
            for (var i = 0; i < this.zooms().length; i++) {
                if (this.zooms()[i].fitWidth) {
                    //this.zooms.splice(i, 1, fitWidthItem);
                    this.zooms()[i].value = fitWidthZoom;
                    found = true;
                    break;
                }
            }

            if (!found)
                this.zooms.push(fitWidthItem);
        },

        setFitHeightZoom: function (fitHeightZoom) {
            var fitHeightItem = { name: "Fit Height", value: fitHeightZoom, localizationKey: "FitHeight", fitHeight: true };
            var found = false;
            for (var i = 0; i < this.zooms().length; i++) {
                if (this.zooms()[i].fitHeight) {
                    //this.zooms.splice(i, 1, fitHeightItem);
                    this.zooms()[i].value = fitHeightZoom;
                    found = true;
                    break;
                }
            }

            if (!found)
                this.zooms.push(fitHeightItem);
        },

        getZoom: function () {
            return this._currentZoom();
        },

        getFitWidthZoomValue: function () {
            var zoomItem;
            for (var i = 0; i < this.zooms().length; i++) {
                zoomItem = this.zooms()[i];
                if (zoomItem.fitWidth) {
                    return zoomItem.value;
                }
            }
        },

        getFitHeightZoomValue: function () {
            var zoomItem;
            for (var i = 0; i < this.zooms().length; i++) {
                zoomItem = this.zooms()[i];
                if (zoomItem.fitHeight) {
                    return zoomItem.value;
                }
            }
        },

        setZoom: function (item, e) {
            var zoom = item.value;
            var index = this._indexOfZoom(zoom);

            this._currentZoom(zoom);
            if (index >= 0) {
                this._currentZoomIndex = index;
            }
            else {
                this._currentZoomIndex = this._indexOfNearestZoom(zoom, false);
            }
            $(this).trigger('onSetZoom', zoom);
            $(this).trigger("zoomSet.groupdocs", zoom);
        },

        setZoomWithoutEvent: function (zoom) {
            var index = this._indexOfZoom(zoom);
            if (index >= 0) {
                this._currentZoom(zoom);
                this._currentZoomIndex = index;
            }
        },

        zoomIn: function () {
            var changed = false;
            var currentZoomIndex = this._currentZoomIndex;

            if (this._isFitToBounds()) {
                currentZoomIndex = this._indexOfNearestZoom(this.zooms()[this._currentZoomIndex].value, true);
                changed = (currentZoomIndex >= 0);
            }
            else
                if (this._currentZoomIndex > 0) {
                    currentZoomIndex = this._currentZoomIndex - 1;
                    changed = true;
                }

            if (changed) {
                this._currentZoomIndex = currentZoomIndex;
                this._currentZoom(this.zooms()[this._currentZoomIndex].value);
                $(this).trigger('onSetZoom', this._currentZoom());
                $(this).trigger("zoomSet.groupdocs", this._currentZoom());
            }
        },

        zoomOut: function () {
            var changed = false;
            var currentZoomIndex = this._currentZoomIndex;

            if (this._isFitToBounds()) {
                currentZoomIndex = this._indexOfNearestZoom(this.zooms()[this._currentZoomIndex].value, false);
                changed = (currentZoomIndex >= 0);
            }
            else
                if (this._currentZoomIndex < this.zooms().length - 1 &&
                    !(this.zooms()[this._currentZoomIndex + 1].fitWidth || this.zooms()[this._currentZoomIndex + 1].fitHeight)) {
                    currentZoomIndex = this._currentZoomIndex + 1;
                    changed = true;
                }

            if (changed) {
                this._currentZoomIndex = currentZoomIndex;
                this._currentZoom(this.zooms()[this._currentZoomIndex].value);
                $(this).trigger('onSetZoom', this._currentZoom());
                $(this).trigger("zoomSet.groupdocs", this._currentZoom());
            }
        },

        _indexOfZoom: function (value) {
            for (i = 0; i < this.zooms().length; i++) {
                if (this.zooms()[i].value == value) {
                    return i;
                }
            }

            return -1;
        },

        _indexOfNearestZoom: function (value, greater) {
            var startIndex = this.zooms().length - 1;
            var nearestGreaterValue = null, nearestGreaterValueIndex = null,
                nearestSmallerValue = null, nearestSmallerValueIndex = null;
            var current, currentElement;

            for (i = startIndex; i >= 0; i--) {
                currentElement = this.zooms()[i];
                current = currentElement.value;
                if (!currentElement.fitWidth && !currentElement.fitHeight) {
                    if (current > value && (nearestGreaterValue === null || current < nearestGreaterValue)) {
                        nearestGreaterValue = current;
                        nearestGreaterValueIndex = i;
                    }
                    else if (current < value && (nearestSmallerValue === null || current > nearestSmallerValue)) {
                        nearestSmallerValue = current;
                        nearestSmallerValueIndex = i;
                    }
                }
            }

            if (greater) {
                if (nearestGreaterValueIndex === null)
                    return -1;
                else
                    return nearestGreaterValueIndex;
            }
            else {
                if (nearestSmallerValueIndex === null)
                    return -1;
                else
                    return nearestSmallerValueIndex;
            }
        },

        _isFitToBounds: function () {
            return (this.zooms()[this._currentZoomIndex].fitWidth || this.zooms()[this._currentZoomIndex].fitHeight);
        },

        showDropDownMenu: function (show) {
            this.dropDownMenuIsVisible(show);
        },

        toggleDropDownMenu: function (viewModel, event) {
            this.dropDownMenuIsVisible(!this.dropDownMenuIsVisible());
            this.dropDownMenuClicked = true;
            this.element.trigger("onMenuClicked");
            event.stopPropagation();
        }

        //isDropDownMenuClicked: function () {
        //    var dropDownMenuClicked = this.dropDownMenuClicked;
        //    this.dropDownMenuClicked = false;
        //    return dropDownMenuClicked;
        //}
    });
})(jQuery);

(function ($, undefined) {
    $.widget('ui.thumbnails', {
        _viewModel: null,
        _pageCount: 0,
        _sessionToken: '',
        _docGuid: '',
        _docVersion: 1,
        _pagesWidth: '150',
        _heightWidthRatio: 0,
        _thumbsSelected: 0,
        _thumbnailWidth: 150,
        _portalService: Container.Resolve("PortalService"),
        options: {
            quality: null,
            use_pdf: "false",
            baseUrl: null,
            userId: 0,
            userKey: null,
            supportPageRotation: false
        },
        _create: function () {
            this.useHtmlThumbnails = this.options.useHtmlThumbnails;
            this.useHtmlBasedEngine = this.options.useHtmlBasedEngine;
            this.emptyImageUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=";
            if (this.options.supportPageReordering) {
                var self = this;
                ko.bindingHandlers.sortableArray = {
                    init: function (element, valueAccessor) {
                        var thumbnails = valueAccessor();
                        $(element).sortable({
                            axis: "y",
                            update: function (event, ui) {
                                var movedElement = ui.item[0];
                                //retrieve our actual data item
                                var dataItem = ko.dataFor(movedElement);
                                //var item = ui.item.tmplItem().data;
                                //figure out its new position
                                var oldPosition = thumbnails.indexOf(dataItem);
                                var newPosition = ko.utils.arrayIndexOf(ui.item.parent().children(), movedElement);
                                ui.item.remove();
                                //remove the item and add it back in the right spot
                                if (newPosition >= 0) {
                                    thumbnails.remove(dataItem);
                                    thumbnails.splice(newPosition, 0, dataItem);
                                }
                                self.rootElement.trigger("onPageReordered", [oldPosition, newPosition]);
                            }
                        });
                    }
                };
            }

            if (this.options.createHtml) {
                this._createHtml();
            }
            if (this.options.thumbnailWidth)
                this._thumbnailWidth = this.options.thumbnailWidth;

            this._viewModel = this.getViewModel();
            ko.applyBindings(this._viewModel, this.element.get(0));
            if (this.options.useInnerThumbnails)
                ko.applyBindings(this._viewModel, this.toggleThuumbnailsButton[0]);
        },

        _createViewModel: function () {
            var viewModel =
            {
                thumbnails: ko.observableArray([]),
                pageInd: ko.observable(1),
                pageCount: ko.observable(0),
                busy: ko.observable(true)
            };
            viewModel._thumbnailHeight = ko.observable(201);
            viewModel.useInnerThumbnails = this.options.useInnerThumbnails;
            viewModel.openThumbnails = ko.observable(this.options.openThumbnails);
            viewModel.element = this.element;
            viewModel.rootElement = this.rootElement;
            viewModel.thumbnailPanelElement = this.thumbnailPanelElement;
            viewModel.emptyImageUrl = this.emptyImageUrl;
            if (this.useHtmlThumbnails)
                viewModel.scale = ko.observable(0);

            viewModel.scrollThumbnailsPanel = function (e) {
                this._onScrollLeftPanel(e);
            }.bind(this);

            viewModel.selectPage = function (pageIndex) {
                this.set(pageIndex);
            }.bind(this);

            viewModel.showThumbnails = function (show) {
                var thumbnail;
                for (var i = 0; i < this.thumbnails().length; i++) {
                    thumbnail = this.thumbnails()[i];
                    thumbnail.visible(show);
                }
            };

            viewModel.hideThumbnails = function () {
                this.showThumbnails(false);
            };

            viewModel.onProcessPages = function (data, pages, getDocumentPageHtmlCallback, viewerViewModel, pointToPixelRatio, docViewerId) {
                this.onProcessPages(data, pages, getDocumentPageHtmlCallback, viewerViewModel, pointToPixelRatio, docViewerId);
            }.bind(this);

            viewModel.setThumbnailsScroll = function (data) {
                this.setThumbnailsScroll(data);
            }.bind(this);

            viewModel.set = function (index) {
                this.set(index);
            }.bind(this);

            viewModel.setPageWithoutEvent = function (index) {
                this.setPageWithoutEvent(index);
            }.bind(this);

            viewModel.getThumbnailsPanelWidth = function () {
                var thumbnailsPanelWidth = 0;
                if (this.useInnerThumbnails)
                    thumbnailsPanelWidth = this.element.parent().width();
                return thumbnailsPanelWidth;
            };

            viewModel.toggleThumbnails = function () {
                this.openThumbnails(!this.openThumbnails());
                var thumbnailPanelWidth = this.getScreenWidth(this.thumbnailPanelElement.get(0));
                this.rootElement.trigger("onResizeThumbnails", thumbnailPanelWidth);
            };

            viewModel.getScreenWidth = function (domElement) {
                var dimensions = domElement.getBoundingClientRect();
                var screenWidth;
                if (typeof dimensions.width == "undefined") // IE8
                    screenWidth = dimensions.right - dimensions.left;
                else
                    screenWidth = dimensions.width;
                return screenWidth;
            }
            return viewModel;
        },
        getViewModel: function () {
            if (!this._viewModel) {
                this._viewModel = this._createViewModel();
            }
            return this._viewModel;
        },
        onProcessPages: function (data, pages, getDocumentPageHtmlCallback, viewerViewModel, pointToPixelRatio, docViewerId) {
            this._sessionToken = data.token;
            this._docGuid = data.guid;
            this._docVersion = data.version;
            this._viewModel.pageCount(data.page_count);

            if (!data.lic && this._viewModel.pageCount() > 3)
                this._viewModel.pageCount(3);

            this._heightWidthRatio = parseFloat(data.page_size.Height / data.page_size.Width);
            var width = this._thumbnailWidth;
            var variablePageSizeSupport = false, pageDescriptions = null, maxPageHeight, widthForMaxHeight;
            var thumbnailWrapperHeight = null;
            var baseScale;
            if (data.documentDescription && data.documentDescription.pages) {
                variablePageSizeSupport = true;
                pageDescriptions = data.documentDescription.pages;
                maxPageHeight = data.documentDescription.maxPageHeight;
                widthForMaxHeight = data.documentDescription.widthForMaxHeight;
                thumbnailWrapperHeight = maxPageHeight / widthForMaxHeight * this._thumbnailWidth;
                baseScale = (thumbnailWrapperHeight / maxPageHeight) / pointToPixelRatio;
                if (this.useHtmlThumbnails) {
                    this.getDocumentPageHtmlCallback = getDocumentPageHtmlCallback;
                    this.viewerViewModel = viewerViewModel;
                    this._viewModel.docViewerId = docViewerId;
                    var thumbnailContainerWidth = this.element.width();
                    //this._viewModel.thumbLeftCoord = (thumbnailContainerWidth - width) / 2;
                }
            }

            //this._viewModel.thumbnails.removeAll();
            var notObservableThumbnails = [];
            var thumbnailDescription, verticalPadding, thumbnailWidth, thumbnailHeight, backgroundColor;
            var spinnerHeight = 47;
            var pageCount = this._viewModel.pageCount();
            var pageWidth, pageHeight, scaleRatio;
            var thumbLeftCoord;
            for (var i = 0; i < pageCount; i++) {
                thumbnailDescription = {
                    number: i + 1,
                    busy: ko.observable(true),
                    visible: ko.observable(false),
                    url: ko.observable(this.emptyImageUrl)
                };
                if (variablePageSizeSupport) {
                    if (i < pageDescriptions.length) {
                        pageWidth = pageDescriptions[i].w;
                        pageHeight = pageDescriptions[i].h;
                        var prop = pageHeight / pageWidth;
                        var rotation = pageDescriptions[i].rotation;
                        if (typeof rotation == "undefined")
                            rotation = 0;
                        if (rotation % 180 != 0)
                            prop = 1 / prop;
                        thumbnailWidth = this._thumbnailWidth;
                        thumbnailHeight = this._thumbnailWidth * prop;
                        if (thumbnailHeight > thumbnailWrapperHeight) {
                            scaleRatio = thumbnailWrapperHeight / thumbnailHeight;
                            thumbnailHeight = thumbnailWrapperHeight;
                            thumbnailWidth = this._thumbnailWidth * scaleRatio;
                        }
                    }
                    else {
                        thumbnailWidth = this._thumbnailWidth;
                        thumbnailHeight = 215;
                    }
                    thumbnailDescription.width = ko.observable(thumbnailWidth);
                    thumbnailDescription.height = ko.observable(thumbnailHeight);
                    verticalPadding = 0;
                    backgroundColor = "";
                    if (thumbnailHeight < spinnerHeight) {
                        verticalPadding = ((spinnerHeight - thumbnailHeight) / 2).toString();
                        backgroundColor = "white";
                    }
                    thumbnailDescription.verticalPadding = ko.observable(verticalPadding);
                    thumbnailDescription.backgroundColor = ko.observable(backgroundColor);
                    thumbnailDescription.wrapperHeight = thumbnailWrapperHeight;
                    //thumbnailDescription.scale = ko.observable(baseScale * pageDescriptions[i].h / maxPageHeight);
                    thumbnailDescription.scale = ko.observable((thumbnailHeight / pageDescriptions[i].h) / pointToPixelRatio);
                    thumbLeftCoord = (thumbnailContainerWidth - thumbnailWidth) / 2;
                    thumbnailDescription.thumbLeftCoord = ko.observable(thumbLeftCoord);

                    if (this.useHtmlThumbnails) {
                        thumbnailDescription.htmlContent = pages[i].htmlContent;
                    }
                }

                notObservableThumbnails.push(thumbnailDescription);
            }
            this._viewModel.thumbnails(notObservableThumbnails);
            var height = parseInt(this._heightWidthRatio * width);
            var thumbCss = "";
            if (variablePageSizeSupport) {
                //thumbCss = "div.thumbnailsContainer ul li img{background-color:white}";
            }
            else {
                thumbCss = ".grpdx .thumbnailsContainer .thumb-page{min-height:" + height.toString() + "px}";
            }

            this.loadThumbnails();
        },

        loadThumbnails: function () {
            // var countToShow = Math.ceil($('#thumbnails-container').height() / $('#thumb-1').height()); // count of visible thumbs
            var countToShow = Math.ceil(this.element.height() / parseInt(this._heightWidthRatio * 150)); // count of visible thumbs

            this._countToShowOnThumbDiv = countToShow;
            this._thumbsCountToShow = Number(countToShow) + Math.ceil(Number(Number(countToShow) / 2)); // count thumbs for show
            this._thumbsSelected = this._thumbsCountToShow; //_thumbsSelected = _thumbsCountToShow on start

            this.retrieveImageUrls(this._viewModel.pageCount());
        },

        retrieveImageUrls: function (imageCount) {
            this._portalService.getImageUrlsAsync(this.options.userId, this.options.userKey, this._docGuid,
                    (this.options._mode == 'webComponent' ? this._thumbnailWidth : this._thumbnailWidth.toString() + "x"), this._sessionToken, 0, imageCount,
                    this.options.quality, this.options.use_pdf, this._docVersion, null, null, null, null,
                    this.options.ignoreDocumentAbsence,
                    this.options.useHtmlBasedEngine, this.options.supportPageRotation,
                    function (response) {
                        response = response.data;
                        var imageUrls;
                        if (response.imageUrls && typeof response.image_urls == "undefined")
                            imageUrls = response.imageUrls;
                        else
                            imageUrls = response.image_urls; ;

                        for (var i = 0; i < imageCount; i++) {
                            this._viewModel.thumbnails()[i].url(imageUrls[i]);
                        }
                        this._onScrollLeftPanel();

                    }.bind(this),
                    function (error) {
                        for (var i = 0; i < imageCount; i++) {
                            this.makeThumbnailNotBusy(i);
                        }
                    }.bind(this),
                this.options.instanceIdToken,
                this.options.locale
            );
        },

        makeThumbnailNotBusy: function (thumbnailIndex) {
            var currentThumbnail = this._viewModel.thumbnails()[thumbnailIndex];
            currentThumbnail.busy(false);
        },

        _onScrollLeftPanel: function () {
            var pageCount = this._viewModel.pageCount();
            var width = this._thumbnailWidth;
            var thumbContainer = this.element;
            var thumbnailHeight = thumbContainer.find(".thumb-page:first").outerHeight(false); // div height

            var scrollTop = thumbContainer.scrollTop();
            var th = thumbContainer.height(); // thumbnails height
            var startIndex = Math.floor(scrollTop / thumbnailHeight);
            var endIndex = Math.floor((scrollTop + th) / thumbnailHeight) + 1;
            var end = (endIndex < pageCount - 2) ? endIndex + 2 : pageCount;

            for (var i = startIndex; i < end; i++) {
                if (this.useHtmlThumbnails) {
                    this.getDocumentPageHtmlCallback.call(this.viewerViewModel, i);
                }
                this._viewModel.thumbnails()[i].visible(true);
            }

            this._thumbsSelected = endIndex;
        },
        setThumbnailsScroll: function (data) {
            var index = data.pi;
            if (this._viewModel.pageInd() != index) {
                this._viewModel.pageInd(index);
                if (!data.eventAlreadyRaised)
                    this.element.trigger('onSetThumbnailsScroll', index);
            }

            var thumbnailsContainerTop = this.element.offset().top;

            var thumbWrapper = this.element.children("ul").children("li:nth-child(" + this._viewModel.pageInd() + ")");
            if (thumbWrapper.length == 0)
                return;
            var thumbPageTop = thumbWrapper.offset().top;
            var divBottomPos = thumbPageTop - $(window).height();
            var divTopPos = thumbPageTop + thumbWrapper.height() - thumbnailsContainerTop;
            var leftScrollPos = this.element.scrollTop();
            var dif = thumbPageTop - thumbnailsContainerTop;
            if (divBottomPos > 0 || divTopPos < 0) {
                this.element.scrollTop(leftScrollPos + dif);
            }
        },

        set: function (index) {
            this._viewModel.pageInd(index);
            $(this.element).trigger('onSetThumbnails', index);
        },
        setPageWithoutEvent: function (index) {
            this._viewModel.pageInd(index);
        },
        setPagesCount: function (pagesCount) {
            this._pageCount = pagesCount;
            this._viewModel.pageCount(pagesCount);
        },

        _createHtml: function () {
            var root = this.element;
            var foreachOperator;

            if (this.options.supportPageReordering) {
                //foreachOperator = "sortable: {data: thumbnails, afterMove: function(arg){console.log('arg.sourceIndex:',arg.sourceIndex)}}";
                foreachOperator = "foreach: thumbnails, sortableArray: thumbnails";
            }
            else {
                foreachOperator = "foreach: thumbnails";
            }

            this.element = $(
'<div class="thumbnailsContainer" data-bind="event: { scroll: function(e) { scrollThumbnailsPanel(e); } }, visible:!useInnerThumbnails || openThumbnails">' +
'    <ul class="vertical-list2 ui-selectable" data-bind="' + foreachOperator + '">' +
'        <li class="thumb-page ui-selectee" data-bind="style: {height: $data.wrapperHeight + \'px\'}, css: { \'ui-selected\': ($index() + 1) == $root.pageInd() }, click: function() { $root.selectPage($index() + 1); }">' +
//'                <div class="thumbnail_wrapper" data-bind="style: {height: $data.height() + 2 * $data.verticalPadding() + \'px\'}">' +

(this.useHtmlThumbnails ?
(
'        <div class="thumbnail_wrapper" data-bind="style: {width:$data.width() + \'px\',height: $data.height() + 2 * $data.verticalPadding() + \'px\'}">' +
'           <div class="html_page_contents"' +
'                 data-bind="html: htmlContent, ' +
'                        visible: visible(),' +
'                        attr: {id: $root.docViewerId + \'pageHtml-\' + ($index() + 1) },' +
'                        style: { padding: $data.verticalPadding() + \'px 0\', ' +
'                                   MozTransform: \'scale(\' + $data.scale() + \')\', ' +
'                                    \'-webkit-transform\': \'scale(\' + $data.scale() + \')\',' +
'                                    \'-ms-transform\': \'scale(\' + $data.scale() + \')\' }">' +
'            </div>' +

'           <div class="html_page_contents mouse_intercept_overlay">' +
'            </div>'
)
:
(
'                <div class="thumbnail_wrapper" data-bind="style: {height: $data.height() + 2 * $data.verticalPadding() + \'px\'}">' +
'                    <img class="ui-selectee thumb_image" src="' + this.emptyImageUrl + '" data-bind="attr: {src: visible() ? url() : $root.emptyImageUrl}, style: {width: (visible() ? $data.width() : 0) + \'px\', height: (visible() ? $data.height() : 0) + \'px\', padding: $data.verticalPadding() + \'px 0\', backgroundColor: $data.backgroundColor()}" />'
)) +

'                </div>' +
'                <span class="progresspin thumb_progress"></span>' +
'        </li>' +
'    </ul>' +
'</div>');

            if (this.options.useInnerThumbnails) {
                this.thumbnailPanelElement = $('<div class="thumbnail_panel"></div>');
                this.element.appendTo(this.thumbnailPanelElement);
                this.toggleThuumbnailsButton = $('<div class="thumbnail_stripe">' +
                    '   <a class="thumbnail_open" data-bind="click:function(){toggleThumbnails();}"></a>' +
                    '</div>');
                this.toggleThuumbnailsButton.appendTo(this.thumbnailPanelElement);
                this.thumbnailPanelElement.prependTo(root);
            }
            else {
                this.element.appendTo(root);
            }
            this.rootElement = root;
        }

    });
})(jQuery);
DocViewerAdapter = function (options) {
    $.extend(this, options);
    this.init();
};
$.extend(DocViewerAdapter.prototype, {
    docViewerWidget: null,
    docViewerViewModel: null,
    navigationWidget: null,
    navigationViewModel: null,
    thumbnailsWidget: null,
    thumbnailsViewModel: null,
    zoomViewModel: null,

    init: function () {
        var docViewer = null;
        var navigation = null;
        var thumbnails = null;
        var zooming = null;
        var search = null;
        var embedSource = null;
        var viewTypeMenu = null;

        var docViewerViewModel = null;
        var navigationViewModel = null;
        var thumbnailsViewModel = null;
        var zoomViewModel = null;
        var searchViewModel = null;
        var embedSourceViewModel = null;
        var viewTypeViewModel = null;

        var menuClickedEvent = "onMenuClicked";

        if (this.thumbnails) {
            thumbnails = this.thumbnails.thumbnails(this.thumbnailsOptions || { baseUrl: this.baseUrl,
                quality: this.quality,
                use_pdf: this.use_pdf
            });
            thumbnailsViewModel = this.thumbnails.thumbnails('getViewModel');
        }
        else {
            thumbnails = this.thumbnailsCreator();
            thumbnailsViewModel = this.thumbnailsViewModelCreator();
        }

        var thumbnailsPanelWidth = 0;
        if (this.thumbnails)
            thumbnailsPanelWidth = thumbnailsViewModel.getThumbnailsPanelWidth();

        if (this.docSpace) {
            var viewerOptions = $.extend(
            {
                userId: this.userId,
                userKey: this.userKey,
                baseUrl: this.baseUrl,
                fileId: this.fileId,
                fileVersion: this.fileVersion,
                quality: this.quality,
                use_pdf: this.use_pdf,
                pageImageWidth: this.pageImageWidth,
                _mode: this._mode,
                docViewerId: this.docViewerId,
                createHtml: this.createHtml,
                initialZoom: this.initialZoom,
                alwaysOnePageInRow: this.alwaysOnePageInRow,
                zoomToFitWidth: this.zoomToFitWidth,
                zoomToFitHeight: this.zoomToFitHeight,
                viewerLeft: thumbnailsPanelWidth,
                viewerWidth: this.viewerWidth,
                viewerHeight: this.viewerHeight,
                preloadPagesCount: this.preloadPagesCount,
                selectionContent: this.selectionContent,
                usePageNumberInUrlHash: this.usePageNumberInUrlHash,
                pageContentType: this.pageContentType,
                imageHorizontalMargin: this.imageHorizontalMargin,
                imageVerticalMargin: this.imageVerticalMargin,
                useJavaScriptDocumentDescription: this.useJavaScriptDocumentDescription,
                searchPartialWords: this.searchPartialWords,
                variableHeightPageSupport: this.variableHeightPageSupport,
                textSelectionSynchronousCalculation: this.textSelectionSynchronousCalculation,
                minimumImageWidth: this.minimumImageWidth,
                fileDisplayName: this.fileDisplayName,
                preventTouchEventsBubbling: this.preventTouchEventsBubbling,
                watermarkText: this.watermarkText,
                instanceId: this.instanceId
            }, this.viewerOptions);

            docViewer = this.docSpace.docViewer(viewerOptions);
            docViewerViewModel = this.docSpace.docViewer('getViewModel');
        }
        else {
            docViewer = this.docSpaceCreator();
            docViewerViewModel = this.docSpaceViewModel();
        }

        var docViewerPageFlip = null;
        var docViewerPageFlipViewModel = null;

        if (this.docSpacePageFlip) {
            docViewerPageFlip = this.docSpacePageFlip.docViewerPageFlip({
                userId: this.userId,
                userKey: this.userKey,
                baseUrl: this.baseUrl,
                fileId: this.fileId,
                fileVersion: this.fileVersion,
                quality: this.quality,
                use_pdf: this.use_pdf,
                pageImageWidth: this.pageImageWidth,
                _mode: this._mode,
                docViewerId: this.docViewerId,
                createHtml: this.createHtml,
                initialZoom: this.initialZoom,
                alwaysOnePageInRow: this.alwaysOnePageInRow,
                zoomToFitWidth: this.zoomToFitWidth,
                zoomToFitHeight: this.zoomToFitHeight,
                viewerWidth: this.viewerWidth,
                viewerHeight: this.viewerHeight,
                selectionContent: this.selectionContent,
                minimumImageWidth: this.minimumImageWidth
            });
            docViewerPageFlipViewModel = this.docSpacePageFlip.docViewerPageFlip('getViewModel');
        }

        if (this.navigation) {
            navigation = this.navigation.navigation(this.navigationOptions);
            navigationViewModel = this.navigation.navigation('getViewModel');
        }

        if (this.search) {
            search = this.search.search($.extend(this.searchOptions, { viewerViewModel: docViewerViewModel }));
            searchViewModel = this.search.search('getViewModel');
        }

        if (this.zooming) {
            zooming = this.zooming.zooming(this.zoomingOptions || {});
            zoomViewModel = this.zooming.zooming('getViewModel');
        }

        if (this.embedSource) {
            embedSource = this.embedSource.embedSource();
            embedSourceViewModel = this.embedSource.embedSource('getViewModel');
        }

        if (this.viewTypeMenu) {
            viewTypeMenu = this.viewTypeMenu;
            viewTypeViewModel = this.viewTypeViewModel;
        }

        this.docViewerViewModel = docViewerViewModel;
        this.docViewerPageFlipViewModel = docViewerPageFlipViewModel;
        this.navigationViewModel = navigationViewModel;
        this.thumbnailsViewModel = thumbnailsViewModel;
        this.zoomViewModel = zoomViewModel;
        this.searchViewModel = searchViewModel;
        this.embedSourceViewModel = embedSourceViewModel;

        docViewer.bind('getPagesCount', function (e, pagesCount) {
            if (navigation) {
                navigationViewModel.setPagesCount(pagesCount);
            }
        } .bind(this));

        docViewer.bind("onDocumentloadingStarted", function (e) {
            if (thumbnails) {
                thumbnailsViewModel.hideThumbnails();
            }
        } .bind(this));

        docViewer.bind("documentLoadFailed.groupdocs", function (e) {
            if (thumbnails) {
                thumbnailsViewModel.showThumbnails(true);
            }
        } .bind(this));
        

        docViewer.bind('_onProcessPages', function (e, data, pages, getDocumentPageHtmlCallback, viewerViewModel, pointToPixelRatio, docViewerId) {
            if (thumbnails) {
                thumbnailsViewModel.onProcessPages(data, pages, getDocumentPageHtmlCallback, viewerViewModel, pointToPixelRatio, docViewerId);
            }
        } .bind(this));
        docViewer.bind('onScrollDocView', function (e, data) {
            if (thumbnails) {
                thumbnailsViewModel.setThumbnailsScroll(data);
            }
            if (navigation) {
                navigationViewModel.setPageIndex(data.pi);
            }
            if (search) {
                searchViewModel.scrollPositionChanged(data.position);
            }
        } .bind(this));

        docViewer.bind('onDocumentPageSet', function (e, newPageIndex) {
            if (docViewerPageFlipViewModel)
                docViewerPageFlipViewModel.onDocumentPageSet(newPageIndex);

            if (search)
                searchViewModel.documentPageSetHandler();
        });

        docViewer.bind('onDocumentLoadComplete', function (e, data, pdf2XmlWrapper) {
            if (docViewerPageFlipViewModel)
                docViewerPageFlipViewModel._onDocumentLoaded(data, pdf2XmlWrapper);

            var url = data.url;
            $("#btnDownload,#btnDownload2").bind({
                click: function () {
                    window.location.href = url;
                    return false;
                }
            });
            if (embedSource) {
                embedSourceViewModel.setGuid(data.guid);
                embedSourceViewModel.setFileId(docViewerViewModel.getFileId());
                embedSourceViewModel.password(docViewerViewModel.password());
            }

            if (zooming) {
                if (docViewerViewModel.isScrollViewerVisible()) {
                    zoomViewModel.setFitWidthZoom(docViewerViewModel.getFitWidthZoom());
                    zoomViewModel.setFitHeightZoom(docViewerViewModel.getFitHeightZoom());
                    zoomViewModel.setZoomWithoutEvent(docViewerViewModel.zoom());
                }
                else {
                    if (docViewerPageFlipViewModel) {
                        zoomViewModel.setFitWidthZoom(docViewerPageFlipViewModel.getFitWidthZoom());
                        zoomViewModel.setFitHeightZoom(docViewerPageFlipViewModel.getFitHeightZoom());
                        zoomViewModel.setZoomWithoutEvent(docViewerPageFlipViewModel.zoom());
                    }
                }
            }

            if (search) {
                searchViewModel.documentLoaded();
            }
        } .bind(this));

        docViewer.bind("layoutChanged.groupdocs", function (e) {
            if (zooming) {
                if (docViewerViewModel.isScrollViewerVisible()) {
                    zoomViewModel.setFitWidthZoom(docViewerViewModel.getFitWidthZoom());
                    zoomViewModel.setFitHeightZoom(docViewerViewModel.getFitHeightZoom());
                }
            }

            if (search) {
                searchViewModel.zoomHandler();
            }
        });

        docViewer.bind("visiblePagesChanged.groupdocs", function (e) {
            if (search) {
                searchViewModel.visiblePagesChangedHandler();
            }
        } .bind(this));

        docViewer.bind("searchAreasPositions.groupdocs", function (e, data) {
            if (search) {
                searchViewModel.searchAreasPositionsChangedHandler(data);
            }
        } .bind(this));
        
        if (docViewerPageFlip) {
            docViewerPageFlip.bind('onPageTurned', function (e, pageIndex) {
                if (navigation) {
                    navigationViewModel.setPageIndex(pageIndex);
                }
                if (thumbnails) {
                    thumbnailsViewModel.pageInd(pageIndex);
                }
                docViewerViewModel.pageInd(pageIndex);
                docViewerViewModel.setPageNumerInUrlHash(pageIndex);
            });
        }

        if (search) {
            search.bind('onPerformSearch', function (e, value, isCaseSensitive, searchForSeparateWords, treatPhrasesInDoubleQuotesAsExact, useAccentInsensitiveSearch) {
                docViewerViewModel.performSearch(value, isCaseSensitive, searchForSeparateWords, treatPhrasesInDoubleQuotesAsExact, useAccentInsensitiveSearch);
            });
        }

        if (navigation) {
            navigation.bind('onUpNavigate', function (e, pageIndex) {
                if (docViewerPageFlipViewModel)
                    docViewerPageFlipViewModel.setPage(pageIndex);

                docViewerViewModel.setPage(pageIndex);
                if (thumbnails) {
                    thumbnailsViewModel.setPageWithoutEvent(pageIndex);
                    thumbnailsViewModel.setThumbnailsScroll({ pi: pageIndex, direction: 'up' });
                }
            } .bind(this));
            navigation.bind('onDownNavigate', function (e, pageIndex) {
                if (docViewerPageFlipViewModel)
                    docViewerPageFlipViewModel.setPage(pageIndex);

                docViewerViewModel.setPage(pageIndex);
                if (thumbnails) {
                    thumbnailsViewModel.setPageWithoutEvent(pageIndex);
                    thumbnailsViewModel.setThumbnailsScroll({ pi: pageIndex, direction: 'down' });
                }
            } .bind(this));
            navigation.bind('onSetNavigate', function (e, data) {
                if (docViewerPageFlipViewModel)
                    docViewerPageFlipViewModel.setPage(data.pageIndex);

                docViewerViewModel.setPage(data.pageIndex);
                if (thumbnails) {
                    thumbnailsViewModel.setPageWithoutEvent(data.pageIndex);
                    thumbnailsViewModel.setThumbnailsScroll({ pi: data.pageIndex, direction: data.direction, eventAlreadyRaised: true });
                }
            } .bind(this));
        }

        if (zooming) {
            zooming.bind('onSetZoom', function (e, value) {
                if (docViewerPageFlipViewModel)
                    docViewerPageFlipViewModel.setZoom(value);
                docViewerViewModel.setZoom(value);
                if (search) {
                    searchViewModel.zoomHandler();
                }
            } .bind(this));

            zooming.bind(menuClickedEvent, function () {
                if (viewTypeMenu)
                    viewTypeViewModel.showDropDownMenu(false);
            });
        }

        if (thumbnails) {
            thumbnails.bind('onSetThumbnails', function (e, index) {
                docViewerViewModel.setPage(index);
                if (docViewerPageFlipViewModel)
                    docViewerPageFlipViewModel.setPage(index);
                if (navigation) {
                    navigationViewModel.setPageIndex(index);
                }
            } .bind(this));
            thumbnails.bind('onSetThumbnailsScroll', function (e, index) {
                if (navigation) {
                    navigationViewModel.setPageIndex(index);
                }
            } .bind(this));
            thumbnails.bind('onResizeThumbnails', function (e, viewerLeft) {
                docViewerViewModel.resizeViewerElement(viewerLeft);
                if (docViewerPageFlipViewModel)
                    docViewerPageFlipViewModel.resizeViewerElement(viewerLeft);
            });
            thumbnails.bind('onPageReordered', function (e, oldPosition, newPosition) {
                docViewerViewModel.onPageReordered(oldPosition, newPosition);
            });
        }

        if (viewTypeMenu) {
            viewTypeMenu.bind(menuClickedEvent, function () {
                if (zoomViewModel)
                    zoomViewModel.showDropDownMenu(false);
            });
        }
    },

    thumbnailsCreator: function () {
    },

    thumbnailsViewModelCreator: function () {
        return { set: function () { },
            setThumbnailsScroll: function () { },
            onProcessPages: function () { },
            getThumbnailsPanelWidth: function () { return 0; } 
        };
    }
});
define('core/binder',
    ['jquery', 'ko'],
    function ($, ko) {
        var
            bind = function (viewId, vmodel) {
                ko.applyBindings(vmodel, getView(viewId));
            },
            
            getView = function (viewName) {
                return $(viewName).get(0);
            };
            
        return {
            bind: bind
        };
    });
define('core/config',
    ['jquery', 'ko', "core/routes"],
    function ($, ko, routes) {
        var userId = ko.observable(),
            privateKey = ko.observable(),
            userEmail = ko.observable(),
            userName = ko.observable(),
            appPath = ko.observable(),
            uploaderProxy = ko.observable(),
            serviceAddress = ko.observable(),
            isDownloadable = false,
            useHttpHandlers = false,
            downloadableSignaturePrefix = "",
            downloadableHostUrl = "",
            useJsonp = $.browser.msie && $.browser.version < 9 && ((typeof (gdSignaturePrefix) != "undefined") && gdSignaturePrefix),
            msie11 = !!navigator.userAgent.match(/Trident\/7\./),
            templateUrl = '/scripts/signature2/views',
            viewerContainer = null,
            downloadablePrefix = "",
            initInfUser = function () {
                if (isDownloadable)
                    downloadablePrefix = downloadableSignaturePrefix + (useHttpHandlers ? "-handler" : "/embedded");
                infuser.defaults.templateUrl = downloadablePrefix+templateUrl;
                infuser.defaults.ajax.async = false;
            },
            signatureColors = ['#0036D9', '#5F5F5F', '#E15F5F', '#2DB200'],
            init = function () {
                if ((typeof (gdSignaturePrefix) != "undefined") && gdSignaturePrefix) {
                    isDownloadable = true;
                    useHttpHandlers = (typeof (gdUseHttpHandlers) != "undefined" && gdUseHttpHandlers);
                    downloadableSignaturePrefix = "/" + gdSignaturePrefix;
                    downloadableHostUrl = gdSignatureHostUrl;
                } else downloadableSignaturePrefix = "";
                initInfUser();
                userId(ViewContext.Credentials.userId);
                privateKey(ViewContext.Credentials.privateKey);
                userEmail(ViewContext.Credentials.primaryEmail);
                appPath(ViewContext.AppPath);
                uploaderProxy('Uploader.aspx');
                serviceAddress(ViewContext.Credentials.serviceAddress);
                userName(ViewContext.Credentials.userName);
            },
            alert = function (type, message) {
                if (typeof (type) == "string") {
                    //jerror(message);
                    $.confirm({
                        title: "Information",
                        message: message,
                        buttons: {
                            'OK': {
                                'class': 'red_button right'
                            }
                        }
                    });
                } else if (typeof (type) == "object") {
                    //jerror(type.message, type.handler, type.title);
                    $.confirm({
                        title: type.title,
                        message: type.message,
                        buttons: {
                            'OK': {
                                'class': 'red_button right'
                            }
                        },
                        onclose: type.closeCallback
                    });
                }
            },
            validationMessages = {
                required: "* Required",
                requiredNoStar: "Required",
                invalidEmail: "Invalid email address",
                invalidValue: "Invalid value"
            },
            signatureFieldType = { Signature: 1, SingleLine: 2, MultiLine: 3, Date: 4, Dropdown: 5, Checkbox: 6, File: 7, Stamp: 8 },
            fontSizes = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
            fontNames = ["Arial", "Times-Roman", "Helvetica", "Courier", "Courier New", "Comic Sans MS", "Impact", "Tahoma"],
            fontColors = ["#000000", "#f0f8ff", "#faebd7", "#00ffff", "#7fffd4", "#f0ffff", "#f5f5dc", "#ffe4c4", "#ffebcd", "#0000ff", "#8a2be2", "#a52a2a", "#deb887", "#5f9ea0", "#7fff00", "#d2691e", "#ff7f50", "#6495ed", "#fff8dc", "#00ffff", "#00008b", "#008b8b", "#b8860b", "#a9a9a9", "#006400", "#bdb76b", "#8b008b", "#556b2f", "#ff8c00", "#9932cc", "#8b0000", "#e9967a", "#8fbc8f", "#483d8b", "#2f4f4f", "#00ced1", "#9400d3", "#ff1493", "#00bfff", "#696969", "#1e90ff", "#b22222", "#fffaf0", "#228b22", "#ff00ff", "#dcdcdc", "#f8f8ff", "#ffd700", "#daa520", "#808080", "#008000", "#adff2f", "#f0fff0", "#ff69b4", "#cd5c5c", "#fffff0", "#f0e68c", "#e6e6fa", "#fff0f5", "#7cfc00", "#fffacd", "#add8e6", "#f08080", "#e0ffff", "#eedd82", "#fafad2", "#d3d3d3", "#90ee90", "#ffb6c1", "#ffa07a", "#20b2aa", "#87cefa", "#8470ff", "#778899", "#b0c4de", "#ffffe0", "#00ff00", "#32cd32", "#faf0e6", "#ff00ff", "#800000", "#66cdaa", "#0000cd", "#ba55d3", "#9370db", "#3cb371", "#7b68ee", "#00fa9a", "#48d1cc", "#c71585", "#191970", "#f5fffa", "#e1e4e1", "#ffe4b5", "#ffdead", "#000080", "#fdf5e6", "#808000", "#6b8e23", "#ffa500", "#ff4500", "#da70d6", "#eee8aa", "#98fb98", "#afeeee", "#db7093", "#ffefd5", "#ffdab9", "#cd853f", "#ffc0cb", "#dda0dd", "#b0e0e6", "#800080", "#ff0000", "#bc8f8f", "#4169e1", "#8b4513", "#fa8072", "#f4a460", "#2e8b57", "#fff5ee", "#a0522d", "#c0c0c0", "#87ceeb", "#6a5acd", "#708090", "#fffafa", "#00ff7f", "#4682b4", "#d2b48c", "#008080", "#d8bfd8", "#ff6347", "#40e0d0", "#ee82ee", "#d02090", "#f5deb3", "#ffffff", "#f5f5f5", "#ffff00", "#9acd32"],
            fieldValidations = [
                { name: 'Address ZIP code US', expression: '^[0-9]{5}(?:-[0-9]{4})?$', fieldType: '2,3', errorMessage: 'Please enter valid ZIP code US. For example 12345 or 12345-6789' },
                { name: 'Credit card: All major credit cards bare', expression: '^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\\d{3})\\d{11})$', fieldType: '2,3', errorMessage: 'Please enter valid credit card number' },
                { name: 'Credit card: All major credit cards (bare, named)', expression: '"^(?:(?<visa>4[0-9]{12}(?:[0-9]{3})?)|(?<mastercard>5[1-5][0-9]{14})|(?<discover>6(?:011|5[0-9][0-9])[0-9]{12})|(?<amex>3[47][0-9]{13})|(?<diners>3(?:0[0-5]|[68][0-9])[0-9]{11})|(?<jcb>(?:2131|1800|35\\d{3})\\d{11}))$"', fieldType: '2,3', errorMessage: 'Please enter valid credit card number' },
                { name: 'Credit card: All major credit cards (grouped)', expression: '^(?:4\\d{3}[ -]*\\d{4}[ -]*\\d{4}[ -]*\\d(?:\\d{3})?|5[1-5]\\d{2}[ -]*\\d{4}[ -]*\\d{4}[ -]*\\d{4}|6(?:011|5[0-9]{2})[ -]*\\d{4}[ -]*\\d{4}[ -]*\\d{4}|3[47]\\d{2}[ -]*\\d{6}[ -]*\\d{5}|3(?:0[0-5]|[68][0-9])\\d[ -]*\\d{6}[ -]*\\d{4}|(?:2131|1800)[ -]*\\d{6}[ -]*\\d{5}|35\\d{2}[ -]*\\d{4}[ -]*\\d{4}[ -]*\\d{4})$', fieldType: '2,3', errorMessage: 'Please enter valid credit card number' },
                { name: 'Credit card: All major credit cards (grouped, named)', expression: '"^(?:(?<visa>4\\d{3}[ -]*\\d{4}[ -]*\\d{4}[ -]*\\d(?:\\d{3})?) |(?<mastercard>5[1-5]\\d{2}[ -]*\\d{4}[ -]*\\d{4}[ -]*\\d{4}) |(?<discover>6(?:011|5[0-9]{2})[ -]*\\d{4}[ -]*\\d{4}[ -]*\\d{4}) |(?<amex>3[47]\\d{2}[ -]*\\d{6}[ -]*\\d{5}) |(?<diners>3(?:0[0-5]|[68][0-9])\\d[ -]*\\d{6}[ -]*\\d{4}) |(?<jcb>(?:2131|1800)[ -]*\\d{6}[ -]*\\d{5}|35\\d{2}[ -]*\\d{4}[ -]*\\d{4}[ -]*\\d{4}))$"', fieldType: '2,3', errorMessage: 'Please enter valid credit card number' },
                { name: 'Credit card: All major credit cards (spaces/dashes)', expression: '^[ -]*(?:4[ -]*(?:\\d[ -]*){11}(?:(?:\\d[ -]*){3})?\\d|5[ -]*[1-5](?:[ -]*[0-9]){14}|6[ -]*(?:0[ -]*1[ -]*1|5[ -]*\\d[ -]*\\d)(?:[ -]*[0-9]){12}|3[ -]*[47](?:[ -]*[0-9]){13}|3[ -]*(?:0[ -]*[0-5]|[68][ -]*[0-9])(?:[ -]*[0-9]){11}|(?:2[ -]*1[ -]*3[ -]*1|1[ -]*8[ -]*0[ -]*0|3[ -]*5(?:[ -]*[0-9]){3})(?:[ -]*[0-9]){11})[ -]*$', fieldType: '2,3', errorMessage: 'Please enter valid credit card number' },
                { name: 'Credit card: All major credit cards (spaces/dashes, named)', expression: '"^[ -]*(?:(?<visa>4[ -]*(?:\\d[ -]*){11}(?:(?:\\d[ -]*){3})?\\d) |(?<mastercard>5[ -]*[1-5](?:[ -]*[0-9]){14}) |(?<discover>6[ -]*(?:0[ -]*1[ -]*1|5[ -]*\\d[ -]*\\d)(?:[ -]*[0-9]){12}) |(?<amex>3[ -]*[47](?:[ -]*[0-9]){13}) |(?<diners>3[ -]*(?:0[ -]*[0-5]|[68][ -]*[0-9])(?:[ -]*[0-9]){11}) |(?<jcb>(?:2[ -]*1[ -]*3[ -]*1|1[ -]*8[ -]*0[ -]*0|3[ -]*5(?:[ -]*[0-9]){3})(?:[ -]*[0-9]){11}))[ -]*$"', fieldType: '2,3', errorMessage: 'Please enter valid credit card number' },
                { name: 'Credit card: American Express (bare)', expression: '^3[47][0-9]{13}$', fieldType: '2,3', errorMessage: 'Please enter valid credit card number' },
                { name: 'Credit card: American Express (grouped)', expression: '^3[47]\\d{2}[ -]*\\d{6}[ -]*\\d{5}$', fieldType: '2,3', errorMessage: 'Please enter valid credit card number' },
                { name: 'Credit card: American Express (spaces/dashes)', expression: '^[ -]*3[ -]*[47][ -]*(?:\\d[ -]*){13}$', fieldType: '2,3', errorMessage: 'Please enter valid credit card number' },
                { name: 'Credit card: Diners Club (bare)', expression: '^3(?:0[0-5]|[68][0-9])[0-9]{11}$', fieldType: '2,3', errorMessage: 'Please enter valid credit card number' },
                { name: 'Credit card: Diners Club (grouped)', expression: '^3(?:0[0-5]|[68][0-9])\\d[ -]*\\d{6}[ -]*\\d{4}$', fieldType: '2,3', errorMessage: 'Please enter valid credit card number' },
                { name: 'Credit card: Diners Club (spaces/dashes)', expression: '^[ -]*3[ -]*(?:0[ -]*[0-5]|[68][ -]*[0-9])[ -]*(?:\\d[ -]*){11}$', fieldType: '2,3', errorMessage: 'Please enter valid credit card number' },
                { name: 'Credit card: Discover (bare)', expression: '^6(?:011|5[0-9]{2})[0-9]{12}$', fieldType: '2,3', errorMessage: 'Please enter valid credit card number' },
                { name: 'Credit card: Discover (grouped)', expression: '^6(?:011|5[0-9]{2})[ -]*\\d{4}[ -]*\\d{4}[ -]*\\d{4}$', fieldType: '2,3', errorMessage: 'Please enter valid credit card number' },
                { name: 'Credit card: Discover (spaces/dashes)', expression: '^[ -]*6[ -]*(?:0[ -]*1[ -]*1|5[ -]*\\d[ -]*\\d)[ -]*(?:\\d[ -]*){12}$', fieldType: '2,3', errorMessage: 'Please enter valid credit card number' },
                { name: 'Credit card: JCB (bare)', expression: '^(?:2131|1800|35\\d{3})\\d{11}$', fieldType: '2,3', errorMessage: 'Please enter valid credit card number' },
                { name: 'Credit card: JCB (grouped)', expression: '^(?:(?:2131|1800)[ -]*\\d{6}[ -]*\\d{5}|35\\d{2}[ -]*\\d{4}[ -]*\\d{4}[ -]*\\d{4})$', fieldType: '2,3', errorMessage: 'Please enter valid credit card number' },
                { name: 'Credit card: JCB (spaces/dashes)', expression: '^[ -]*(?:2[ -]*1[ -]*3[ -]*1|1[ -]*8[ -]*0[ -]*0|3[ -]*5(?:[ -]*\\d){3})[ -]*(?:\\d[ -]*){11}$', fieldType: '2,3', errorMessage: 'Please enter valid credit card number' },
                { name: 'Credit card: MasterCard (bare)', expression: '^5[1-5][0-9]{14}$', fieldType: '2,3', errorMessage: 'Please enter valid credit card number' },
                { name: 'Credit card: MasterCard (grouped)', expression: '^5[1-5]\\d{2}[ -]*\\d{4}[ -]*\\d{4}[ -]*\\d{4}$', fieldType: '2,3', errorMessage: 'Please enter valid credit card number' },
                { name: 'Credit card: MasterCard (spaces/dashes)', expression: '^[ -]*5[ -]*[1-5][ -]*(?:[0-9][ -]*){14}$', fieldType: '2,3', errorMessage: 'Please enter valid credit card number' },
                { name: 'Credit card: Visa (bare)', expression: '^4[0-9]{12}(?:[0-9]{3})?$', fieldType: '2,3', errorMessage: 'Please enter valid credit card number' },
                { name: 'Credit card: Visa (grouped)', expression: '^4\\d{3}[ -]*\\d{4}[ -]*\\d{4}[ -]*\\d(?:\\d{3})?$', fieldType: '2,3', errorMessage: 'Please enter valid credit card number' },
                { name: 'Credit card: Visa (spaces/dashes)', expression: '^[ -]*4[ -]*(?:\\d[ -]*){12}(?:(?:\\d[ -]*){3})?$', fieldType: '2,3', errorMessage: 'Please enter valid credit card number' },
                { name: 'Date: dd/mm/yyyy', expression: '(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/](19|20)[0-9]{2}', fieldType: '4', errorMessage: 'Please enter valid date in format dd/mm/yyyy' },
                { name: 'Date: dd.mm.yyyy', expression: '(0[1-9]|[12][0-9]|3[01])[.](0[1-9]|1[012])[.](19|20)[0-9]{2}', fieldType: '4', errorMessage: 'Please enter valid date in format dd.mm.yyyy' },
                { name: 'Date: d/m/yy', expression: '^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/][0-9]{2}$', fieldType: '4', errorMessage: 'Please enter valid date in format d/m/yy' },
                { name: 'Date: d.m.yy', expression: '^(0?[1-9]|[12][0-9]|3[01])[-](0?[1-9]|1[012])[-][0-9]{2}$', fieldType: '4', errorMessage: 'Please enter valid date in format d.m.yy' },
                { name: 'Date: m/d/yy', expression: '^(0?[1-9]|1[012])[/](0?[1-9]|[12][0-9]|3[01])[/][0-9]{2}$', fieldType: '4', errorMessage: 'Please enter valid date in format m/d/yy' },
                { name: 'Date: m.d.yy', expression: '^(0?[1-9]|1[012])[.](0?[1-9]|[12][0-9]|3[01])[.][0-9]{2}$', fieldType: '4', errorMessage: 'Please enter valid date in format m.d.yy' },
                { name: 'Date: mm/dd/yyyy', expression: '(0[1-9]|1[012])[/](0[1-9]|[12][0-9]|3[01])[/](19|20)[0-9]{2}', fieldType: '4', errorMessage: 'Please enter valid date in format mm/dd/yyyy' },
                { name: 'Date: mm.dd.yyyy', expression: '(0[1-9]|1[012])[.](0[1-9]|[12][0-9]|3[01])[.](19|20)[0-9]{2}', fieldType: '4', errorMessage: 'Please enter valid date in format mm.dd.yyyy' },
                { name: 'Date: yy-m-d', expression: '^[0-9]{2}[-](0?[1-9]|1[012])[-](0?[1-9]|[12][0-9]|3[01])$', fieldType: '4', errorMessage: 'Please enter valid date in format yy-m-d' },
                { name: 'Date: yyyy/mm/dd', expression: '(19|20)[0-9]{2}[/](0[1-9]|1[012])[/](0[1-9]|[12][0-9]|3[01])', fieldType: '4', errorMessage: 'Please enter valid date in format yyyy/mm/dd' },
                { name: 'Date: yyyy-mm-dd', expression: '(19|20)[0-9]{2}[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])', fieldType: '4', errorMessage: 'Please enter valid date in format yyyy-mm-dd' },
                { name: 'Domain name', expression: '^([a-z0-9]+(-[a-z0-9]+)*\\.)+[a-z]{2},$', fieldType: '2,3', errorMessage: 'Please enter valid domain name' },
                { name: 'Domain name (anchored)', expression: '^([a-z0-9]+(-[a-z0-9]+)*\\.)+[a-z]{2},$', fieldType: '2,3', errorMessage: 'Please enter valid domain name' },
                { name: 'Email address', expression: '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$', fieldType: '2,3', errorMessage: 'Please enter valid email address' },
                { name: 'Email address (anchored)', expression: '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$', fieldType: '2,3', errorMessage: 'Please enter valid email address' },
                { name: 'Email address (anchored, no consecutive dots)', expression: '^[A-Za-z0-9._%+-]+@(?:[A-Za-z0-9-]+\\.)+[A-Za-z]{2,6}$', fieldType: '2,3', errorMessage: 'Please enter valid email address' },
                { name: 'Email address (no consecutive dots)', expression: '^[A-Za-z0-9._%+-]+@(?:[A-Za-z0-9-]+\\.)+[A-Za-z]{2,6}$', fieldType: '2,3', errorMessage: 'Please enter valid email address' },
                { name: 'IPv4 address (accurate)', expression: '^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])$', fieldType: '2,3', errorMessage: 'Please enter valid IPv4 address' },
                { name: 'IPv4 address (accurate, anchored)', expression: '^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])$', fieldType: '2,3', errorMessage: 'Please enter valid IPv4 address' },
                { name: 'IPv4 address (accurate capture)', expression: '^(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])$', fieldType: '2,3', errorMessage: 'Please enter valid IPv4 address' },
                { name: 'IPv4 address (simple)', expression: '^(?:[0-9]{1,3}\\.){3}[0-9]{1,3}$', fieldType: '2,3', errorMessage: 'Please enter valid IPv4 address' },
                { name: 'IPv6 address (standard)', expression: '(?<![:.\\w])(?:[A-F0-9]{1,4}:){7}[A-F0-9]{1,4}(?![:.\\w])', fieldType: '2,3', errorMessage: 'Please enter valid IPv6 address' },
                { name: 'IPv6 address (standard, anchored)', expression: '\\A(?:[A-F0-9]{1,4}:){7}[A-F0-9]{1,4}\\z', fieldType: '2,3', errorMessage: 'Please enter valid IPv6 address' },
                { name: 'National ID: Austrian social security number (Sozialversicherungsnummer)', expression: '^\\d{4}(?:0[1-9]|[12]\\d|3[01])(?:0[1-9]|1[0-5])\\d{2}$', fieldType: '2,3', errorMessage: 'Please enter valid Austrian social security number' },
                { name: 'National ID: Bulgarian Uniform Civil Number (Единен граждански номер)', expression: '^\\d{2}(?:[024][1-9]|[135][0-2])(?:0[1-9]|[12]\\d|3[01])[-+]?\\d{4}$', fieldType: '2,3', errorMessage: 'Please enter valid Bulgarian Uniform Civil Number' },
                { name: 'National ID: Canadian Social Insurance Number', expression: '^[1-9]\\d{2}[- ]?\\d{3}[- ]?\\d{3}$', fieldType: '2,3', errorMessage: 'Please enter valid Canadian Social Insurance Number' },
                { name: 'National ID: Chinese National Identification Card Number (身份证)', expression: '^\\d{6}(?:19|20)\\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\\d|3[01])\\d{4}$', fieldType: '2,3', errorMessage: 'Please enter valid Chinese National Identification Card Number' },
                { name: 'National ID: Croatian Master Citizen Number (Matični broj građana)', expression: '^(?:0[1-9]|[12]\\d|3[01])(?:0[1-9]|1[0-2])(?:9\\d{2}|0[01]\\d)\\d{6}$', fieldType: '2,3', errorMessage: 'Please enter valid Croatian Master Citizen Number' },
                { name: 'National ID: Danish Civil Registration Number (Personnummer, CPR Nummer)', expression: '^(?:0[1-9]|[12]\\d|3[01])(?:0[1-9]|1[0-2])\\d{2}[-+]?\\d{4}$', fieldType: '2,3', errorMessage: 'Please enter valid Danish Civil Registration Number' },
                { name: 'National ID: Finnish Social Security Number (Henkilötunnus)', expression: '^(?:0[1-9]|[12]\\d|3[01])(?:0[1-9]|1[0-2])\\d{2}[-+a]\\d{3}[a-z0-9]$', fieldType: '2,3', errorMessage: 'Please enter valid Finnish Social Security Number' },
                { name: 'National ID: Indian Permanent Account Number', expression: '^[a-z]{3}[abcfghjlpt][a-z]\\d{4}[a-z]$', fieldType: '2,3', errorMessage: 'Please enter valid Indian Permanent Account Number' },
                { name: 'National ID: Indian Vehicle License Plate Number', expression: '^(?:dl ?[1-9]?\\d ?[cprstvy]|[a-z]{2} ?\\d{1,2}) ?[a-z]{0,2} ?\\d{1,4}$', fieldType: '2,3', errorMessage: 'Please enter valid Indian Vehicle License Plate Number' },
                { name: 'National ID: Italian Fiscal Code (Codice fiscale)', expression: '^(?:[bcdfghj-np-tv-z][a-z]{2}){2}\\d{2}[a-ehlmprst](?:[04][1-9]|[1256]\\d|[37][01])(?:\\d[a-z]{3}|z\\d{3})[a-z]$', fieldType: '2,3', errorMessage: 'Please enter valid Italian Fiscal Code' },
                { name: 'National ID: Norwegian Social Security Number (Personnummer, Fødselsnummer, SSNR)', expression: '^(?:0[1-9]|[12]\\d|3[01])(?:[04][1-9]|[15][0-2])\\d{7}$', fieldType: '2,3', errorMessage: 'Please enter valid Norwegian Social Security Number' },
                { name: 'National ID: Romanian Personal Numeric Code (Cod Numeric Personal)', expression: '^[1-8]\\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\\d|3[01])(?:0[1-9]|[1-4]\\d|5[0-2]|99)\\d{4}$', fieldType: '2,3', errorMessage: 'Please enter valid Romanian Personal Numeric Code' },
                { name: 'National ID: South Korean Resident Registration Number (주민등록번호)', expression: '^\\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\\d|3[01])-[0-49]\\d{6}$', fieldType: '2,3', errorMessage: 'Please enter valid South Korean Resident Registration Number' },
                { name: 'National ID: Swedish Personal Identification Number (Personnummer)', expression: '^(?:19|20)?\\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\\d|3[01])[-+]?\\d{4}$', fieldType: '2,3', errorMessage: 'Please enter valid Swedish Personal Identification Number' },
                { name: 'National ID: Taiwanese National Identification Card Number', expression: '^[a-z][12]\\d{8}$', fieldType: '2,3', errorMessage: 'Please enter valid Taiwanese National Identification Card Number' },
                { name: 'National ID: United Kingdom National Insurance Number', expression: '^[abceghj-prstw-z][abceghj-nprstw-z] ?\\d{2} ?\\d{2} ?\\d{2} ?[a-dfm]?$', fieldType: '2,3', errorMessage: 'Please enter valid United Kingdom National Insurance Number' },
                { name: 'National ID: US social security number (exact)', expression: '^(?!000)(?!666)[0-8]\\d{2}[- ](?!00)\\d{2}[- ](?!0000)\\d{4}$', fieldType: '2,3', errorMessage: 'Please enter valid US social security number (exact)' },
                { name: 'National ID: US social security number (quick)', expression: '^[0-9]{3}-[0-9]{2}-[0-9]{4}$', fieldType: '2,3', errorMessage: 'Please enter valid US social security number (quick)' },
                { name: 'Number: Currency amount (cents mandatory)', expression: '^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*\\.[0-9]{2}$', fieldType: '2,3', errorMessage: 'Please enter valid currency amount (cents mandatory)' },
                { name: 'Number: Currency amount (cents optional)', expression: '^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\\.[0-9]{2})?$', fieldType: '2,3', errorMessage: 'Please enter valid currency amount (cents optional)' },
                { name: 'Number: Currency amount US & EU (cents optional)', expression: '^[+-]?[0-9]{1,3}(?:[0-9]*(?:[.,][0-9]{2})?|(?:,[0-9]{3})*(?:\\.[0-9]{2})?|(?:\\.[0-9]{3})*(?:,[0-9]{2})?)$', fieldType: '2,3', errorMessage: 'Please enter valid currency amount US & EU (cents optional)' },
                { name: 'Number: floating point', expression: '^[-+]?\\b[0-9]*\\.?[0-9]+$', fieldType: '2,3', errorMessage: 'Please enter valid floating point value' },
                { name: 'Number: integer', expression: '^([0-9]+)$', fieldType: '2,3', errorMessage: 'Please enter valid integer value' },
                { name: 'Number: integer with optional sign', expression: '^[-+]?\\b\\d+$', fieldType: '2,3', errorMessage: 'Please enter valid integer value with optional sign' },
                { name: 'Numeric range: 0..255', expression: '^([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])$', fieldType: '2,3', errorMessage: 'Please enter valid integer value in range 0 to 255' },
                { name: 'Numeric range: 0..999', expression: '^([0-9]|[1-9][0-9]|[1-9][0-9][0-9])$', fieldType: '2,3', errorMessage: 'Please enter valid integer value in range 0 to 999' },
                { name: 'Numeric range: 1..999', expression: '^([1-9]|[1-9][0-9]|[1-9][0-9][0-9])$', fieldType: '2,3', errorMessage: 'Please enter valid integer value in range 1 to 999' },
                { name: 'Numeric range: 0 or 000..127', expression: '^(0?[0-9]?[0-9]|1[0-1][0-9]|12[0-7])$', fieldType: '2,3', errorMessage: 'Please enter valid integer value in range 000 to 127' },
                { name: 'Numeric range: 0 or 000..255', expression: '^([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])$', fieldType: '2,3', errorMessage: 'Please enter valid  integer value in range 000 to 255' },
                { name: 'Numeric range: 0 or 000..366', expression: '^(0?[0-9]?[0-9]|[1-2][0-9][0-9]|3[0-6][0-9]|36[0-6])$', fieldType: '2,3', errorMessage: 'Please enter valid integer value in range 000 to 366' },
                { name: 'Numeric range: 0 or 000..999', expression: '^[0-9]{1,3}$', fieldType: '2,3', errorMessage: 'Please enter valid  integer value in range 000 to 999' },
                { name: 'Numeric range: 0 or 00..59', expression: '^[0-5]?[0-9]$', fieldType: '2,3', errorMessage: 'Please enter valid  integer value in range 00 to 59' },
                { name: 'Numeric range: 1 or 001..999', expression: '^(0{0,2}[1-9]|0?[1-9][0-9]|[1-9][0-9][0-9])$', fieldType: '2,3', errorMessage: 'Please enter valid integer value in range 001 to 999' },
                { name: 'Phone Number (North America)', expression: '^(?\\b[0-9]{3}\\)?[-. ]?[0-9]{3}[-. ]?[0-9]{4}$', fieldType: '2,3', errorMessage: 'Please enter valid North America phone number' },
                { name: 'Postal code (Canada)', expression: '^[ABCEGHJKLMNPRSTVXY][0-9][A-Z] [0-9][A-Z][0-9]$', fieldType: '2,3', errorMessage: 'Please enter valid postal code (Canada)' },
                { name: 'Postal code (UK)', expression: '^[A-Z]{1,2}[0-9][A-Z0-9]? [0-9][ABD-HJLNP-UW-Z]{2}$', fieldType: '2,3', errorMessage: 'Please enter valid postal code (UK)' },
                { name: 'URL: Different URL parts', expression: '"\\b((?#protocol)https?|ftp)://((?#domain)[-A-Z0-9.]+)((?#file)/[-A-Z0-9+&@#/%=~_|!:,.\': \']*)?((?#parameters)\\?[A-Z0-9+&@#/%=~_|!:,.\': \']*)?"', fieldType: '2,3', errorMessage: 'Please enter valid URL' },
                { name: 'VAT number: Austria', expression: '^(AT)?U[0-9]{8}$', fieldType: '2,3', errorMessage: 'Please enter valid VAT number (Austria)' },
                { name: 'VAT number: Belgium', expression: '^(BE)?0[0-9]{9}$', fieldType: '2,3', errorMessage: 'Please enter valid VAT number (Belgium)' },
                { name: 'VAT number: Bulgaria', expression: '^(BG)?[0-9]{9,10}$', fieldType: '2,3', errorMessage: 'Please enter valid VAT number (Bulgaria)' },
                { name: 'VAT number: Cyprus', expression: '^(CY)?[0-9]{8}L$', fieldType: '2,3', errorMessage: 'Please enter valid VAT number (Cyprus)' },
                { name: 'VAT number: Czech Republic', expression: '^(CZ)?[0-9]{8,10}$', fieldType: '2,3', errorMessage: 'Please enter valid VAT number (Czech Republic)' },
                { name: 'VAT number: Denmark', expression: '^(DK)?[0-9]{8}$', fieldType: '2,3', errorMessage: 'Please enter valid VAT number (Denmark)' },
                { name: 'VAT number: Estonia', expression: '^(EE)?[0-9]{9}$', fieldType: '2,3', errorMessage: 'Please enter valid VAT number (Estonia)' },
                { name: 'VAT number: Finland', expression: '^(FI)?[0-9]{8}$', fieldType: '2,3', errorMessage: 'Please enter valid VAT number (Finland)' },
                { name: 'VAT number: France', expression: '^(FR)?[0-9A-Z]{2}[0-9]{9}$', fieldType: '2,3', errorMessage: 'Please enter valid VAT number (France)' },
                { name: 'VAT number: Germany', expression: '^(DE)?[0-9]{9}$', fieldType: '2,3', errorMessage: 'Please enter valid VAT number (Germany)' },
                { name: 'VAT number: Greece', expression: '^(EL|GR)?[0-9]{9}$', fieldType: '2,3', errorMessage: 'Please enter valid VAT number (Greece)' },
                { name: 'VAT number: Hungary', expression: '^(HU)?[0-9]{8}$', fieldType: '2,3', errorMessage: 'Please enter valid VAT number (Hungary)' },
                { name: 'VAT number: Ireland', expression: '^(IE)?[0-9]S[0-9]{5}L$', fieldType: '2,3', errorMessage: 'Please enter valid VAT number (Ireland)' },
                { name: 'VAT number: Italy', expression: '^(IT)?[0-9]{11}$', fieldType: '2,3', errorMessage: 'Please enter valid VAT number (Italy)' },
                { name: 'VAT number: Latvia', expression: '^(LV)?[0-9]{11}$', fieldType: '2,3', errorMessage: 'Please enter valid VAT number (Latvia)' },
                { name: 'VAT number: Lithuania', expression: '^(LT)?([0-9]{9}|[0-9]{12})$', fieldType: '2,3', errorMessage: 'Please enter valid VAT number (Lithuania)' },
                { name: 'VAT number: Luxembourg', expression: '^(LU)?[0-9]{8}$', fieldType: '2,3', errorMessage: 'Please enter valid VAT number (Luxembourg)' },
                { name: 'VAT number: Malta', expression: '^(MT)?[0-9]{8}$', fieldType: '2,3', errorMessage: 'Please enter valid VAT number (Malta)' },
                { name: 'VAT number: Netherlands', expression: '^(NL)?[0-9]{9}B[0-9]{2}$', fieldType: '2,3', errorMessage: 'Please enter valid VAT number (Netherlands)' },
                { name: 'VAT number: Poland', expression: '^(PL)?[0-9]{10}$', fieldType: '2,3', errorMessage: 'Please enter valid VAT number (Poland)' },
                { name: 'VAT number: Portugal', expression: '^(PT)?[0-9]{9}$', fieldType: '2,3', errorMessage: 'Please enter valid VAT number (Portugal)' },
                { name: 'VAT number: Romania', expression: '^(RO)?[0-9]{2,10}$', fieldType: '2,3', errorMessage: 'Please enter valid VAT number (Romania)' },
                { name: 'VAT number: Slovakia', expression: '^(SK)?[0-9]{10}$', fieldType: '2,3', errorMessage: 'Please enter valid VAT number (Slovakia)' },
                { name: 'VAT number: Slovenia', expression: '^(SI)?[0-9]{8}$', fieldType: '2,3', errorMessage: 'Please enter valid VAT number (Slovenia)' },
                { name: 'VAT number: Spain', expression: '^(ES)?[0-9A-Z][0-9]{7}[0-9A-Z]$', fieldType: '2,3', errorMessage: 'Please enter valid VAT number (Spain)' },
                { name: 'VAT number: Sweden', expression: '^(SE)?[0-9]{12}$', fieldType: '2,3', errorMessage: 'Please enter valid VAT number (Sweden)' },
                { name: 'VAT number: United Kingdom', expression: '^(GB)?([0-9]{9}([0-9]{3})?|[A-Z]{2}[0-9]{3})$', fieldType: '2,3', errorMessage: 'Please enter valid VAT number (United Kingdom)' }
            ],
            signaturePadDefaultFont = 'Herr Von Muellerhoff',
            verifyDocumentProxy = ko.observable('/signature2/service/UploadFileToVerify'),
            fontsArray = ['Herr Von Muellerhoff', 'Tangerine', 'Allan', 'Calligraffitti', 'Cherry Cream Soda', 'Chewy', 'Coda', 'Coming Soon', 'Covered By Your Grace', 'Crafty Girls', 'Crushed', 'Fontdiner Swanky', 'Homemade Apple', 'Irish Growler', 'Just Another Hand', 'Just Me Again Down Here', 'Kenia', 'Kranky', 'Kristi', 'Lobster', 'Luckiest Guy', 'Mountains of Christmas', 'Neucha', 'Permanent Marker', 'Philosopher', 'Reenie Beanie', 'Rock Salt', 'Schoolbell', 'Slackey', 'Sunshiney', 'Syncopate', 'UnifrakturMaguntia', 'Unkempt', 'Vibur', 'Walter Turncoat', 'Yanone Kaffeesatz'],
            checkBrowserForSvgSupport = function() {
                return !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', "svg").createSVGRect;
            },
            envelopeRecipientStatus = [{ name: 'Expired', id: -2 }, { name: 'None', id: -1}, { name: 'Waiting', id: 0 }, { name: 'Notified', id: 1 }, { name: 'Delegated', id: 2 }, { name: 'Rejected', id: 3 }, { name: 'Signed', id: 4 }],
            signatureFieldAlign = { Left: 0, Center: 1, Right: 2 },
            checkFileApiSupport = function () {
                return (typeof (window.File) != "undefined" &&
                    typeof (window.FileReader) != "undefined" &&
                    typeof (window.FileList) != "undefined" &&
                    typeof (window.Blob) != "undefined");
            },
            checkHtml5StorageSupport = function() {
                try {
                    return 'localStorage' in window && window['localStorage'] !== null;
                } catch (e) {
                    return false;
                }
            },
            dateFormats = [
                'dd.mm.yy',
                'dd/mm/yy',
                'd/m/yy',
                'd.m.yy',
                'm/d/yy',
                'm.d.yy',
                'mm/dd/yy',
                'mm.dd.yy',
                'yy-m-d',
                'yy/mm/dd',
                'yy-mm-dd'
            ];
        init();

        return {
            userId: userId,
            privateKey: privateKey,
            userEmail: userEmail,
            appPath: appPath,
            uploaderProxy: uploaderProxy,
            userName: userName,
            alert: alert,
            validationMessages: validationMessages,
            routes: routes,
            serviceAddress: serviceAddress,
            signatureFieldType: signatureFieldType,
            fontSizes: fontSizes,
            fontNames: fontNames,
            fontColors: fontColors,
            fieldValidations: fieldValidations,
            signaturePadDefaultFont: signaturePadDefaultFont,
            verifyDocumentProxy: verifyDocumentProxy,
            fontsArray: fontsArray,
            checkBrowserForSvgSupport: checkBrowserForSvgSupport,
            envelopeRecipientStatus: envelopeRecipientStatus,
            signatureFieldAlign: signatureFieldAlign,
            templateUrl: templateUrl,
            downloadableSignaturePrefix: downloadableSignaturePrefix,
            isDownloadable: isDownloadable,
            downloadableHostUrl: downloadableHostUrl,
            signatureColors: signatureColors,
            useJsonp: useJsonp,
            viewerContainer: viewerContainer,
            msie11: msie11,
            checkFileApiSupport: checkFileApiSupport,
            checkHtml5StorageSupport: checkHtml5StorageSupport,
            dateFormats: dateFormats,
            downloadablePrefix: downloadablePrefix
        };
    });
define('core/dataservice/dataservice.contact',
    ['lib/amplify'],
    function (amplify) {
        var
            init = function () {

                amplify.request.define('getContacts', 'ajax', {
                    url: '/signature2/service/GetContacts',
                    dataType: 'json',
                    type: 'POST',
                    cache: 50
                });
                amplify.request.define('addContact', 'ajax', {
                    url: '/signature2/service/AddContact',
                    dataType: 'json',
                    type: 'POST'
                    //cache: true
                });
                amplify.request.define('deleteContacts', 'ajax', {
                    url: '/signature2/service/DeleteContacts',
                    dataType: 'json',
                    contentType: 'application/json',
                    type: 'POST',
                    decoder: function (data, status, xhr, success, error) 
                    { 
                        if (status === "success") { 
                            success(data, status, xhr); 
                        } 
                        else { 
                            error(data, status, xhr); 
                        } 
                    }, 
                    dataMap: function(data) { 
                        if(typeof data === 'object') { 
                            return JSON.stringify(data); 
                        } 
                        return data; 
                    }                     
                    //cache: true
                });
                amplify.request.define('updateContact', 'ajax', {
                    url: '/signature2/service/UpdateContact',
                    dataType: 'json',
                    type: 'POST'
                    //cache: true
                });
                amplify.request.define('importContacts', 'ajax', {
                    url: '/signature2/service/ImportContacts',
                    dataType: 'json',
                    contentType: 'application/json',
                    type: 'POST',
                    decoder: function (data, status, xhr, success, error) {
                        if (status === "success") {
                            success(data, status, xhr);
                        }
                        else {
                            error(data, status, xhr);
                        }
                    },
                    dataMap: function (data) {
                        if (typeof data === 'object') {
                            return JSON.stringify(data);
                        }
                        return data;
                    }
                    //cache: true
                });

            },

            getContacts = function (callbacks, data) {
                return amplify.request({
                    resourceId: 'getContacts',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: data
                });
            },
            addContact = function (callbacks, data) {
                return amplify.request({
                    resourceId: 'addContact',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: data
                });
            },
            deleteContacts = function (callbacks, data) {
                return amplify.request({
                    resourceId: 'deleteContacts',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: data
                });
            },
            updateContact = function (callbacks, data) {
                return amplify.request({
                    resourceId: 'updateContact',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: data
                });
            },
            importContacts = function (callbacks, data) {
                return amplify.request({
                    resourceId: 'importContacts',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: data
                });
            };


        init();

        return {
            getContacts: getContacts,
            addContact: addContact,
            deleteContacts: deleteContacts,
            updateContact: updateContact,
            importContacts: importContacts
        };
    });
define('core/dataservice/dataservice.document',
    ['lib/amplify', 'core/config'],
    function (amplify, config) {
        var init = function() {

                amplify.request.define('publicSignDocument', 'ajax', {
                    url: config.downloadableHostUrl + config.downloadableSignaturePrefix + '/signature2/service/PublicSignDocument',
                    contentType: 'application/json; charset=utf-8',
                    dataType: config.useJsonp ? 'jsonp' : 'json',
                    type: config.useJsonp ? 'GET' : 'POST'
                    //cache: true
                });
                amplify.request.define('publicGetDocumentStatus', 'ajax', {
                    url: '/signature2/service/PublicGetSignDocumentStatus',
                    dataType: 'json',
                    type: 'POST'
                    //cache: true
                });
                amplify.request.define('publicGetDocumentFields', 'ajax', {
                    url: config.downloadableHostUrl + config.downloadableSignaturePrefix + '/signature2/service/PublicGetDocumentFields',
                    contentType: 'application/json; charset=utf-8',
                    dataType: config.useJsonp ? 'jsonp' : 'json',
                    type: config.useJsonp ? 'GET' : 'POST'
                    //cache: true
                });
                amplify.request.define('publicGetDocument', 'ajax', {
                    url: config.downloadableHostUrl + config.downloadableSignaturePrefix + '/signature2/service/PublicGetDocument',
                    contentType: 'application/json; charset=utf-8',
                    dataType: config.useJsonp ? 'jsonp' : 'json',
                    type: config.useJsonp ? 'GET' : 'POST'
                    //cache: true
                });
                amplify.request.define('publicSaveDocumentFields', 'ajax', {
                    url: config.downloadableHostUrl + config.downloadableSignaturePrefix + '/signature2/service/PublicSaveDocumentFields',
                    contentType: 'application/json; charset=utf-8',
                    dataType: config.useJsonp ? 'jsonp' : 'json',
                    type: config.useJsonp ? 'GET' : 'POST'
                    //cache: true
                });
            },
            publicSignDocument = function(callbacks, data) {
                return amplify.request({
                    resourceId: 'publicSignDocument',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: config.useJsonp ? { data: JSON.stringify(data) } : JSON.stringify(data)
                    //data: data
                });
            },
            publicGetDocumentStatus = function(callbacks, data) {
                return amplify.request({
                    resourceId: 'publicGetDocumentStatus',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: data
                });
            },
            publicGetDocumentFields = function(callbacks, data) {
                return amplify.request({
                    resourceId: 'publicGetDocumentFields',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: config.useJsonp ? { data: JSON.stringify(data) } : JSON.stringify(data)
                });
            },
            publicGetDocument = function(callbacks, data) {
                return amplify.request({
                    resourceId: 'publicGetDocument',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: config.useJsonp ? { data: JSON.stringify(data) } : JSON.stringify(data)
                });
            },
            publicSaveDocumentFields = function(callbacks, data) {
                return amplify.request({
                    resourceId: 'publicSaveDocumentFields',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: config.useJsonp ? { data: JSON.stringify(data) } : JSON.stringify(data)
                });
            };

        init();

        return {
            publicSignDocument: publicSignDocument,
            publicGetDocumentStatus: publicGetDocumentStatus,
            publicGetDocumentFields: publicGetDocumentFields,
            publicGetDocument: publicGetDocument,
            publicSaveDocumentFields: publicSaveDocumentFields
        };
    });



define('core/dataservice/dataservice.envelope.document',
    ['lib/amplify'],
    function(amplify) {
        var init = function() {
            amplify.request.define('addDocument', 'ajax', {
                url: '/signature2/service/AddEnvelopeDocument',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
            amplify.request.define('getDocuments', 'ajax', {
                url: '/signature2/service/GetEnvelopeDocumentsInfo',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
            amplify.request.define('removeDocument', 'ajax', {
                url: '/signature2/service/DeleteEnvelopeDocument',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
            amplify.request.define('publicGetDocuments', 'ajax', {
                url: '/signature2/service/PublicGetEnvelopeDocumentsInfo',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
            amplify.request.define('renameDocument', 'ajax', {
                url: '/signature2/service/RenameEnvelopeDocument',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
        },
        addDocument = function(callbacks, data) {
            return amplify.request({
                resourceId: 'addDocument',
                success: callbacks.success,
                error: callbacks.error,
                data: data
            });
        },
        getDocuments = function(callbacks, data) {
            return amplify.request({
                resourceId: 'getDocuments',
                success: callbacks.success,
                error: callbacks.error,
                data: data
            });
        },
        removeDocument = function(callbacks, data) {
            return amplify.request({
                resourceId: 'removeDocument',
                success: callbacks.success,
                error: callbacks.error,
                data: data
            });
        },
        publicGetDocuments = function(callbacks, data) {
            return amplify.request({
                resourceId: 'publicGetDocuments',
                success: callbacks.success,
                error: callbacks.error,
                data: data
            });
        },
        renameDocument = function (callbacks, data) {
            return amplify.request({
                resourceId: 'renameDocument',
                success: callbacks.success,
                error: callbacks.error,
                data: data
            });
        };

        init();

        return {
            addDocument: addDocument,
            getDocuments: getDocuments,
            removeDocument: removeDocument,
            publicGetDocuments: publicGetDocuments,
            renameDocument: renameDocument
        };
    });



define('core/dataservice/dataservice.envelope.field',
    ['lib/amplify', 'core/config'],
    function (amplify, config) {
        var init = function() {

            amplify.request.define('getEnvelopeFields', 'ajax', {
                url: '/signature2/service/GetEnvelopeFields',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
            amplify.request.define('addEnvelopeField', 'ajax', {
                url: '/signature2/service/AddField',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
            amplify.request.define('deleteEnvelopeFieldLocation', 'ajax', {
                url: '/signature2/service/DeleteFieldLocation',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
            amplify.request.define('updateEnvelopeFieldLocation', 'ajax', {
                url: '/signature2/service/ModifyFieldLocation',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });

            amplify.request.define('publicUpdateEnvelopeFieldLocation', 'ajax', {
                url: '/signature2/service/PublicModifyFieldLocation',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });

            amplify.request.define('updateEnvelopeField', 'ajax', {
                url: '/signature2/service/UpdateField',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
            amplify.request.define('deleteEnvelopeFields', 'ajax', {
                url: '/signature2/service/DeleteFields',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
            amplify.request.define('fillEnvelopeField', 'ajax', {
                url: '/signature2/service/FillField',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'POST',
                beforeSend: function (xhrSettings, ajaxSettings) {
                    if (config.checkFileApiSupport()) {
                        ajaxSettings.xhr = function() {
                            var xhr = new window.XMLHttpRequest();
                            //Upload progress
                            xhr.upload.addEventListener("progress", function(evt) {
                                if (evt.lengthComputable) {
                                    var percentComplete = Math.round(evt.loaded / evt.total * 100);
                                    amplify.publish("envelopeFillFieldProgress", { percent: percentComplete, data: ajaxSettings.data });
                                }
                            }, false);
                            //Download progress
                            /*
                            xhr.addEventListener("progress", function(evt) {
                                if (evt.lengthComputable) {
                                    var percentComplete = evt.loaded / evt.total;
                                }
                            }, false);
                            */
                            return xhr;
                        }
                    }
                    return true;
                }
                //cache: true
            });
            amplify.request.define('publicGetEnvelopeFields', 'ajax', {
                url: '/signature2/service/PublicGetEnvelopeFields',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
            amplify.request.define('publicFillEnvelopeField', 'ajax', {
                url: '/signature2/service/PublicFillField',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'POST',
                beforeSend: function (xhrSettings, ajaxSettings) {
                    if (config.checkFileApiSupport()) {
                        ajaxSettings.xhr = function() {
                            var xhr = new window.XMLHttpRequest();
                            //Upload progress
                            xhr.upload.addEventListener("progress", function(evt) {
                                if (evt.lengthComputable) {
                                    var percentComplete = Math.round(evt.loaded / evt.total * 100);
                                    amplify.publish("envelopeFillFieldProgress", { percent: percentComplete, data: ajaxSettings.data });
                                }
                            }, false);
                            //Download progress
                            /*
                            xhr.addEventListener("progress", function(evt) {
                                if (evt.lengthComputable) {
                                    var percentComplete = evt.loaded / evt.total;
                                }
                            }, false);
                            */
                            return xhr;
                        }
                    }
                    return true;
                }
                //cache: true,
            });
            amplify.request.define('assignEnvelopeField', 'ajax', {
                url: '/signature2/service/AssignField',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
            amplify.request.define('updateEnvelopeFieldLocationOrder', 'ajax', {
                url: '/signature2/service/ModifyFieldLocationOrder',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });

        },
            getFields = function(callbacks, data) {
                return amplify.request({
                    resourceId: 'getEnvelopeFields',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: JSON.stringify(data)
                });
            },
        addField = function(callbacks, data) {
            return amplify.request({
                resourceId: 'addEnvelopeField',
                success: callbacks.success,
                error: callbacks.error,
                data: JSON.stringify(data)
            });
        },
        deleteFieldLocation = function (callbacks, data) {
            return amplify.request({
                resourceId: 'deleteEnvelopeFieldLocation',
                success: callbacks.success,
                error: callbacks.error,
                data: JSON.stringify(data)
            });
        },
        updateFieldLocation = function (callbacks, data) {
            return amplify.request({
                resourceId: 'updateEnvelopeFieldLocation',
                success: callbacks.success,
                error: callbacks.error,
                data: JSON.stringify(data)
            });
        },

        publicUpdateFieldLocation = function (callbacks, data) {
            return amplify.request({
                resourceId: 'publicUpdateEnvelopeFieldLocation',
                success: callbacks.success,
                error: callbacks.error,
                data: JSON.stringify(data)
            });
        },

        updateField = function (callbacks, data) {
            return amplify.request({
                resourceId: 'updateEnvelopeField',
                success: callbacks.success,
                error: callbacks.error,
                data: JSON.stringify(data)
            });
        },
        deleteFields = function (callbacks, data) {
            return amplify.request({
                resourceId: 'deleteEnvelopeFields',
                success: callbacks.success,
                error: callbacks.error,
                data: JSON.stringify(data)
            });
        },
        fillField = function (callbacks, data) {
            return amplify.request({
                resourceId: 'fillEnvelopeField',
                success: callbacks.success,
                error: callbacks.error,
                data: JSON.stringify(data)
            });
        },
        publicGetFields = function(callbacks, data) {
            return amplify.request({
                resourceId: 'publicGetEnvelopeFields',
                success: callbacks.success,
                error: callbacks.error,
                data: JSON.stringify(data)
            });
        },
        publicFillField = function (callbacks, data) {
            return amplify.request({
                resourceId: 'publicFillEnvelopeField',
                success: callbacks.success,
                error: callbacks.error,
                data: JSON.stringify(data)
            });
        },
        assignField = function(callbacks, data) {
            return amplify.request({
                resourceId: 'assignEnvelopeField',
                success: callbacks.success,
                error: callbacks.error,
                data: JSON.stringify(data)
            });
        },
        updateFieldLocationOrder = function (callbacks, data) {
            return amplify.request({
                resourceId: 'updateEnvelopeFieldLocationOrder',
                success: callbacks.success,
                error: callbacks.error,
                data: JSON.stringify(data)
            });
        }
        ;
        
        init();
        return {
            getFields: getFields,
            addField: addField,
            deleteFieldLocation: deleteFieldLocation,
            updateFieldLocation: updateFieldLocation,
            publicUpdateFieldLocation: publicUpdateFieldLocation,
            updateField: updateField,
            deleteFields: deleteFields,
            fillField: fillField,
            publicGetFields: publicGetFields,
            publicFillField: publicFillField,
            assignField: assignField,
            updateFieldLocationOrder: updateFieldLocationOrder
        };
    });

define('core/dataservice/dataservice.envelope',
    ['lib/amplify'],
    function (amplify) {
        var init = function() {

            amplify.request.define('envelopes', 'ajax', {
                url: '/signature2/service/GetEnvelopesInfo',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
            amplify.request.define('envelopesResources', 'ajax', {
                url: '/signature2/service/GetEnvelopeResources',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
            amplify.request.define('envelopeRecipientSigned', 'ajax', {
                url: '/signature2/service/EnvelopeRecipientSigned',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
            amplify.request.define('getEnvelopeCurrentRecipientId', 'ajax', {
                url: '/signature2/service/GetCurrentEnvelopeRecipientId',
                dataType: 'html',
                type: 'POST'
                //cache: true
            });
            amplify.request.define('restartEnvelope', 'ajax', {
                url: '/signature2/service/RestartExpiredEnvelope',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
            amplify.request.define('archiveEnvelopes', 'ajax', {
                url: '/signature2/service/ArchiveEnvelopes',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
            amplify.request.define('createEnvelope', 'ajax', {
                url: '/signature2/service/CreateEnvelope',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
            amplify.request.define('getEnvelope', 'ajax', {
                url: '/signature2/service/GetEnvelopeDetails',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
            amplify.request.define('updateEnvelope', 'ajax', {
                url: '/signature2/service/ModifyEnvelope',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
            amplify.request.define('renameEnvelope', 'ajax', {
                url: '/signature2/service/RenameEnvelope',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
            amplify.request.define('sendEnvelope', 'ajax', {
                url: '/signature2/service/SendEnvelope',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
            amplify.request.define('deleteEnvelopes', 'ajax', {
                url: '/signature2/service/DeleteEnvelopes',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'POST',
                //cache: true
            });
            amplify.request.define('getEnvelopeAuditLog', 'ajax', {
                url: '/signature2/service/GetEnvelopeAuditLogs',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
            amplify.request.define('signEnvelope', 'ajax', {
                url: '/signature2/service/SignEnvelope',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
            amplify.request.define('publicGetEnvelope', 'ajax', {
                url: '/signature2/service/PublicGetEnvelopeDetails',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
            amplify.request.define('publicSignEnvelope', 'ajax', {
                url: '/signature2/service/PublicSignEnvelope',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
            amplify.request.define('publicGetEnvelopeStatus', 'ajax', {
                url: '/signature2/service/PublicGetEnvelopeStatus',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
            amplify.request.define('cancelEnvelope', 'ajax', {
                url: '/signature2/service/CancelEnvelope',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
            amplify.request.define('retrySignEnvelope', 'ajax', {
                url: '/signature2/service/RetrySignEnvelope',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
            amplify.request.define('updateEnvelopeFromTemplate', 'ajax', {
                url: '/signature2/service/UpdateEnvelopeFromTemplate',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
            amplify.request.define('resendEmailNotification', 'ajax', {
                url: '/signature2/service/ResendEnvelopeEmailNotification',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
        },
            getEnvelopes = function(callbacks, data) {
                return amplify.request({
                    resourceId: 'envelopes',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: data
                });
            },
            getEnvelopesResources = function(callbacks, data) {
                return amplify.request({
                    resourceId: 'envelopesResources',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: JSON.stringify(data)
                });
            },
            envelopeRecipientSigned = function(callbacks, data) {
                return amplify.request({
                    resourceId: 'envelopeRecipientSigned',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: data
                });
            },
            getEnvelopeCurrentRecipientId = function(callbacks, data) {
                return amplify.request({
                    resourceId: 'getEnvelopeCurrentRecipientId',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: data
                });
            },
            restartEnvelope = function(callbacks, data) {
                return amplify.request({
                    resourceId: 'restartEnvelope',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: data
                });
            },
            archiveEnvelopes = function(callbacks, data) {
                return amplify.request({
                    resourceId: 'archiveEnvelopes',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: JSON.stringify(data)
                });
            },
            createEnvelope = function(callbacks, data) {
                return amplify.request({
                    resourceId: 'createEnvelope',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: data
                });
            },
            getEnvelope = function(callbacks, data) {
                return amplify.request({
                    resourceId: 'getEnvelope',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: data
                });
            },
            updateEnvelope = function(callbacks, data) {
                return amplify.request({
                    resourceId: 'updateEnvelope',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: data
                });
            },
            renameEnvelope = function(callbacks, data) {
                return amplify.request({
                    resourceId: 'renameEnvelope',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: data
                });
            },
            sendEnvelope = function(callbacks, data) {
                return amplify.request({
                    resourceId: 'sendEnvelope',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: data
                });
            },
            deleteEnvelopes = function(callbacks, data) {
                return amplify.request({
                    resourceId: 'deleteEnvelopes',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: JSON.stringify(data)
                });
            },
            getEnvelopeAuditLog = function(callbacks, data) {
                return amplify.request({
                    resourceId: 'getEnvelopeAuditLog',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: data
                });
            },
            signEnvelope = function(callbacks, data) {
                return amplify.request({
                    resourceId: 'signEnvelope',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: data
                });
            },
            publicGetEnvelope = function(callbacks, data) {
                return amplify.request({
                    resourceId: 'publicGetEnvelope',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: data
                });
            },
            publicSignEnvelope = function(callbacks, data) {
                return amplify.request({
                    resourceId: 'publicSignEnvelope',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: data
                });
            },
            publicEnvelopeStatus = function (callbacks, data) {
                return amplify.request({
                    resourceId: 'publicGetEnvelopeStatus',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: data
                });
            },
            cancelEnvelope = function(callbacks, data) {
                return amplify.request({
                    resourceId: 'cancelEnvelope',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: data
                });
            },
            retrySignEnvelope = function (callbacks, data) {
                return amplify.request({
                    resourceId: 'retrySignEnvelope',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: data
                });
            },
            updateEnvelopeFromTemplate = function (callbacks, data) {
                return amplify.request({
                    resourceId: 'updateEnvelopeFromTemplate',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: data
                });
            },
            resendEmailNotification = function (callbacks, data) {
                return amplify.request({
                    resourceId: 'resendEmailNotification',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: data
                });
            };


        init();
  
    return {
        getEnvelopes: getEnvelopes,
        getEnvelopesResources: getEnvelopesResources,
        envelopeRecipientSigned: envelopeRecipientSigned,
        getEnvelopeCurrentRecipientId: getEnvelopeCurrentRecipientId,
        restartEnvelope: restartEnvelope,
        archiveEnvelopes: archiveEnvelopes,
        createEnvelope: createEnvelope,
        getEnvelope: getEnvelope,
        updateEnvelope: updateEnvelope,
        renameEnvelope: renameEnvelope,
        sendEnvelope: sendEnvelope,
        deleteEnvelopes: deleteEnvelopes,
        getEnvelopeAuditLog: getEnvelopeAuditLog,
        signEnvelope: signEnvelope,
        publicGetEnvelope: publicGetEnvelope,
        publicSignEnvelope: publicSignEnvelope,
        publicEnvelopeStatus: publicEnvelopeStatus,
        cancelEnvelope: cancelEnvelope,
        retrySignEnvelope: retrySignEnvelope,
        updateEnvelopeFromTemplate: updateEnvelopeFromTemplate,
        resendEmailNotification: resendEmailNotification
    };
});



define('core/dataservice/dataservice.envelope.recipient',
    ['lib/amplify'],
    function (amplify) {
        var init = function () {
            amplify.request.define('addRecipient', 'ajax', {
                url: '/signature2/service/AddEnvelopeRecipient',
                dataType: 'json',
                type: 'POST',
                //cache: true
            });
            amplify.request.define('removeRecipient', 'ajax', {
                url: '/signature2/service/DeleteEnvelopeRecipient',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
            amplify.request.define('updateRecipient', 'ajax', {
                url: '/signature2/service/ModifyEnvelopeRecipient',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
        },
        addRecipient = function (callbacks, data) {
            return amplify.request({
                resourceId: 'addRecipient',
                success: callbacks.success,
                error: callbacks.error,
                data: data
            });
        };
        removeRecipient = function (callbacks, data) {
            return amplify.request({
                resourceId: 'removeRecipient',
                success: callbacks.success,
                error: callbacks.error,
                data: data
            });
        };
        updateRecipient = function (callbacks, data) {
            return amplify.request({
                resourceId: 'updateRecipient',
                success: callbacks.success,
                error: callbacks.error,
                data: data
            });
        };
        init();

        return {
            addRecipient: addRecipient,
            removeRecipient: removeRecipient,
            updateRecipient: updateRecipient
        };
    });



define('core/dataservice/dataservice.field',
    ['lib/amplify', 'core/config'],
    function(amplify, config) {
        var init = function() {

                amplify.request.define('getFields', 'ajax', {
                    url: config.downloadableHostUrl + config.downloadableSignaturePrefix + '/signature2/service/GetSignatureFields',
                    dataType: 'json',
                    type: 'POST'
                    //cache: true
                });

                amplify.request.define('publicGetFields', 'ajax', {
                    url: config.downloadableHostUrl + config.downloadableSignaturePrefix + '/signature2/service/PublicGetSignatureFields',
                    dataType: 'json',
                    type: 'POST'
                    //cache: true
                });
            },


            getFields = function(callbacks, data) {
                return amplify.request({
                    resourceId: 'getFields',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: data
                });
            },


            publicGetFields = function(callbacks, data) {
                return amplify.request({
                    resourceId: 'publicGetFields',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: data
                });
            };
        init();
        return {
            getFields: getFields,
            publicGetFields: publicGetFields
        };
    });

define('core/dataservice/dataservice.form.document',
    ['lib/amplify'],
    function(amplify) {
        var init = function() {
            amplify.request.define('addFormDocument', 'ajax', {
                url: '/signature2/service/AddFormDocument',
                dataType: 'json',
                type: 'POST'
            });
            amplify.request.define('getFormDocuments', 'ajax', {
                url: '/signature2/service/GetFormDocumentsInfo',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
            amplify.request.define('removeFormDocument', 'ajax', {
                url: '/signature2/service/DeleteFormDocument',
                dataType: 'json',
                type: 'POST'
            });
            amplify.request.define('publicGetFormDocuments', 'ajax', {
                url: '/signature2/service/PublicGetFormDocumentsInfo',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
            amplify.request.define('renameFormDocument', 'ajax', {
                url: '/signature2/service/RenameFormDocument',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
            amplify.request.define('modifyFormDocument', 'ajax', {
                url: '/signature2/service/ModifyFormDocument',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
        },
        addDocument = function(callbacks, data) {
            return amplify.request({
                resourceId: 'addFormDocument',
                success: callbacks.success,
                error: callbacks.error,
                data: data
            });
        },
        getDocuments = function (callbacks, data) {
            return amplify.request({
                resourceId: 'getFormDocuments',
                success: callbacks.success,
                error: callbacks.error,
                data: data
            });
        },
        removeDocument = function (callbacks, data) {
            return amplify.request({
                resourceId: 'removeFormDocument',
                success: callbacks.success,
                error: callbacks.error,
                data: data
            });
        },
        publicGetDocuments = function (callbacks, data) {
            return amplify.request({
                resourceId: 'publicGetFormDocuments',
                success: callbacks.success,
                error: callbacks.error,
                data: data
            });
        },
        renameDocument = function(callbacks, data) {
            return amplify.request({
                resourceId: 'renameFormDocument',
                success: callbacks.success,
                error: callbacks.error,
                data: data
            });
        },
        modifyDocument = function (callbacks, data) {
            return amplify.request({
                resourceId: 'modifyFormDocument',
                success: callbacks.success,
                error: callbacks.error,
                data: data
            });
        };
        init();

        return {
            addDocument: addDocument,
            getDocuments: getDocuments,
            removeDocument: removeDocument,
            publicGetDocuments: publicGetDocuments,
            renameDocument: renameDocument,
            modifyDocument:modifyDocument
        };
    });



define('core/dataservice/dataservice.form.field',
    ['lib/amplify','core/config'],
    function (amplify, config) {
        var init = function() {

            amplify.request.define('getFormFields', 'ajax', {
                url: '/signature2/service/GetFormFields',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
            amplify.request.define('addFormField', 'ajax', {
                url: '/signature2/service/AddFormField',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
            amplify.request.define('deleteFormFieldLocation', 'ajax', {
                url: '/signature2/service/DeleteFormFieldLocation',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
            amplify.request.define('updateFormFieldLocation', 'ajax', {
                url: '/signature2/service/ModifyFormFieldLocation',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
            amplify.request.define('updateFormField', 'ajax', {
                url: '/signature2/service/UpdateFormField',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
            amplify.request.define('deleteFormFields', 'ajax', {
                url: '/signature2/service/DeleteFormFields',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
            amplify.request.define('publicGetFormFields', 'ajax', {
                url: '/signature2/service/PublicGetFormFields',
                dataType: 'json',
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
               
            });
            amplify.request.define('publicFillFormField', 'ajax', {
                url: '/signature2/service/PublicFillFormField',
                dataType: 'json',
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                beforeSend: function (xhrSettings, ajaxSettings) {
                    if (config.checkFileApiSupport()) {
                        ajaxSettings.xhr = function() {
                            var xhr = new window.XMLHttpRequest();
                            //Upload progress
                            xhr.upload.addEventListener("progress", function(evt) {
                                if (evt.lengthComputable) {
                                    var percentComplete = Math.round(evt.loaded / evt.total * 100);
                                    amplify.publish("formFillFieldProgress", { percent: percentComplete, data: ajaxSettings.data });
                                }
                            }, false);
                            //Download progress
                            /*
                        xhr.addEventListener("progress", function(evt) {
                            if (evt.lengthComputable) {
                                var percentComplete = evt.loaded / evt.total;
                            }
                        }, false);
                        */
                            return xhr;
                        }
                    }
                    return true;
                }
            });
        },
        getFields = function(callbacks, data) {
            return amplify.request({
                resourceId: 'getFormFields',
                success: callbacks.success,
                error: callbacks.error,
                data: data
            });
        },
        addField = function(callbacks, data) {
            return amplify.request({
                resourceId: 'addFormField',
                success: callbacks.success,
                error: callbacks.error,
                data: JSON.stringify(data)
            });
        },
        deleteFieldLocation = function (callbacks, data) {
            return amplify.request({
                resourceId: 'deleteFormFieldLocation',
                success: callbacks.success,
                error: callbacks.error,
                data: data
            });
        },
        updateFieldLocation = function (callbacks, data) {
            return amplify.request({
                resourceId: 'updateFormFieldLocation',
                success: callbacks.success,
                error: callbacks.error,
                data: JSON.stringify(data)
            });
        },
        updateField = function (callbacks, data) {
            return amplify.request({
                resourceId: 'updateFormField',
                success: callbacks.success,
                error: callbacks.error,
                data: JSON.stringify(data)
            });
        },
        deleteFields = function (callbacks, data) {
            return amplify.request({
                resourceId: 'deleteFormFields',
                success: callbacks.success,
                error: callbacks.error,
                data: JSON.stringify(data)
            });
        },
        publicGetFields = function (callbacks, data) {
            return amplify.request({
                resourceId: 'publicGetFormFields',
                success: callbacks.success,
                error: callbacks.error,
                data: JSON.stringify(data)
            });
        },
        publicFillField = function (callbacks, data) {
            return amplify.request({
                resourceId: 'publicFillFormField',
                success: callbacks.success,
                error: callbacks.error,
                data: JSON.stringify(data)
            });
        };
        init();
        return {
            getFields: getFields,
            addField: addField,
            deleteFieldLocation: deleteFieldLocation,
            updateFieldLocation: updateFieldLocation,
            updateField: updateField,
            deleteFields: deleteFields,
            publicGetFields: publicGetFields,
            publicFillField: publicFillField
        };
    });

define('core/dataservice/dataservice.form',
    ['lib/amplify'],
    function (amplify) {
        var init = function() {

            amplify.request.define('forms', 'ajax', {
                url: '/signature2/service/GetFormsInfo',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
            amplify.request.define('form', 'ajax', {
                url: '/signature2/service/GetFormInfo',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
            amplify.request.define('formsResources', 'ajax', {
                url: '/signature2/service/GetFormResources',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
            amplify.request.define('createForm', 'ajax', {
                url: '/signature2/service/CreateForm',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
            amplify.request.define('completeForm', 'ajax', {
                url: '/signature2/service/CompleteForm',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
            amplify.request.define('deleteForms', 'ajax', {
                url: '/signature2/service/DeleteForms',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'POST',
                //cache: true
            });
            amplify.request.define('archiveForm', 'ajax', {
                url: '/signature2/service/ArchiveForm',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
            amplify.request.define('updateFormFromTemplate', 'ajax', {
                url: '/signature2/service/UpdateFormFromTemplate',
                dataType: 'json',
                type: 'POST'
            });
            amplify.request.define('modifyForm', 'ajax', {
                url: '/signature2/service/modifyForm',
                dataType: 'json',
                type: 'POST',
                contentType: 'application/json',
                dataMap: function (data) {
                    if (typeof data === 'object') {
                        return JSON.stringify(data);
                    }
                    return data;
                }
            });
            amplify.request.define('publishForm', 'ajax', {
                url: '/signature2/service/publishForm',
                dataType: 'json',
                type: 'POST'
            });
            amplify.request.define('archiveForms', 'ajax', {
                url: '/signature2/service/ArchiveForms',
                dataType: 'json',
                type: 'POST',
                contentType: 'application/json',
                dataMap: function (data) {
                    if (typeof data === 'object') {
                        return JSON.stringify(data);
                    }
                    return data;
                }
            });
            amplify.request.define('publicSignForm', 'ajax', {
                url: '/signature2/service/PublicSignForm',
                dataType: 'json',
                type: 'POST'
            });
            
            amplify.request.define('publicGetFormParticipant', 'ajax', {
                url: '/signature2/service/PublicGetFormParticipant',
                dataType: 'json',
                type: 'POST'
            });
            amplify.request.define('getFormAuditLog', 'ajax', {
                url: '/signature2/service/GetFormAuditLogs',
                dataType: 'json',
                type: 'POST'
            });

            amplify.request.define('publicModifyFormParticipant', 'ajax', {
                url: '/signature2/service/PublicModifyFormParticipant',
                dataType: 'json',
                type: 'POST'
            });
            amplify.request.define('publicValidateFormParticipant', 'ajax', {
                url: '/signature2/service/PublicValidateFormParticipant',
                dataType: 'json',
                type: 'POST'
            });
            amplify.request.define('publicFormParticipantResentValidationCode', 'ajax', {
                url: '/signature2/service/PublicFormParticipantResentValidationCode',
                dataType: 'json',
                type: 'POST'
            });
            amplify.request.define('getFormParticipants', 'ajax', {
                url: '/signature2/service/GetFormParticipants',
                dataType: 'json',
                type: 'POST'
            });
        },
        getForms = function(callbacks, data) {
            return amplify.request({
                resourceId: 'forms',
                success: callbacks.success,
                error: callbacks.error,
                data: data
            });
        },
        getForm = function (callbacks, data) {
            return amplify.request({
                resourceId: 'form',
                success: callbacks.success,
                error: callbacks.error,
                data: data
            });
        },
        getFormsResources = function(callbacks, data) {
            return amplify.request({
                resourceId: 'formsResources',
                success: callbacks.success,
                error: callbacks.error,
                data: data
            });
        },
        createForm = function(callbacks, data) {
            return amplify.request({
                resourceId: 'createForm',
                success: callbacks.success,
                error: callbacks.error,
                data: data
            });
        },
        completeForm = function(callbacks, data) {
            return amplify.request({
                resourceId: 'completeForm',
                success: callbacks.success,
                error: callbacks.error,
                data: data
            });
        },
        deleteForms = function(callbacks, data) {
            return amplify.request({
                resourceId: 'deleteForms',
                success: callbacks.success,
                error: callbacks.error,
                data: JSON.stringify(data)
            });
        },
        archiveForm = function(callbacks, data) {
            return amplify.request({
                resourceId: 'archiveForm',
                success: callbacks.success,
                error: callbacks.error,
                data: data
            });
        },
        updateFormFromTemplate = function (callbacks, data) {
                return amplify.request({
                    resourceId: 'updateFormFromTemplate',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: data
                });
        },
        modifyForm = function(callbacks, data) {
            return amplify.request({
                resourceId: 'modifyForm',
                success: callbacks.success,
                error: callbacks.error,
                data: data
            });
        },
        publishForm = function(callbacks, data) {
            return amplify.request({
                resourceId: 'publishForm',
                success: callbacks.success,
                error: callbacks.error,
                data: data
            });
        },
        archiveForms = function(callbacks, data) {
            return amplify.request({
                resourceId: 'archiveForms',
                success: callbacks.success,
                error: callbacks.error,
                data: data
            });
        },
        publicSignForm = function (callbacks, data) {
            return amplify.request({
                resourceId: 'publicSignForm',
                success: callbacks.success,
                error: callbacks.error,
                data: data
            });
        },
        publicGetFormParticipant = function (callbacks, data) {
            return amplify.request({
                resourceId: 'publicGetFormParticipant',
                success: callbacks.success,
                error: callbacks.error,
                data: data
            });
        },
        getFormAuditLog = function(callbacks, data) {
            return amplify.request({
                resourceId: 'getFormAuditLog',
                success: callbacks.success,
                error: callbacks.error,
                data: data
            });
        },
        publicModifyFormParticipant = function (callbacks, data) {
            return amplify.request({
                resourceId: 'publicModifyFormParticipant',
                success: callbacks.success,
                error: callbacks.error,
                data: data
            });
        },
        publicValidateFormParticipant = function(callbacks, data) {
            return amplify.request({
                resourceId: 'publicValidateFormParticipant',
                success: callbacks.success,
                error: callbacks.error,
                data: data
            });
        },
        publicFormParticipantResentValidationCode = function(callbacks, data) {
                return amplify.request({
                    resourceId: 'publicFormParticipantResentValidationCode',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: data
                });
        } ,
        getFormParticipants = function (callbacks, data) {
            return amplify.request({
                resourceId: 'getFormParticipants',
                success: callbacks.success,
                error: callbacks.error,
                data: data
            });
        }
        ;

        init();
        return {
            getForms: getForms,
            getForm: getForm,
            getFormsResources: getFormsResources,
            createForm: createForm,
            completeForm: completeForm,
            deleteForms: deleteForms,
            archiveForm: archiveForm,
            updateFormFromTemplate: updateFormFromTemplate,
            modifyForm: modifyForm,
            publishForm: publishForm,
            archiveForms: archiveForms,
            publicSignForm: publicSignForm,
            publicGetFormParticipant: publicGetFormParticipant,
            getFormAuditLog: getFormAuditLog,
            publicModifyFormParticipant: publicModifyFormParticipant,
            publicValidateFormParticipant: publicValidateFormParticipant,
            publicFormParticipantResentValidationCode: publicFormParticipantResentValidationCode,
            getFormParticipants: getFormParticipants
        };
    });



define('core/dataservice/dataservice.form.participant',
    ['lib/amplify'],
    function (amplify) {
        var init = function () {
            amplify.request.define('getFormParticipants', 'ajax', {
                url: '/signature2/service/GetFormParticipants',
                dataType: 'json',
                type: 'POST'
            });
        },
        getFormParticipants = function (callbacks, data) {
            return amplify.request({
                resourceId: 'getFormParticipants',
                success: callbacks.success,
                error: callbacks.error,
                data: data
            });
        }
        ;

        init();
        return {
            getFormParticipants: getFormParticipants
        };
    });



define('core/dataservice/dataservice.predefinedlist',
    ['lib/amplify'],
    function(amplify) {
        var init = function() {

            amplify.request.define('getPredefinedLists', 'ajax', {
                url: '/signature2/service/GetPredefinedListsInfo',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
            amplify.request.define('addPredefinedList', 'ajax', {
                url: '/signature2/service/AddPredefinedList',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
            amplify.request.define('deletePredefinedList', 'ajax', {
                url: '/signature2/service/DeletePredefinedList',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
        },
            getPredefinedLists = function(callbacks, data) {
                return amplify.request({
                    resourceId: 'getPredefinedLists',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: data
                });
            },
            addList = function (callbacks, data) {
                return amplify.request({
                    resourceId: 'addPredefinedList',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: data
                });
            },
            deleteList = function (callbacks, data) {
                return amplify.request({
                    resourceId: 'deletePredefinedList',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: data
                });
            };
            ;
        init();
        return {
            getPredefinedLists: getPredefinedLists,
            addList: addList,
            deleteList: deleteList
        };
    });

define('core/dataservice/dataservice.resources',
    ['lib/amplify', 'core/config'],
    function(amplify, config) {
        var init = function() {

            amplify.request.define('getSignatureBackgroundSvg', 'ajax', {
                url: config.downloadableSignaturePrefix+'/signature2/resource/GetSignatureBackgroundSvg',
                dataType: 'html',
                type: 'GET',
                cache: true
            });
            amplify.request.define('getStampBackgroundSvg', 'ajax', {
                url: config.downloadableSignaturePrefix + '/signature2/resource/GetStampBackgroundSvg',
                dataType: 'html',
                type: 'GET',
                cache: true
            });
        },
            getSignatureBackgroundSvg = function(callbacks, data) {
                return amplify.request({
                    resourceId: 'getSignatureBackgroundSvg',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: data
                });
            },
            getStampBackgroundSvg = function (callbacks, data) {
                return amplify.request({
                    resourceId: 'getStampBackgroundSvg',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: data
                });
            };
        init();
        return {
            getSignatureBackgroundSvg: getSignatureBackgroundSvg,
            getStampBackgroundSvg: getStampBackgroundSvg
        };
    });

define('core/dataservice/dataservice.signature',
    ['lib/amplify'],
    function (amplify) {
        var init = function () {
            amplify.request.define('getSignatures', 'ajax', {
                url: '/signature2/service/GetSignatures',
                dataType: 'json',
                type: 'POST',
                //cache: true
            });
            amplify.request.define('deleteSignatures', 'ajax', {
                url: '/signature2/service/DeleteSignature',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'POST',
                //cache: true
            });
            amplify.request.define('createSignature', 'ajax', {
                url: '/signature2/service/CreateSignature',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'POST',
                //cache: true
            });
            amplify.request.define('updateSignature', 'ajax', {
                url: '/signature2/service/ModifySignature',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'POST',
                //cache: true
            });
        },
        getSignatures = function (callbacks, data) {
            return amplify.request({
                resourceId: 'getSignatures',
                success: callbacks.success,
                error: callbacks.error,
                data: data
            });
        },
        deleteSignatures = function (callbacks, data) {
            return amplify.request({
                resourceId: 'deleteSignatures',
                success: callbacks.success,
                error: callbacks.error,
                data: JSON.stringify(data)
            });
        },
        createSignature = function (callbacks, data) {
            return amplify.request({
                resourceId: 'createSignature',
                success: callbacks.success,
                error: callbacks.error,
                data: JSON.stringify(data)
            });
        },
        updateSignature = function (callbacks, data) {
            return amplify.request({
                resourceId: 'updateSignature',
                success: callbacks.success,
                error: callbacks.error,
                data: JSON.stringify(data)
            });
        }

        ;
        init();

        return {
            getSignatures: getSignatures,
            deleteSignatures: deleteSignatures,
            createSignature: createSignature,
            updateSignature: updateSignature
        };
    });



define('core/dataservice/dataservice.template.document',
    ['lib/amplify'],
    function (amplify) {
        var init = function () {
            amplify.request.define('addTemplateDocument', 'ajax', {
                url: '/signature2/service/AddTemplateDocument',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
            amplify.request.define('getTemplateDocuments', 'ajax', {
                url: '/signature2/service/GetTemplateDocumentsInfo',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
            amplify.request.define('removeTemplateDocument', 'ajax', {
                url: '/signature2/service/DeleteTemplateDocument',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
            amplify.request.define('renameTemplateDocument', 'ajax', {
                url: '/signature2/service/RenameTemplateDocument',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
        },
        addDocument = function (callbacks, data) {
            return amplify.request({
                resourceId: 'addTemplateDocument',
                success: callbacks.success,
                error: callbacks.error,
                data: data
            });
        },
        getDocuments = function (callbacks, data) {
            return amplify.request({
                resourceId: 'getTemplateDocuments',
                success: callbacks.success,
                error: callbacks.error,
                data: data
            });
        },
        removeDocument = function (callbacks, data) {
            return amplify.request({
                resourceId: 'removeTemplateDocument',
                success: callbacks.success,
                error: callbacks.error,
                data: data
            });
        },
        renameDocument = function (callbacks, data) {
            return amplify.request({
                resourceId: 'renameTemplateDocument',
                success: callbacks.success,
                error: callbacks.error,
                data: data
            });
        };
        init();

        return {
            addDocument: addDocument,
            getDocuments: getDocuments,
            removeDocument: removeDocument,
            renameDocument: renameDocument
        };
    });



define('core/dataservice/dataservice.template.field',
    ['lib/amplify'],
    function (amplify) {
        var init = function () {

            amplify.request.define('getTemplateFields', 'ajax', {
                url: '/signature2/service/GetTemplateFields',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
            amplify.request.define('addTemplateField', 'ajax', {
                url: '/signature2/service/AddTemplateField',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
            amplify.request.define('deleteTemplateFieldLocation', 'ajax', {
                url: '/signature2/service/DeleteTemplateFieldLocation',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
            amplify.request.define('updateTemplateFieldLocation', 'ajax', {
                url: '/signature2/service/ModifyTemplateFieldLocation',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
            amplify.request.define('updateTemplateField', 'ajax', {
                url: '/signature2/service/UpdateTemplateField',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
            amplify.request.define('deleteTemplateFields', 'ajax', {
                url: '/signature2/service/DeleteTemplateFields',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
            
            amplify.request.define('assignTemplateField', 'ajax', {
                url: '/signature2/service/AssignTemplateField',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
        },
        getFields = function (callbacks, data) {
            return amplify.request({
                resourceId: 'getTemplateFields',
                success: callbacks.success,
                error: callbacks.error,
                data: data
            });
        },
        addField = function (callbacks, data) {
            return amplify.request({
                resourceId: 'addTemplateField',
                success: callbacks.success,
                error: callbacks.error,
                data: JSON.stringify(data)
            });
        },
        deleteFieldLocation = function (callbacks, data) {
            return amplify.request({
                resourceId: 'deleteTemplateFieldLocation',
                success: callbacks.success,
                error: callbacks.error,
                data: data
            });
        },
        updateFieldLocation = function (callbacks, data) {
            return amplify.request({
                resourceId: 'updateTemplateFieldLocation',
                success: callbacks.success,
                error: callbacks.error,
                data: JSON.stringify(data)
            });
        },
        updateField = function (callbacks, data) {
            return amplify.request({
                resourceId: 'updateTemplateField',
                success: callbacks.success,
                error: callbacks.error,
                data: data
            });
        },
        deleteFields = function (callbacks, data) {
            return amplify.request({
                resourceId: 'deleteTemplateFields',
                success: callbacks.success,
                error: callbacks.error,
                data: JSON.stringify(data)
            });
        },
        assignField = function (callbacks, data) {
            return amplify.request({
                resourceId: 'assignTemplateField',
                success: callbacks.success,
                error: callbacks.error,
                data: data
            });
        };

        init();
        return {
            getFields: getFields,
            addField: addField,
            deleteFieldLocation: deleteFieldLocation,
            updateFieldLocation: updateFieldLocation,
            updateField: updateField,
            deleteFields: deleteFields,
            assignField: assignField
        };
    });

define('core/dataservice/dataservice.template',
    ['lib/amplify'],
    function (amplify) {
        var init = function () {

            amplify.request.define('getTemplates', 'ajax', {
                url: '/signature2/service/GetTemplatesInfo',
                dataType: 'json',
                type: 'POST',
                //cache: true
            });
            amplify.request.define('templatesResources', 'ajax', {
                url: '/signature2/service/GetTemplateResources',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
            amplify.request.define('deleteTemplates', 'ajax', {
                url: '/signature2/service/DeleteTemplates',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'POST',
                //cache: true
            });
            amplify.request.define('createTemplate', 'ajax', {
                url: '/signature2/service/CreateTemplate',
                dataType: 'json',
                type: 'POST',
                //cache: true
            });
            amplify.request.define('getTemplate', 'ajax', {
                url: '/signature2/service/GetTemplateDetails',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
            amplify.request.define('updateTemplate', 'ajax', {
                url: '/signature2/service/ModifyTemplate',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
            amplify.request.define('renameTemplate', 'ajax', {
                url: '/signature2/service/RenameTemplate',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
        },
        getTemplates = function (callbacks, data) {
            return amplify.request({
                resourceId: 'getTemplates',
                success: callbacks.success,
                error: callbacks.error,
                data: data
            });
        },
        getTemplatesResources = function (callbacks, data) {
            return amplify.request({
                resourceId: 'templatesResources',
                success: callbacks.success,
                error: callbacks.error,
                data: data
            });
        },
        deleteTemplates = function (callbacks, data) {
            return amplify.request({
                resourceId: 'deleteTemplates',
                success: callbacks.success,
                error: callbacks.error,
                data: JSON.stringify(data)
            });
        },
        createTemplate = function (callbacks, data) {
            return amplify.request({
                resourceId: 'createTemplate',
                success: callbacks.success,
                error: callbacks.error,
                data: data
            });
        },
        getTemplate = function (callbacks, data) {
            return amplify.request({
                resourceId: 'getTemplate',
                success: callbacks.success,
                error: callbacks.error,
                data: data
            });
        },
        updateTemplate = function (callbacks, data) {
            return amplify.request({
                resourceId: 'updateTemplate',
                success: callbacks.success,
                error: callbacks.error,
                data: data
            });
        },
        renameTemplate = function (callbacks, data) {
            return amplify.request({
                resourceId: 'renameTemplate',
                success: callbacks.success,
                error: callbacks.error,
                data: data
            });
        }
        ;

        init();

        return {
            getTemplates: getTemplates,
            getTemplatesResources: getTemplatesResources,
            deleteTemplates: deleteTemplates,
            createTemplate: createTemplate,
            getTemplate: getTemplate,
            updateTemplate: updateTemplate,
            renameTemplate: renameTemplate
        };
    });



define('core/dataservice/dataservice.template.recipient',
    ['lib/amplify'],
    function (amplify) {
        var init = function () {
            amplify.request.define('addTemplateRecipient', 'ajax', {
                url: '/signature2/service/AddTemplateRecipient',
                dataType: 'json',
                type: 'POST',
                //cache: true
            });
            amplify.request.define('removeTemplateRecipient', 'ajax', {
                url: '/signature2/service/DeleteTemplateRecipient',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
            amplify.request.define('updateTemplateRecipient', 'ajax', {
                url: '/signature2/service/UpdateTemplateRecipient',
                dataType: 'json',
                type: 'POST'
                //cache: true
            });
        },
        addRecipient = function (callbacks, data) {
            return amplify.request({
                resourceId: 'addTemplateRecipient',
                success: callbacks.success,
                error: callbacks.error,
                data: data
            });
        };
        removeRecipient = function (callbacks, data) {
            return amplify.request({
                resourceId: 'removeTemplateRecipient',
                success: callbacks.success,
                error: callbacks.error,
                data: data
            });
        };
        updateRecipient = function (callbacks, data) {
            return amplify.request({
                resourceId: 'updateTemplateRecipient',
                success: callbacks.success,
                error: callbacks.error,
                data: data
            });
        };
        init();

        return {
            addRecipient: addRecipient,
            removeRecipient: removeRecipient,
            updateRecipient: updateRecipient
        };
    });



define('core/dataservice',
    [
        'core/dataservice/dataservice.envelope',
        'core/dataservice/dataservice.envelope.document',
        'core/dataservice/dataservice.envelope.recipient',
        'core/dataservice/dataservice.contact',
        'core/dataservice/dataservice.template',
        'core/dataservice/dataservice.template.document',
        'core/dataservice/dataservice.signature',
        'core/dataservice/dataservice.form',
        'core/dataservice/dataservice.field',
        'core/dataservice/dataservice.predefinedlist',
        'core/dataservice/dataservice.form.document',
        'core/dataservice/dataservice.form.field'
    ],
    function (envelope,
        envelopeDocument,
        envelopeRecipient,
        contact,
        template,
        signature,
        form,
        field,
        predefinedList,
        formDocument,
        formField
    ) {
        return {
            envelope: envelope,
            envelopeDocument: envelopeDocument,
            envelopeRecipient: envelopeRecipient,
            contact: contact,
            template: template,
            templateDocument: templateDocument,
            signature: signature,
            form: form,
            field: field,
            predefinedList: predefinedList,
            formDocument: formDocument,
            formField: formField
        };
    });
define('core/eventManager',
    ['jquery',
        'lib/underscore',
        'lib/amplify'],
    function ($, _, amplify) {
        function getInstance(callbacks) {
            var onFormFieldFilled = callbacks.formFieldFilledCallback,
                onEnvelopeFieldFilled = callbacks.envelopeFieldFilledCallback;

            amplify.subscribe("formFillFieldProgress", function(data) {
                if (_.isFunction(onFormFieldFilled)) {
                    onFormFieldFilled(data);
                };
            });
            amplify.subscribe("envelopeFillFieldProgress", function (data) {
                if (_.isFunction(onEnvelopeFieldFilled)) {
                    onEnvelopeFieldFilled(data);
                };
            });
            return {
                onFormFieldFilled: onFormFieldFilled,
                onEnvelopeFieldFilled: onEnvelopeFieldFilled
            };
        }
        return getInstance;
    });
