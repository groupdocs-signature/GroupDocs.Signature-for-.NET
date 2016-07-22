(function ($, undefined) {
    fileOpenDialogViewModel = function (fileOpenDialog, fileUploader, fileExplorer) {
        this.fileOpenDialog = fileOpenDialog;
        this.fileUploader = fileUploader;
        this.fileExplorer = fileExplorer;

        this._init();
    };

    $.extend(fileOpenDialogViewModel.prototype, {
        _explorerViewModel: null,
        _uploaderElements: [],

        _init: function () {
            this.fileExplorer.bind('onPathChanged', this._onExplorerPathChanged.bind(this));
            this.fileExplorer.bind('onNodeSelected', this._onExplorerNodeSelected.bind(this));

            this._explorerViewModel = $(this.fileExplorer).explorer("getViewModel");

            this.fileUploader.bind('onStart', this._onFileUploaderStart.bind(this));
            this.fileUploader.bind('onProgress', this._onFileUploaderProgress.bind(this));
            this.fileUploader.bind('onComplete', this._onFileUploaderComplete.bind(this));
        },

        _onExplorerPathChanged: function (e, path) {
        },

        _onExplorerNodeSelected: function (e, node) {
            if (node.id > 0 && node.type === 'file') {
                $(this.fileOpenDialog.fileExplorer).trigger('fileSelected', node);
            }
        },

        _onFileUploaderStart: function (e, id, fileName, fileSize) {
            this._explorerViewModel.busy(true);
            this._uploaderElements[id] = this._explorerViewModel.createFile(fileName, fileSize);
        },

        _onFileUploaderProgress: function (e, id, fileName, loaded, total) {

            if (total > 0) {
                $(this.fileOpenDialog.explorerProgressPercentage).text(Math.round(loaded / total * 100) + ' %');
            }
        },

        _onFileUploaderComplete: function (e, id, metadata) {
            var uploaderElements = this._uploaderElements;
            var explorerViewModel = this._explorerViewModel;

            $(this.fileOpenDialog.explorerProgressPercentage).text('100 %');
            explorerViewModel.busy(false);

            if (id && metadata) {
                uploaderElements[id].id = metadata.id;
                uploaderElements[id].guid = metadata.guid;
                uploaderElements[id].url = metadata.url;
                uploaderElements[id].Name = metadata.name;
                uploaderElements[id].docType(metadata.docType);
                uploaderElements[id].sizeInKb(Math.round(metadata.size / 1024));
                uploaderElements[id].version = metadata.version;
                uploaderElements[id].path = explorerViewModel.path() + '/' + metadata.name;
                uploaderElements[id].name(metadata.name);
                uploaderElements[id].uploading(false);

                uploaderElements[id].open();
            }
            else {
                explorerViewModel._removeEntity(uploaderElements[id]);
            }
        }
    });

})(jQuery);