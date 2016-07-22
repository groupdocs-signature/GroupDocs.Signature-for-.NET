var OverrideMode = {
    Override: 0,
    Rename: 1,
    Break: 2,
    Skip: 3
};

(function ($, undefined) {
    $.widget('ui.uploader', {
        _appender: null,
        _handler: null,
        options: {
            multiple: true,
            userId: undefined,
            key: '',
            url: '',
            proxy: '',
            fld: 'documents',
            formats: '',
            onComplete: null,
            onStart: null,
            addFileBtn: null,
            skipErrors: false,
            delayedStart: false,
            isForUserStorage: false,
            overrideMode: OverrideMode.Override
        },
        _initHandler: function () {
            if (this._handler == null) {
                var action = Container.Resolve('HttpProvider').buildUrl(this.options.url, this.options.proxy, { 'user_id': this.options.userId, 'fld': this.options.fld });
                this._handler = $.handlerFactory.get({
                    multiple: this.options.multiple,
                    baseServerHost: this.options.url,
                    isForUserStorage: this.options.isForUserStorage,
                    folder: this.options.fld,
                    action: (this.options.key ? Container.Resolve('HttpProvider').signUrl(action, this.options.key) : action),
                    skipErrors: this.options.skipErrors,
                    overrideMode: this.options.overrideMode
                });

                $(this._handler).hitch('onComplete', this._onComplete, this);
                $(this._handler).hitch('onProgress', this._onProgress, this);
                $(this._handler).hitch('onStart', this._onStart, this);
            }
        },
        _initAppender: function () {
            if (this._appender == null) {
                var self = this;
                this._appender = new FileAppender({ container: this.element,
                    multiple: !this._handler.sync, _addFileBtn: this.options.addFileBtn,
                    onAddItemAction: function (item) {
                        if (self.options.delayedStart) {
                            $(self.element).trigger('onFileSelected', [$.fileInputUtils.getName(item), item]);
                        }
                        else {
                            self._uploadFile(item);
                        }
                    }
                });
            }
        },
        _create: function () {

            this._initHandler();
            this._initAppender();
        },
        _onCancel: function (e) {
            var id = e.data;
            this._handler.cancel(id);
        },
        _onComplete: function (e, id, result) {
            //console.log(result);
            if (this.options.onComplete) {
                this.options.onComplete.apply(this, [id, result]);
            }
            else {
                $(this.element).trigger('onComplete', [id, result]);
            }
        },
        _beforeStart: function (path) {
            if (this.options.beforeStart) {
                return this.options.beforeStart(path);
            }
            else {
                return true;
            }
        },
        _onStart: function (e, id, fileName, fileSize) {
            if (this.options.onStart) {
                this.options.onStart.apply(this, [id, fileName, fileSize]);
            }
            else {
                $(this.element).trigger('onStart', [id, fileName, fileSize]);
            }
        },
        _onProgress: function (e, id, fileName, loaded, total, bytesPerMSec, remainTime) {
            if (this.options.onProgress) {
                this.options.onProgress.apply(this, [id, fileName, loaded, total, bytesPerMSec, remainTime]);
            }
            else {
                $(this.element).trigger('onProgress', [id, fileName, loaded, total, bytesPerMSec, remainTime]);
            }
        },
        _uploadFile: function (input, overrideMode) {
            var id = this._handler.add(input, jSaaspose.utils.getSequenceNumber());
            var path = this._handler.getPath(id);

            if (typeof overrideMode !== "undefined") {
                this._handler.overrideMode = overrideMode;
            }

            if (!this._beforeStart(path)) {
                this._handler.cancel(id);
                return;
            }

            //first, add file html item to the page
            var item = this._addFileItem(id, path);

            if (this.options.formats == '' || this.options.formats.indexOf(item.ext.toLowerCase()) != -1) {
                $(this.element).trigger('onAdded', [item, null]);
                //then upload
                this._handler.upload(id);
            }
            else {
                $(this.element).trigger('onAdded', [null, 'Not allowed format']);
            }
            return id;
        },
        upload: function (id, input) {
            throw new 'not implemented';
        },
        uploadFile: function (input, overrideMode) {
            return this._uploadFile(input, overrideMode);
        },
        cancelUploadFile: function (id) {
            this._handler.cancel(id);
        },
        _addFileItem: function (id, path) {
            var item = { id: id, name: path, ext: this._getExt(path) };
            return item;
        },
        _getExt: function (path) {
            return Container.Resolve('PathProvider').getExt(path).toUpperCase();
        },
        _setOption: function (key, value) {
            $.Widget.prototype._setOption.call(this, key, value);

            if (key === 'fld') {
                this._handler = null;
                this._initHandler();
            }
        }
    });


    UploadHandlerBasic = function (options) {
        $.extend(this, options);
    };

    $.extend(UploadHandlerBasic.prototype, {
        action: '',
        _inputs: {},
        sync: true,
        skipErrors: false,

        getPath: function (id) {
            return $.fileInputUtils.getPath(this._inputs[id]);
        },
        getSize: function (id) {
            var input = this._inputs[id];
            return $.fileInputUtils.getSize(input);
        },
        add: function (fileInput, id) {
            this._inputs[id] = fileInput;
            $(fileInput).detach();
            return id;
        },
        upload: function (id) {
            this._upload(id);
        },
        cancel: function (id) {
            this._cancel(id);
        },
        _parseResponse: function (html) {
            try {
                var result = eval('(' + html + ')');
            } catch (ex) {
                throw 'Error in file processing at server side:' + html;
            }
            return result;
        },
        _upload: function (id) { },
        _cancel: function (id) { }
    });

    //with iframe we can send only one file at a time
    IFrameHandler = function (options) {
        UploadHandlerBasic.apply(this, arguments);
    };

    $.extend(IFrameHandler.prototype, UploadHandlerBasic.prototype, {
        _upload: function (id) {
            var fileInput = this._inputs[id];
            var fileName = Container.Resolve('PathProvider').getName(this.getPath(id));
            $(fileInput).attr('name', fileName);
            var form = this._createForm(id);
            var iframe = this._createIFrame(id);
            form.append(fileInput);
            var doc = iframe.get(0).document ? iframe.get(0).document : (iframe.get(0).contentDocument ? iframe.get(0).contentDocument : iframe.get(0).contentWindow.document);
            doc.body.appendChild(form.get(0));

            iframe.hitch('load', function () {
                var response = this._getIframeContentJSON(iframe[0]);
                $(this).trigger('onComplete', [id, (response.success ? response.parsed : null)]);
                delete this._inputs[id];
                setTimeout(function () {
                    iframe.remove();
                }, 1);
            }, this);

            $(this).trigger('onStart', [id, fileName]);

            form.submit();
            form.remove();
        },
        _createForm: function (id) {
            var form = $('<form method="post" enctype="multipart/form-data" style="display:none"></form>');
            form.attr('id', 'form' + id);
            form.attr('target', 'iframe' + id);
            form.attr('action', this.isForUserStorage ? this._buildUriForIframeAction() : this.action);

            return form;
        },
        _buildUriForIframeAction: function () {
            var _action = '';
            $.ajax({
                url: this.baseServerHost + "\getFileUploadUrl",
                data: "path=" + this.folder + "&forIframe=true",
                async: false,
                success: function (text) {
                    _action = text;
                }
            });
            return _action;
        },
        _createIFrame: function (id) {
            var iframe = $('<iframe src="javascript:false;" name="iframe' + id + '" style="display:none" />').appendTo('body');
            iframe.attr('id', 'iframe' + id);
            return iframe;
        },
        _cancel: function (id) {
            $('iframe' + id).remove();
            delete this._inputs[id];
        },
        _getIframeContentJSON: function (iframe) {
            try {
                if (!iframe.parentNode) {
                    return;
                }

                if (iframe.contentDocument &&
                    iframe.contentDocument.body &&
                    iframe.contentDocument.body.innerHTML == "false") {
                    return;
                }

                var doc = iframe.contentDocument ? iframe.contentDocument : iframe.contentWindow.document;
                var content = doc.body.innerHTML.replace(/^<[^>]+>|<[^>]+>$/g, '');
                var parsed = this.isForUserStorage ?
                    this._correctDataFromIframe(this._parseResponse(content)) : this._parseResponse(content);

                return { success: true, parsed: parsed };
            }
            catch (e) {
                //jerror(e);
            }
            return { success: false, parsed: undefined };
        },

        _correctDataFromIframe: function (response) {
            var correctResponce = {};
            correctResponce.code = response.status;
            correctResponce.error = response.error_message;
            correctResponce.id = response.result.upload_Request_Results[0].id;
            correctResponce.fileType = response.result.upload_Request_Results[0].file_type;
            correctResponce.docType = response.result.upload_Request_Results[0].type.toLowerCase();
            correctResponce.guid = response.result.upload_Request_Results[0].guid;
            correctResponce.thumbnail = response.result.upload_Request_Results[0].thumbnail;
            correctResponce.upload_time = response.result.upload_Request_Results[0].upload_time;
            correctResponce.viewJobId = response.result.upload_Request_Results[0].view_job_id;
            correctResponce.size = response.result.upload_Request_Results[0].size;
            correctResponce.name = response.result.upload_Request_Results[0].adj_name;
            correctResponce.version = response.result.upload_Request_Results[0].version;
            correctResponce.url = response.result.upload_Request_Results[0].url;
            correctResponce.field_count = 0;
            correctResponce.supportedTypes = {};
            $.ajax({
                type: "POST",
                url: this.baseServerHost + "\getJsonFileInfo",
                data: { fileType: response.result.upload_Request_Results[0].file_type },
                async: false,
                success: function (result) {
                    correctResponce.supportedTypes = result;
                }
            });
            return correctResponce;
        }
    });

    AjaxHandler = function (options) {
        UploadHandlerBasic.apply(this, arguments);
        this.sync = false;
        this._xhrs = {};
    };

    $.extend(AjaxHandler.prototype, UploadHandlerBasic.prototype, {

        updateProgress: function (evt) {
            if (evt.lengthComputable) {
                var percentComplete = evt.loaded / evt.total;
                //console.log('percentComplete=' + percentComplete);
            }
        },

        _upload: function (id) {
            var file = this._inputs[id];
            var self = this;
            var fileName = UploadHandlerBasic.prototype.getPath.apply(this, [id]);
            var size = UploadHandlerBasic.prototype.getSize.apply(this, [id]);
            //xhr object is used as jQuery doesn't allow yet to upload input file via ajax
            var xhr = self._xhrs[id] = new XMLHttpRequest();
            //xhr.addEventListener("progress", this.updateProgress, false);

            var startTime = new Date().getTime();

            xhr.upload.onprogress = function (e) {
                if (e.lengthComputable) {
                    var passed = new Date().getTime() - startTime;
                    var bytesPerMSec = e.loaded / passed;
                    var remainTime = ((e.total - e.loaded) * passed) / e.loaded;
                    $(self).trigger('onProgress', [id, fileName, e.loaded, e.total, bytesPerMSec, remainTime]);
                }
            };

            var isForStorage = this.isForUserStorage;
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 0 && xhr['canceled']) {
                        $(self).trigger('onComplete', [id, 'canceled']);
                        return;
                    }

                    if (xhr.status == 0) {
                        //jerror();
                        $(self).trigger('onComplete', [id, null]);
                        return;
                    }

                    var passed = new Date().getTime() - startTime;
                    var bytesPerMSec = size / passed;
                    $(self).trigger('onProgress', [id, fileName, size, size, bytesPerMSec, 0]);

                    var parsed = null;
                    if (xhr.status == 200) {
                        try {
                            if (isForStorage) {
                                parsed = self._correctData(self._parseResponse(xhr.responseText));
                            } else {
                                parsed = self._parseResponse(xhr.responseText);
                            }

                            if (parsed.code == 'Unauthorized') {
                                window.location = Container.Resolve("HttpProvider").buildUrl("/", "sign-in", { 'returnUrl': window.location.href });
                                return;
                            }
                            if (!self.skipErrors) {
                                if (parsed.code == 'Forbidden') {
                                    throw parsed;
                                }
                                if (parsed.code == 'QuotaExceeded') {
                                    throw parsed;
                                }
                                if (parsed.code == 'StorageLimitExceeded') {
                                    throw parsed;
                                }
                            }
                        }
                        catch (e) {
                            jerror(parsed.error);
                            parsed = null;
                        }
                    }

                    $(self).trigger('onComplete', [id, parsed]);

                    delete self._inputs[id];
                    delete self._xhrs[id];
                }
            };

            if (this.overrideMode == OverrideMode.Rename) {
                $(this).trigger('onStart', [id, fileName + " (new copy)", size]);
            } else {
                $(this).trigger('onStart', [id, fileName, size]);
            }

            if (this.isForUserStorage) {
                xhr.open('POST', self._buildUriForUserStorage(fileName), true);
                this.overrideMode = OverrideMode.Override;
            } else {
                xhr.open('POST', self._buildUri(fileName), true);
            }

            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.setRequestHeader('X-File-Name', encodeURIComponent(fileName));
            xhr.setRequestHeader('Content-Type', 'application/octet-stream');
            xhr.send(file);
        },

        _correctData: function (response) {
            var correctResponce = {};
            correctResponce.id = response.result.id;
            correctResponce.code = response.result.status;
            correctResponce.fileType = response.result.file_type;
            correctResponce.docType = response.result.type.toLowerCase(); ;
            correctResponce.guid = response.result.guid;
            correctResponce.thumbnail = response.result.thumbnail;
            correctResponce.upload_time = response.result.upload_time;
            correctResponce.viewJobId = response.result.view_job_id;
            correctResponce.size = response.result.size;
            correctResponce.name = response.result.adj_name;
            correctResponce.version = response.result.version;
            correctResponce.url = response.result.url;
            correctResponce.error = response.result.error_message;
            correctResponce.field_count = 0;
            correctResponce.supportedTypes = {};
            $.ajax({
                type: "POST",
                url: this.baseServerHost + "\getJsonFileInfo",
                data: { fileType: response.result.file_type },
                async: false,
                success: function (result) {
                    correctResponce.supportedTypes = result;
                }
            });
            return correctResponce;
        },

        _buildUri: function (fileName) {
            return this.action + '&' + $.param({ fileName: fileName, multiple: true });
        },

        _buildUriForUserStorage: function (fileName) {
            var _action = '';
            $.ajax({
                url: this.baseServerHost + "\getFileUploadUrl",
                data: "path=" + this.folder + "&" + "filename=" + encodeURIComponent(fileName) + "&" + "overrideMode=" + this.overrideMode,
                async: false,
                success: function (text) {
                    _action = text;
                }
            });
            return _action;
        },
        _cancel: function (id) {
            if (this._inputs[id]) {
                delete this._inputs[id];
            }

            if (this._xhrs[id]) {
                this._xhrs[id]['canceled'] = true;
                this._xhrs[id].abort();
                delete this._xhrs[id];
            }
        }
    });

    /*LinkHandler = function (options) {
    UploadHandlerBasic.apply(this, arguments);
    };


    $.extend(LinkHandler.prototype, UploadHandlerBasic.prototype, {
    _portalService: Container.Resolve("PortalService"),
    userId: null,
    key: '',
    getPath: function (id) {
    return this._inputs[id];
    },
    getSize: function (id) {
    return 0;
    },
    add: function (path, id) {
    this._inputs[id] = path;
    return id;
    },
    uploadSync: function (id) {
    var path = this._inputs[id];
    $(this).trigger('onStart', [id, path]);
    try {
    var fid = this._portalService.uploadLink(this.userId, this.key, path);
    this._onCompleted(id, fid, undefined);
    return fid;
    }
    catch (error) {
    this._onCompleted(id, undefined, { Reason: error });
    return 0;
    }
    },
    _upload: function (id) {
    var path = this._inputs[id];
    $(this).trigger('onStart', [id, path]);
    this._portalService.uploadLinkAsync(this.userId, this.key, path, function (response) { this._onCompleted(id, response, undefined); } .bind(this),
    function (error) { this._onCompleted(id, undefined, error); } .bind(this));
    },
    _onCompleted: function (id, response, error) {
    if (error) {
    jerror();
    }
    $(this).trigger('onComplete', [id, response]);
    }
    });*/


    HandleFactory = function () {
    };

    $.extend(HandleFactory.prototype, {
        get: function (options) {
            if (options.multiple && this._isXHRSupported()) {
                return new AjaxHandler(options);
            }
            return new IFrameHandler(options);
        },
        //to determine if xhr is available in current browser
        _isXHRSupported: function () {
            var input = $('<input type="file" />');
            return (
                'multiple' in input[0] &&
                typeof File != "undefined" &&
                typeof (new XMLHttpRequest()).upload != "undefined");
        }
    });

    ItemAppender = function (options) {
        $.extend(this, options);
        this._init();
        this._subscribe();
    };

    $.extend(ItemAppender.prototype, {
        container: null,
        template: '',
        onAddItemAction: null,
        multiple: false,

        _addFileBtn: null,
        _input: null,

        _init: function () {
            this._input = $('#input', this.container);
            if (this._addFileBtn == null) {
                this._addFileBtn = $('#button', this.container);
            }
        },
        _subscribe: function () {
        }
    });


    FileAppender = function (options) {
        ItemAppender.apply(this, arguments);
    };

    $.extend(FileAppender.prototype, ItemAppender.prototype, {
        _init: function () {
            ItemAppender.prototype._init.apply(this);
            //input is setup with opacity=0 that's why it's invisible but anyway it covers the button
            //and handles all input events
            this._input = this._createInput().prependTo(this._addFileBtn);
        },
        _createInput: function () {
            var input = $('<input type="file" class="file-input"></input>');
            if (this.multiple) {
                input.attr('multiple', 'multiple');
            }
            return input;
        },
        _subscribe: function () {
            this._input.hitch('change', this._onChange, this);
        },
        _onChange: function (e) {
            var self = this;
            if (this.multiple) {
                $.each(e.target.files, function () { self.onAddItemAction(this) });
                $(e.target).remove();
            }
            else {
                this.onAddItemAction(e.target);
            }

            //add input again
            this._input = this._createInput().prependTo(this._addFileBtn);
            this._subscribe();
        }
    });

    InputTypeFile = function (options) {
        $.extend(this, options);
        this._init();
        this._subscribe();
    };

    $.extend(InputTypeFile.prototype, {
        onFileSelected: null,
        //multiple: false,
        name: null,

        element: null,
        _input: null,

        _init: function () {
            this._input = this._createInput().prependTo(this.element);
        },
        _createInput: function () {
            var input = $('<input type="file" class="file-input"></input>');
            //if (this.multiple) {
            //    input.attr('multiple', 'multiple');
            //}
            input.attr('name', this.name);
            return input;
        },
        _subscribe: function () {
            this._input.hitch('change', this._onChange, this);
        },
        _onChange: function (e) {
            var self = this;
            //if (this.multiple) {
            //    $.each(e.target.files, function () { self.onFileSelected(this) });
            //    $(e.target).remove();
            //}
            //else {
            this.onFileSelected(e.target);
            //}
        }
    });

    IFrame = function (options) {
        $.extend(this, options);
        this._init();
    };

    $.extend(IFrame.prototype, {
        values: null,
        elements: null,
        action: null,
        onComplete: null,

        _init: function () {
            var form = this._createForm();
            var iframe = this._createIFrame();

            $.each(this.values, function () {
                var e = $('<input type="hidden" value="' + this.value + '" name="' + this.name + '"></input>');
                form.append(e);
            });

            $.each(this.elements, function () {
                form.append(this);
            });

            var doc = iframe.get(0).document ? iframe.get(0).document : (iframe.get(0).contentDocument ? iframe.get(0).contentDocument : iframe.get(0).contentWindow.document);
            doc.body.appendChild(form.get(0));

            iframe.hitch('load', function () {
                var response = this._getIframeContentJSON(iframe[0]);
                if (this.onComplete) this.onComplete(response.parsed);
                //delete this._inputs[id];
                setTimeout(function () {
                    iframe.remove();
                }, 1);
            }, this);

            //$(this).trigger('onStart', [id, fileName]);

            form.submit();
            form.remove();
        },
        _createForm: function () {
            var form = $('<form method="post" enctype="multipart/form-data" style="display:none"></form>');
            form.attr('action', _buildUriForIframeAction());
            form.attr('target', 'iframe');
            return form;
        },
        _buildUriForIframeAction: function () {
            var _action = '';
            $.ajax({
                url: "getFileUploadUrl",
                data: "path=" + this.folder + "&forIframe=true",
                async: false,
                success: function (text) {
                    _action = text;
                }
            });
            return _action;
        },
        _createIFrame: function () {
            var iframe = $('<iframe src="javascript:false;" name="iframe" style="display:none" />').appendTo('body');
            return iframe;
        },
        _getIframeContentJSON: function (iframe) {
            try {

                if (!iframe.parentNode) {
                    return;
                }

                if (iframe.contentDocument &&
                    iframe.contentDocument.body &&
                    iframe.contentDocument.body.innerHTML == "false") {
                    return;
                }

                var doc = iframe.contentDocument ? iframe.contentDocument : iframe.contentWindow.document;
                var parsed = this._parseResponse(doc.body.innerHTML);
                return { success: true, parsed: parsed };
            }
            catch (e) {
                jerror();
            }
            return { success: false, parsed: undefined };
        },
        _parseResponse: function (html) {
            try {
                var result = eval('(' + html + ')');
            } catch (ex) {
                throw 'Error in file processing at server side:' + html;
            }
            return result;
        }
    });


    FileInputUntils = function () { };
    $.extend(FileInputUntils.prototype, {
        getPath: function (input) {
            var s = input.fullPath;
            if (s) {
                s = s.trimStart('/');
                return s.replace(/\//g, '\\');
            }

            return (input.fileName || input.name || input.value);
        },

        getName: function (input) {
            return Container.Resolve('PathProvider').getName(this.getPath(input));
        },

        getSize: function (input) {
            return input.fileSize != null ? input.fileSize : input.size;
        }
    });


    $.handlerFactory = new HandleFactory();
    $.fileInputUtils = new FileInputUntils();

})(jQuery);


