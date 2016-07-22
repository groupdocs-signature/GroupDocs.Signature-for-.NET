(function ($, undefined) {
    // File explorer view
    $.widget('ui.explorer', {
        _viewModel: null,

        _init: function () {
            var self = this;
            this._viewModel = this.getViewModel();

            this._viewModel.path.subscribe(function (newValue) {
                $(this.element).trigger('onPathChanged', [newValue]);
            } .bind(this));

            $(this._viewModel).bind('onNodeSelected', function (e, node, initialEvent) {
                $(this.element).trigger('onNodeSelected', [node, initialEvent]);
            } .bind(this));

            ko.applyBindings(this._viewModel, this.element.get(0));
        },

        _createViewModel: function () {
            return new explorerViewModel(
                this._getViewModelOptions());
        },

        _getViewModelOptions: function () {
            return {
                userId: this.options.userId,
                userKey: this.options.privateKey,
                pageSize: this.options.pageSize,
                fileTypes: this.options.fileTypes,
                startupPath: this.options.startupPath,
                view: this.options.view,
                urlHashEnabled: this.options.urlHashEnabled,
                instanceIdToken: this.options.instanceIdToken
            };
        },

        getViewModel: function () {
            if (!this._viewModel) {
                this._viewModel = this._createViewModel();
            }

            return this._viewModel;
        },

        setFilter: function (filter) {
            this._viewModel.setFilter(filter);
        },

        setOrder: function (order) {
            this._viewModel.setFilter(order);
        }
    });


    // File explorer model
    explorerModel = function (options) {
        $.extend(this.options, options);
        this._init();
    };

    $.extend(explorerModel.prototype, {
        _portalService: Container.Resolve("PortalService"),
        _path: '',
        _entitiesLoaded: 0,
        _entitiesTotal: 0,
        _filter: {
            name: '',
            types: null
        },
        _order: {
            by: ko.observable('Name'),
            asc: ko.observable(true)
        },
        options: {
            userId: '',
            userKey: '',
            pageSize: 30,
            extended: false
        },

        _init: function () {
        },

        _loadPage: function (index, path, callback, errorCallback) {
            this._portalService.loadFileBrowserTreeData(this.options.userId, this.options.userKey, path,
                    index ? index : 0, this.options.pageSize,
                    this._order.by(), this._order.asc(),
                    this._filter.name, this._filter.types, this.options.extended,
                    function (response) {
                        if (response.textStatus === 'success') {
                            this._entitiesLoaded += response.data.nodes.length;
                            //this is in fact not the total
                            //but it helps us logically determine whether there are other
                            //entities to load, see loadMore for more details
                            this._entitiesTotal = response.data.count;

                            callback.apply(this, [path, response.data.nodes]);
                        }
                        else {
                            errorCallback.apply(this, []);
                        }
                    } .bind(this),
                    function (error) {
                        errorCallback.apply(this, [error]);
                    } .bind(this),
                    false,
                    this.options.instanceIdToken
              );
        },

        openFolder: function (path, callback, errorCallback) {
            this._path = path || '';
            this._entitiesLoaded = 0;
            this._entitiesTotal = 0;

            this._loadPage(0, this._path, callback, errorCallback);
        },

        loadMore: function (callback, errorCallback) {
            //if the number of loaded entities is larger then the last number
            //of loaded entities(_entitiesTotal) then it means all entities have been loaded
            //as far as we know
            if (this._entitiesLoaded > this._entitiesTotal) {
                return false;
            }

            //otherwise, we may have some more entities to load (there may also not be any)
            var page = Math.ceil(this._entitiesLoaded / this.options.pageSize);
            this._loadPage(page, this._path, callback, errorCallback);

            return true;
        },

        createFolder: function (path, callback, errorCallback) {
            this._portalService.createFolderAsync(this.options.userId, this.options.userKey, path,
                function (response) {
                    if (response.data > 0) {
                        callback.apply(this, [path, response.data]);
                    }
                    else {
                        errorCallback.apply(this, [path, null, response.data]);
                    }
                } .bind(this),
                function (error) {
                    errorCallback.apply(this, [error, path]);
                } .bind(this)
            ).Subscribe();
        },

        setFilter: function (filter) {
            this._filter.name = filter.name;
            this._filter.types = filter.types;
        },

        setOrder: function (order) {
            if (this._order.by() == order) {
                var asc = !this._order.asc();
                this._order.asc(asc);
            } else {
                this._order.asc(true);
                this._order.by(order);
            }
        }
    });

    // File explorer view model
    explorerViewModel = function (options) {
        this._init(options);
    };

    $.extend(explorerViewModel.prototype, {
        _model: null,
        _filtering: false,
        _ordering: false,
        _userId: null,
        _userKey: null,
        urlHashEnabled: true,
        busy: ko.observable(false),
        path: ko.observable(''),
        entities: ko.observableArray(),
        files: ko.observableArray(),
        folders: ko.observableArray(),
        changedUrlHash: false,
        view: ko.observable('listing'),

        _init: function (options) {
            this._model = this._createModel(options);
            this._userId = options.userId;
            this._userKey = options.userKey;
            if (typeof(options.urlHashEnabled) != 'undefined') {
                this.urlHashEnabled = options.urlHashEnabled;
            }
            this.busy = ko.observable(false);

            this.path = ko.observable('');
            this.entities = ko.observableArray();

            this.files = ko.observableArray();
            this.folders = ko.observableArray();

            this.isNotRootFolder = ko.computed({
                read: function () {
                    return !(this.path() === '');
                },
                owner: this
            });
            if (!options.skipStartupPathLoad)
                this.openFolder(options.startupPath);
        },

        _createModel: function (options) {
            return new explorerModel(options);
        },

        _addRoot: function () {
            var root = this._createEntity('Home', 'folder');
            root.path = '';
            this.entities.push(root);
            return root;
        },

        _onEntitiesLoaded: function (path, entities) {            
            var self = this;
            if (self._filtering || self._ordering || path != self.path()) {
                self.entities.removeAll();
                self.files.removeAll();
                self.folders.removeAll();
            }

            var currentId = 1;
            $.each(entities, function (i) {                
                if (!this.extended) {
                    var e = this;
                    if (typeof e.id == "undefined") {
                        e.id = currentId;
                        currentId++;
                    }
                    self._extendEntity(e);
                    self.entities.push(e);
                }

                if (this.type == 'file') {
                    self.files.push(this);
                }
                else {
                    self.folders.push(this);
                }
            });

            self._filtering = false;
            self._ordering = false;
            self.path(path);
            if (this.urlHashEnabled) {
                this.changedUrlHash = true;
                location.hash = self.view() + '#' + path;
                this.changedUrlHash = false;
            }
            self.busy(false);
        },

        _onNetworkError: function (error) {
            this.busy(false);
            jerror(error.Reason || error);
        },

        _extendEntity: function (entity) {            
            var self = this;
            var supportedTypes = (entity.supportedTypes ? $.map(entity.supportedTypes, function (t) { return t.toUpperCase(); }) : []);
            
            $.extend(entity, {
                extended: true,
                name: ko.observable(entity.name),
                uploading: ko.observable(false),
                isNewVersion:false,
                processingOnServer:false,
                sizeInKb: ko.observable(Math.round(entity.size / 1024)),
                docType: ko.observable((entity && entity.docType) ? entity.docType.toLowerCase() : ""),
                modifiedOn: function () { return (isNaN(entity.modifyTime) || entity.modifyTime < 0 ? '---' : new Date(entity.modifyTime).format('mmm dd, yyyy')); },
                percentCompleted: ko.observable(0),
                uploadSpeed: ko.observable(0),
                remainingTime: ko.observable(0),
                supportedTypes: ko.observableArray(supportedTypes),
                thumbnail: ko.observable(entity.thumbnail),
                selected: ko.observable(false),
                isVisible: ko.observable(true),
                viewJobId: ko.observable(null),
                viewJobPoller: null
            });

            entity.statusText = ko.computed(function () {
                return (this.viewJobId() && this.viewJobId() > 0 ?
                    'Server-side processing ...' :
                    'Time remaining: ' + this.remainingTime() + ' secs @ ' + this.uploadSpeed() + ' kb/Sec.');
            }, entity);

            entity.open = function (e) {
                if (entity.type === 'file') {
                    $(self).trigger('onNodeSelected', [entity, e]);
                } else
                    self.openFolder(entity.path);
            };

            entity.viewJobId.subscribe(function (newValue) {
                if (newValue && newValue > 0) {
                    entity.processingOnServer = true;
                    this.viewJobPoller = new jobPoller({
                        userId: self._userId,
                        userKey: self._userKey,
                        jobId: newValue,
                        completed: function () {
                            entity.uploading(false);
                            entity.processingOnServer = false;
                            entity.viewJobPoller = null;
                        },
                        failed: function (error) {
                            entity.uploading(false);
                            entity.processingOnServer = false;
                            entity.viewJobPoller = null;
                        },
                        timedout: function () {
                            entity.uploading(false);
                            entity.processingOnServer = false;
                            entity.viewJobPoller = null;
                        }
                    });
                    this.viewJobPoller.start();
                }
            });
        },

        _findEntity: function (name, type) {
            for (var i = 0; i < this.entities().length; i++) {
                var node = this.entities()[i];
                if (node.name().toLowerCase() == name.toLowerCase() && node.type == type) {
                    return node;
                }
            }

            return null;
        },

        _findEntityAt: function (path, type) {
            for (var i = 0; i < this.entities().length; i++) {
                var node = this.entities()[i];
                if (node.path().toLowerCase() == path.toLowerCase() && node.type == type) {
                    return node;
                }
            }

            return null;
        },

        _createEntity: function (name, type, size, path) {
            var entity = {
                id: 0,
                path: (this.path().trim('/') + '/' + (path ? path : name)).trim('/'),
                name: name,
                type: type,
                docType: 'undefined',
                time: new Date().getTime(),
                modifyTime: new Date().getTime(),
                url: undefined,
                isKnown: false,
                fileCount: 0,
                folderCount: 0,
                supportedTypes: [],
                selected: false,
                size: size
            };

            this._extendEntity(entity);
            return entity;
        },

        _getPathLevel: function (path) {
            return (path && path.length > 0 ? path.length - path.replace(/\/+/g, '').length + 1 : 0);
        },

        getSelectedEntities: function () {            
            return $.map(this.entities(), function (item) {
                if (item.id && item.selected()) return item;
            });
        },

        openFolder: function (path) {
            if (this.busy()) {
                return;
            }

            this.busy(true);
            this._model.openFolder(path, this._onEntitiesLoaded.bind(this), this._onNetworkError.bind(this));
        },

        openParentFolder: function () {
            var i = this.path().lastIndexOf('/');
            var path = this.path().substr(0, i > 0 ? i : 0);
            if (path != this.path()) {
                this.openFolder(path);
            }
        },

        loadMore: function () {
            if (!this.busy()) {
                this.busy(
                    this._model.loadMore(this._onEntitiesLoaded.bind(this), this._onNetworkError.bind(this)));
            }

            return this.busy();
        },

        createFile: function (name, size) {
            var existingEntity = this._findEntity(name, 'file');
            if (existingEntity) {
                existingEntity.uploading(true);
                existingEntity.isNewVersion = true;
                return existingEntity;
            }

            var self = this;
            var entity = this._createEntity(name, 'file', size);

            entity.uploading(true);
            entity.isNewVersion = false;

            this.entities.push(entity);
            this.files.unshift(entity);

            return entity;
        },

        entityExists: function (name, type) {
            return (this._findEntity(name, type) != null);
        },

        setFilter: function (filter) {
            this._filtering = true;
            this._model.setFilter(filter);
            this.openFolder(this.path());
        },

        setOrder: function (order) {
            this._ordering = true;
            this._model.setOrder(order);
            this.openFolder(this.path());
        },

        orderBy: function () {
            return this._model._order.by();
        },

        orderAsc: function () {
            return this._model._order.asc();
        },

        findEntity: function (name, type) {
            return this._findEntity(name, type);
        },
        
        isNullOrWhiteSpace: function (str){
        	return str === null || str == 'undefined' || str.match(/^ *$/) !== null;
		}
    });
})(jQuery);